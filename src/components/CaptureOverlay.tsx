import { ScanLine, X } from "lucide-react";
import { startRegionCapture } from "../lib/tauriCommands";
import type { OcrResult } from "../lib/types";
import { IconButton } from "./IconButton";

interface CaptureOverlayProps {
  visible: boolean;
  onCancel: () => void;
  onRecognize: () => Promise<OcrResult>;
}

export function CaptureOverlay({ visible, onCancel, onRecognize }: CaptureOverlayProps) {
  if (!visible) {
    return null;
  }

  async function recognize() {
    await startRegionCapture();
    await onRecognize();
  }

  return (
    <div className="capture-overlay" role="dialog" aria-label="框选识别">
      <div className="desktop-ghost">
        <div className="ghost-window ghost-window--chat" />
        <div className="ghost-window ghost-window--browser" />
      </div>
      <div className="selection-box">
        {Array.from({ length: 8 }).map((_, index) => (
          <span className={`selection-handle handle-${index + 1}`} key={index} />
        ))}
        <p>这是一段屏幕上的图片文字，可框选后识别</p>
      </div>
      <div className="selection-toolbar">
        <span>拖动选择区域</span>
        <button type="button" onClick={onCancel}>
          <X size={15} />
          ESC 取消
        </button>
        <button className="toolbar-primary" type="button" onClick={recognize}>
          <ScanLine size={15} />
          识别
        </button>
      </div>
    </div>
  );
}
