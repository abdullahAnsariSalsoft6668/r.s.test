/**
 * Figma Icon Sync — pulls COMPONENTS from an "Icons" frame, saves SVGs, regenerates MyIcons.
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { downloadSvg, getFileNodes, getSvgUrls } from './figma/client';
import { resolveIconComponents } from './figma/findIconNodes';
import { loadProjectEnv } from './figma/loadEnv';
import { sanitizeSvg } from './figma/sanitizeSvg';
import { generateIcons, ICONS_DIR } from './generate-icons';

interface FigmaConfig {
  fileKey: string;
  rootNodeId: string;
  iconsFrameNames: string[];
  iconsDirectoryFrameNames?: string[];
  iconNodeNames?: string[];
  exportMode?: 'auto' | 'iconsFrame' | 'rootNode' | 'descendants';
}

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const CONFIG_PATH = path.join(PROJECT_ROOT, 'figma.config.json');
const isWatchMode = process.argv.includes('--watch');
const WATCH_INTERVAL_MS = 5 * 60 * 1000;

function loadConfig(): FigmaConfig {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error(`Missing figma.config.json at ${CONFIG_PATH}`);
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')) as FigmaConfig;
}

function hashContent(content: string): string {
  return crypto.createHash('md5').update(content).digest('hex');
}

async function syncFigmaIcons(): Promise<void> {
  loadProjectEnv(PROJECT_ROOT);
  const config = loadConfig();

  console.log('\n🎨 Syncing icons from Figma...');
  console.log(`   File: ${config.fileKey}`);
  console.log(`   Root node: ${config.rootNodeId}\n`);

  const nodesResponse = await getFileNodes(config.fileKey, [config.rootNodeId]);
  const nodeEntry = nodesResponse.nodes[config.rootNodeId];

  if (!nodeEntry?.document) {
    throw new Error(`Node ${config.rootNodeId} not found in Figma file.`);
  }

  const { icons, iconsFrame, availableFrames, modeUsed } = resolveIconComponents(
    nodeEntry.document,
    {
      iconsFrameNames: config.iconsFrameNames,
      iconsDirectoryFrameNames: config.iconsDirectoryFrameNames,
      iconNodeNames: config.iconNodeNames ?? ['Icon', 'icon'],
      exportMode: config.exportMode ?? 'auto',
    },
  );

  if (icons.length === 0) {
    console.error('❌ No exportable icon nodes found.');
    console.error('   Export mode:', config.exportMode ?? 'auto');
    console.error('   Icons frame names:', config.iconsFrameNames.join(', '));
    console.error('   Icon node names:', (config.iconNodeNames ?? ['Icon', 'icon']).join(', '));
    if (availableFrames.length > 0) {
      console.error('   Nearby frames:', availableFrames.slice(0, 20).join(', '));
    }
    process.exit(1);
  }

  const sourceLabel = iconsFrame ? `"${iconsFrame.name}"` : 'root';
  console.log(`📦 Found ${icons.length} icon(s) via ${modeUsed} from ${sourceLabel}`);

  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }

  const nodeIds = icons.map(i => i.id);
  const svgUrls = await getSvgUrls(config.fileKey, nodeIds);

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const icon of icons) {
    const url = svgUrls[icon.id];
    if (!url) {
      console.warn(`⚠️  No export URL for "${icon.name}" (${icon.id})`);
      failed++;
      continue;
    }

    try {
      const raw = await downloadSvg(url);
      const sanitized = sanitizeSvg(raw, { useCurrentColor: false });
      const outPath = path.join(ICONS_DIR, `${icon.fileName}.svg`);
      const newHash = hashContent(sanitized);

      if (fs.existsSync(outPath)) {
        const existing = fs.readFileSync(outPath, 'utf8');
        if (hashContent(existing) === newHash) {
          skipped++;
          continue;
        }
      }

      fs.writeFileSync(outPath, sanitized, 'utf8');
      downloaded++;
      console.log(`   ✓ ${icon.fileName}.svg ← ${icon.name} (${icon.path})`);
    } catch (err) {
      failed++;
      console.warn(`⚠️  Failed "${icon.name}": ${(err as Error).message}`);
    }
  }

  console.log(`\n📊 Summary: ${downloaded} downloaded, ${skipped} unchanged, ${failed} failed`);
  generateIcons();
  console.log('\n✅ Figma icon sync complete!\n');
}

async function run(): Promise<void> {
  try {
    await syncFigmaIcons();
  } catch (err) {
    console.error('\n❌ Figma sync failed:', (err as Error).message);
    process.exit(1);
  }
}

if (require.main === module) {
  if (isWatchMode) {
    console.log(`👀 Watch mode — polling Figma every ${WATCH_INTERVAL_MS / 60000} minutes`);
    run();
    setInterval(() => {
      run().catch(() => undefined);
    }, WATCH_INTERVAL_MS);
  } else {
    run();
  }
}

export { syncFigmaIcons };
