import { blocksToText, cleanLineBreaks, sortBlocksForReading, summarizeText } from "./resultFormatting";
import type { OcrBlock } from "./types";

const blocks: OcrBlock[] = [
  { id: "b", text: "world", confidence: 0.9, bbox: { x: 80, y: 10, width: 40, height: 20 } },
  { id: "c", text: "next line", confidence: 0.9, bbox: { x: 10, y: 40, width: 80, height: 20 } },
  { id: "a", text: "hello", confidence: 0.9, bbox: { x: 10, y: 12, width: 40, height: 20 } },
];

describe("resultFormatting", () => {
  it("sorts OCR blocks in natural reading order", () => {
    expect(sortBlocksForReading(blocks).map((block) => block.id)).toEqual(["a", "b", "c"]);
  });

  it("converts blocks into selectable text", () => {
    expect(blocksToText(blocks)).toBe("hello\nworld\nnext line");
  });

  it("cleans extra line breaks and spaces", () => {
    expect(cleanLineBreaks("  第一行  \n\n 第二   行 \r\n")).toBe("第一行\n第二 行");
  });

  it("summarizes long text", () => {
    expect(summarizeText("一二三四五六七八九十", 6)).toBe("一二三四五…");
  });
});
