export interface SanitizeOptions {
  useCurrentColor?: boolean;
}

/**
 * Light cleanup so SVGs work well with react-native-svg-transformer + MyIcons size prop.
 */
export function sanitizeSvg(raw: string, options: SanitizeOptions = {}): string {
  let svg = raw.trim();

  // Normalize XML declaration
  svg = svg.replace(/<\?xml[^?]*\?>\s*/i, '');

  // Remove problematic xmlns:xlink if present alone
  svg = svg.replace(/\sxmlns:xlink="[^"]*"/g, '');

  const svgOpenMatch = svg.match(/<svg([^>]*)>/i);
  if (!svgOpenMatch) return svg;

  let attrs = svgOpenMatch[1];

  // Drop fixed width/height on root so size prop controls dimensions
  attrs = attrs.replace(/\s(width|height)="[^"]*"/gi, '');

  // Ensure viewBox exists — derive from width/height if missing
  if (!/\bviewBox=/i.test(attrs)) {
    const wMatch = svgOpenMatch[0].match(/\bwidth="([^"]+)"/i);
    const hMatch = svgOpenMatch[0].match(/\bheight="([^"]+)"/i);
    const w = parseFloat(wMatch?.[1] ?? '24');
    const h = parseFloat(hMatch?.[1] ?? '24');
    attrs += ` viewBox="0 0 ${w} ${h}"`;
  }

  svg = svg.replace(/<svg[^>]*>/i, `<svg${attrs}>`);

  if (options.useCurrentColor) {
    svg = svg
      .replace(/fill="#000000"/gi, 'fill="currentColor"')
      .replace(/fill="#000"/gi, 'fill="currentColor"')
      .replace(/fill="black"/gi, 'fill="currentColor"')
      .replace(/stroke="#000000"/gi, 'stroke="currentColor"')
      .replace(/stroke="#000"/gi, 'stroke="currentColor"')
      .replace(/stroke="black"/gi, 'stroke="currentColor"');
  }

  return svg;
}
