import { blocksToText } from "./resultFormatting";
import type { HistoryItem, OcrBlock, OcrResult, OcrSource } from "./types";

const SAMPLE_BLOCKS: OcrBlock[] = [
  {
    id: "block-1",
    text: "清取 OCR 正在本地识别",
    confidence: 0.96,
    bbox: { x: 44, y: 36, width: 260, height: 28 },
  },
  {
    id: "block-2",
    text: "仅处理你复制、拖入或框选的图片",
    confidence: 0.94,
    bbox: { x: 44, y: 82, width: 360, height: 28 },
  },
  {
    id: "block-3",
    text: "识别结果可以直接选择、复制或整理换行",
    confidence: 0.92,
    bbox: { x: 44, y: 128, width: 430, height: 28 },
  },
];

export function createMockOcrResult(source: OcrSource, imageName = "屏幕截图"): OcrResult {
  const now = new Date().toISOString();
  const blocks = SAMPLE_BLOCKS.map((block, index) => ({
    ...block,
    id: `${source}-${index + 1}`,
    text: imageName ? block.text.replace("OCR", `OCR · ${imageName}`) : block.text,
  }));

  return {
    jobId: `${source}-${Date.now()}`,
    source,
    text: blocksToText(blocks),
    blocks,
    engine: "mock_local_adapter",
    durationMs: 118,
    createdAt: now,
    localOnly: true,
  };
}

export function resultToHistoryItem(result: OcrResult): HistoryItem {
  return {
    id: result.jobId,
    source: result.source,
    title: sourceLabel(result.source),
    preview: result.text.split("\n")[0] ?? "识别结果",
    text: result.text,
    engine: result.engine,
    createdAt: result.createdAt,
  };
}

export function sourceLabel(source: OcrSource): string {
  const labels: Record<OcrSource, string> = {
    clipboard: "剪贴板图片",
    drag_drop: "拖入图片",
    file: "本地图片",
    region: "屏幕框选",
    demo: "示例截图",
  };
  return labels[source];
}
