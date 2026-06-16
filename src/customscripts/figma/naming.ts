/** Convert kebab/snake file name to camelCase icon key */
export const toCamelCase = (name: string): string =>
  name
    .replace(/[-_](.)/g, (_, g1) => g1.toUpperCase())
    .replace(/^(.)/, m => m.toLowerCase());

/** Convert kebab file name to PascalCase component import */
export const toPascalCase = (name: string): string =>
  name.replace(/(^\w|-\w)/g, m => m.replace('-', '').toUpperCase());

const GENERIC_LAYER_NAMES = new Set([
  'container',
  'layout',
  'icon',
  'icons',
  'fixed',
  'scrolls',
  'frame',
  'group',
  'auto layout',
  'vector',
  'ellipse',
  'rectangle',
]);

function isGenericLayerName(name: string): boolean {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return true;
  if (GENERIC_LAYER_NAMES.has(normalized)) return true;
  if (/^group\s+\d+$/i.test(name)) return true;
  if (/^\d+$/.test(name)) return true;
  return false;
}

/** Figma component name → kebab-case filename (without .svg) */
export function figmaNameToFileName(rawName: string): string {
  let name = rawName.trim();

  name = name.replace(/^(icon|icons)\//i, '');

  name = name
    .replace(/[/\\]+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  return name || 'unnamed-icon';
}

/**
 * Build a unique filename from the layer path (e.g. screen 13 → Button → Icon).
 * Uses the nearest non-generic ancestor name; falls back to icon-{nodeId}.
 */
export function deriveIconFileName(
  ancestorNames: string[],
  nodeId: string,
  nodeName: string,
): string {
  const meaningful = [...ancestorNames]
    .reverse()
    .filter(name => !isGenericLayerName(name));

  if (meaningful.length > 0) {
    const slug = meaningful
      .slice(0, 2)
      .reverse()
      .map(figmaNameToFileName)
      .filter(Boolean)
      .join('-');

    if (slug) {
      return slug;
    }
  }

  const idSuffix = nodeId.replace(':', '-');
  const base = figmaNameToFileName(nodeName);
  return base === 'icon' ? `icon-${idSuffix}` : `${base}-${idSuffix}`;
}
