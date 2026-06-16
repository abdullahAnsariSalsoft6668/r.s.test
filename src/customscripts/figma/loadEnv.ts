import * as fs from 'fs';
import * as path from 'path';

/**
 * Load .env.local then .env from project root (no overwrite of existing process.env).
 */
export function loadProjectEnv(projectRoot: string): void {
  const files = ['.env.local', '.env'];

  for (const file of files) {
    const filePath = path.join(projectRoot, file);
    if (!fs.existsSync(filePath)) continue;

    const lines = fs.readFileSync(filePath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;

      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();
      value = value.replace(/^["']|["']$/g, '');

      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }

  // dotenv is optional — use if installed
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const dotenv = require('dotenv');
    for (const file of files) {
      dotenv.config({ path: path.join(projectRoot, file), override: false });
    }
  } catch {
    // manual parsing above is sufficient
  }
}
