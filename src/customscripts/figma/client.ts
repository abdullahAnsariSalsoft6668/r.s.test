const FIGMA_API_BASE = 'https://api.figma.com/v1';
const BATCH_SIZE = 50;
const MAX_RETRIES = 4;

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
}

export interface FigmaNodesResponse {
  nodes: Record<
    string,
    {
      document: FigmaNode;
    } | null
  >;
}

export interface FigmaImagesResponse {
  images: Record<string, string | null>;
  err?: string;
}

function getToken(): string {
  const token = process.env.FIGMA_ACCESS_TOKEN?.trim();
  if (!token) {
    throw new Error(
      'FIGMA_ACCESS_TOKEN is missing. Copy .env.example to .env.local and add your token.',
    );
  }
  return token;
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function figmaFetch<T>(path: string): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const response = await fetch(`${FIGMA_API_BASE}${path}`, {
      headers: { 'X-Figma-Token': getToken() },
    });

    if (response.status === 429) {
      const retryAfter = Number(response.headers.get('retry-after') ?? 2);
      const delay = (retryAfter || 2 ** attempt) * 1000;
      console.warn(`Rate limited — retrying in ${delay}ms...`);
      await sleep(delay);
      continue;
    }

    if (!response.ok) {
      const body = await response.text();
      lastError = new Error(`Figma API ${response.status}: ${body}`);
      if (response.status >= 500) {
        await sleep(2 ** attempt * 1000);
        continue;
      }
      throw lastError;
    }

    return response.json() as Promise<T>;
  }

  throw lastError ?? new Error('Figma API request failed after retries');
}

export async function getFileNodes(
  fileKey: string,
  nodeIds: string[],
): Promise<FigmaNodesResponse> {
  const ids = nodeIds.join(',');
  return figmaFetch<FigmaNodesResponse>(
    `/files/${fileKey}/nodes?ids=${encodeURIComponent(ids)}`,
  );
}

export async function getSvgUrls(
  fileKey: string,
  nodeIds: string[],
): Promise<Record<string, string>> {
  const results: Record<string, string> = {};

  for (let i = 0; i < nodeIds.length; i += BATCH_SIZE) {
    const batch = nodeIds.slice(i, i + BATCH_SIZE);
    const ids = batch.join(',');
    const data = await figmaFetch<FigmaImagesResponse>(
      `/images/${fileKey}?ids=${encodeURIComponent(ids)}&format=svg`,
    );

    if (data.err) {
      throw new Error(`Figma images API error: ${data.err}`);
    }

    for (const [nodeId, url] of Object.entries(data.images)) {
      if (url) {
        results[nodeId] = url;
      }
    }
  }

  return results;
}

export async function downloadSvg(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download SVG (${response.status})`);
  }
  return response.text();
}
