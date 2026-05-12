import type { OcrBlock } from "./types";

export function cleanLineBreaks(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n")
    .replace(/[ \t]{2,}/g, " ");
}

export function sortBlocksForReading(blocks: OcrBlock[]): OcrBlock[] {
  return [...blocks].sort((a, b) => {
    const lineDelta = a.bbox.y - b.bbox.y;
    if (Math.abs(lineDelta) > 12) {
      return lineDelta;
    }
    return a.bbox.x - b.bbox.x;
  });
}

export function blocksToText(blocks: OcrBlock[]): string {
  return sortBlocksForReading(blocks)
    .map((block) => block.text.trim())
    .filter(Boolean)
    .join("\n");
}

export function summarizeText(text: string, maxLength = 46): string {
  const singleLine = cleanLineBreaks(text).replace(/\n/g, " ");
  if (singleLine.length <= maxLength) {
    return singleLine;
  }
  return `${singleLine.slice(0, maxLength - 1)}…`;
}
