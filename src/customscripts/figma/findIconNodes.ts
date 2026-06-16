import type { FigmaNode } from './client';
import { deriveIconFileName, figmaNameToFileName } from './naming';

export type ExportMode = 'auto' | 'iconsFrame' | 'rootNode' | 'descendants';

export interface IconComponentRef {
  id: string;
  name: string;
  fileName: string;
  path: string;
}

export interface FindIconsOptions {
  iconsFrameNames: string[];
  iconNodeNames: string[];
  iconsDirectoryFrameNames?: string[];
  exportMode: ExportMode;
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

function isIconNamed(name: string, iconNodeNames: string[]): boolean {
  const n = normalizeName(name);
  return iconNodeNames.some(candidate => normalizeName(candidate) === n);
}

function isExportableIconNode(node: FigmaNode, iconNodeNames: string[]): boolean {
  if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
    return true;
  }
  if (node.type === 'FRAME' || node.type === 'GROUP') {
    return isIconNamed(node.name, iconNodeNames);
  }
  return false;
}

function isIconsDirectoryRoot(root: FigmaNode, iconsDirectoryFrameNames?: string[]): boolean {
  if (!iconsDirectoryFrameNames?.length) return false;
  const allowed = new Set(iconsDirectoryFrameNames.map(normalizeName));
  return allowed.has(normalizeName(root.name));
}

function collectComponents(
  node: FigmaNode,
  out: IconComponentRef[],
  iconNodeNames: string[],
  ancestorNames: string[] = [],
): void {
  if (isExportableIconNode(node, iconNodeNames)) {
    out.push({
      id: node.id,
      name: node.name,
      fileName: deriveIconFileName(ancestorNames, node.id, node.name),
      path: [...ancestorNames, node.name].join(' > '),
    });
    return;
  }

  if (node.children) {
    const nextAncestors = [...ancestorNames, node.name];
    for (const child of node.children) {
      collectComponents(child, out, iconNodeNames, nextAncestors);
    }
  }
}

function collectDescendants(
  node: FigmaNode,
  out: IconComponentRef[],
  iconNodeNames: string[],
  ancestorNames: string[] = [],
): void {
  if (node.children) {
    for (const child of node.children) {
      const pathNames = [...ancestorNames, node.name];

      if (isExportableIconNode(child, iconNodeNames)) {
        out.push({
          id: child.id,
          name: child.name,
          fileName: deriveIconFileName(pathNames, child.id, child.name),
          path: [...pathNames, child.name].join(' > '),
        });
      }

      collectDescendants(child, out, iconNodeNames, pathNames);
    }
  }
}

function findIconsFrame(
  node: FigmaNode,
  iconsFrameNames: string[],
): FigmaNode | null {
  const allowed = new Set(iconsFrameNames.map(normalizeName));

  if (
    (node.type === 'FRAME' || node.type === 'SECTION' || node.type === 'GROUP') &&
    allowed.has(normalizeName(node.name))
  ) {
    return node;
  }

  if (node.children) {
    for (const child of node.children) {
      const found = findIconsFrame(child, iconsFrameNames);
      if (found) return found;
    }
  }

  return null;
}

function listChildFrameNames(node: FigmaNode, depth = 0, maxDepth = 3): string[] {
  const names: string[] = [];
  if (!node.children || depth >= maxDepth) return names;

  for (const child of node.children) {
    if (child.type === 'FRAME' || child.type === 'SECTION' || child.type === 'GROUP') {
      names.push(child.name);
    }
    names.push(...listChildFrameNames(child, depth + 1, maxDepth));
  }

  return names;
}

function dedupeFileNames(raw: IconComponentRef[]): IconComponentRef[] {
  const used = new Map<string, number>();
  const icons: IconComponentRef[] = [];

  for (const item of raw) {
    let fileName = item.fileName;
    const count = used.get(fileName) ?? 0;

    if (count > 0) {
      fileName = `${item.fileName}-${count + 1}`;
      console.warn(
        `Duplicate icon filename "${item.fileName}" — saving as "${fileName}"\n   Path: ${item.path}`,
      );
    }

    used.set(item.fileName, count + 1);
    icons.push({ ...item, fileName });
  }

  return icons;
}

export function resolveIconComponents(
  root: FigmaNode,
  options: FindIconsOptions,
): {
  icons: IconComponentRef[];
  iconsFrame: FigmaNode | null;
  availableFrames: string[];
  modeUsed: ExportMode;
} {
  const { iconsFrameNames, iconNodeNames, iconsDirectoryFrameNames, exportMode } = options;
  const availableFrames = listChildFrameNames(root);
  let raw: IconComponentRef[] = [];
  let iconsFrame: FigmaNode | null = null;
  let modeUsed: ExportMode = exportMode;

  const tryIconsFrame = (): boolean => {
    iconsFrame = findIconsFrame(root, iconsFrameNames);
    if (!iconsFrame) return false;
    collectComponents(iconsFrame, raw, iconNodeNames, [iconsFrame.name]);
    return raw.length > 0;
  };

  const tryRootNode = (): boolean => {
    if (isExportableIconNode(root, iconNodeNames)) {
      raw = [
        {
          id: root.id,
          name: root.name,
          fileName: figmaNameToFileName(root.name),
          path: root.name,
        },
      ];
      iconsFrame = root;
      return true;
    }
    return false;
  };

  const tryDescendants = (): boolean => {
    collectDescendants(root, raw, iconNodeNames, []);
    if (raw.length > 0) {
      iconsFrame = root;
      return true;
    }
    return false;
  };

  if (exportMode === 'iconsFrame') {
    tryIconsFrame();
  } else if (exportMode === 'rootNode') {
    tryRootNode();
  } else if (exportMode === 'descendants') {
    tryDescendants();
  } else {
    // auto: Icons library frame → screen directory (e.g. "13") → single root icon → descendants
    if (tryIconsFrame()) {
      modeUsed = 'iconsFrame';
    } else if (isIconsDirectoryRoot(root, iconsDirectoryFrameNames) && tryDescendants()) {
      modeUsed = 'descendants';
      console.log(`ℹ️  Scanning icon directory frame "${root.name}" for nested Icon layers.`);
    } else if (tryRootNode()) {
      modeUsed = 'rootNode';
      console.log('ℹ️  No Icons frame found — exporting root node as icon.');
    } else if (tryDescendants()) {
      modeUsed = 'descendants';
      console.log('ℹ️  No Icons frame found — exporting matching descendant Icon frames.');
    }
  }

  return {
    icons: dedupeFileNames(raw),
    iconsFrame,
    availableFrames,
    modeUsed,
  };
}
