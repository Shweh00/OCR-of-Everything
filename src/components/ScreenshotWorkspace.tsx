import { Clipboard, Copy, Crop, RotateCcw, ScanText, WrapText } from "lucide-react";
import { PrivacyStatusChip } from "./PrivacyStatusChip";

interface ScreenshotWorkspaceProps {
  onRecognize: () => void;
  onCopy: () => void;
  onClean: () => void;
  busy: boolean;
}

export function ScreenshotWorkspace({ onRecognize, onCopy, onClean, busy }: ScreenshotWorkspaceProps) {
  return (
    <section className="screenshot-workspace" aria-label="截图后识别页">
      <div className="window-chrome">
        <span />
        <span />
        <span />
      </div>
      <div className="screenshot-toolbar">
        <button type="button"><RotateCcw size={16} />重新截图</button>
        <button type="button"><Crop size={16} />框选识别</button>
        <button className="active" type="button" onClick={onRecognize} disabled={busy}>
          <ScanText size={16} />
          识别文字
        </button>
        <button type="button" onClick={onClean}><WrapText size={16} />整理换行</button>
        <button type="button" onClick={onCopy}><Clipboard size={16} />复制全文</button>
      </div>
      <div className="screenshot-preview">
        <div className="ocr-zone">
          <p>截图中的标题文字</p>
          <p>正文内容保持在预览区域，识别后出现在右侧结果窗</p>
        </div>
      </div>
      <footer>
        <span>缩放 100%</span>
        <span>1792 × 1024</span>
        <PrivacyStatusChip />
        <span><Copy size={14} /> 可继续选择区域重试</span>
      </footer>
    </section>
  );
}
