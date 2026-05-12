import { invoke } from "@tauri-apps/api/core";
import type { HistoryItem, OcrResult, OcrSource, RecognizeRequest } from "./types";
import { createMockOcrResult, resultToHistoryItem } from "./mockOcr";

const memoryHistory: HistoryItem[] = [
  resultToHistoryItem(createMockOcrResult("clipboard", "微信图片")),
  resultToHistoryItem(createMockOcrResult("region", "浏览器区域")),
  resultToHistoryItem(createMockOcrResult("file", "截图文件")),
];

function hasTauriRuntime(): boolean {
  return "__TAURI_INTERNALS__" in window;
}

export async function recognizeImage(request: RecognizeRequest): Promise<OcrResult> {
  if (hasTauriRuntime()) {
    const command =
      request.source === "clipboard"
        ? "recognize_clipboard_image"
        : request.source === "region"
          ? "recognize_region_capture"
          : "recognize_file";
    return invoke<OcrResult>(command, { request });
  }

  await new Promise((resolve) => window.setTimeout(resolve, 280));
  const result = createMockOcrResult(request.source, request.imageName);
  if (request.saveHistory !== false) {
    memoryHistory.unshift(resultToHistoryItem(result));
  }
  return result;
}

export async function copyResultText(text: string): Promise<void> {
  if (hasTauriRuntime()) {
    await invoke("copy_result_text", { request: { text, format: "plain" } });
    return;
  }
  await navigator.clipboard?.writeText(text);
}

export async function listHistory(limit = 50): Promise<HistoryItem[]> {
  if (hasTauriRuntime()) {
    const response = await invoke<{ items: HistoryItem[] }>("list_history", {
      request: { limit, cursor: null },
    });
    return response.items;
  }
  return memoryHistory.slice(0, limit);
}

export async function startRegionCapture(): Promise<void> {
  if (hasTauriRuntime()) {
    await invoke("start_region_capture", { request: { mode: "recognize", displayId: null } });
  }
}

export function isImageFile(file: File): boolean {
  return /^image\/(png|jpeg|webp|bmp|tiff)$/.test(file.type) || /\.(png|jpe?g|webp|bmp|tiff)$/i.test(file.name);
}
