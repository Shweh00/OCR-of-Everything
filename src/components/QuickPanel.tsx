import { ClipboardImage, Crosshair, ImagePlus, Settings } from "lucide-react";
import { IconButton } from "./IconButton";
import { PrivacyStatusChip } from "./PrivacyStatusChip";

interface QuickPanelProps {
  onClipboard: () => void;
  onRegion: () => void;
  onDemo: () => void;
  busy: boolean;
}

export function QuickPanel({ onClipboard, onRegion, onDemo, busy }: QuickPanelProps) {
  return (
    <aside className="quick-panel" aria-label="OCR 快捷入口">
      <header>
        <div>
          <h1>清取 OCR</h1>
          <p>仅处理你复制、拖入或框选的图片</p>
        </div>
        <IconButton icon={<Settings size={18} />} label="设置" variant="soft" />
      </header>
      <PrivacyStatusChip />
      <div className="quick-actions">
        <button className="quick-action" type="button" onClick={onRegion} disabled={busy}>
          <Crosshair size={20} />
          <span>框选取字</span>
          <kbd>Ctrl Shift X</kbd>
        </button>
        <button className="quick-action" type="button" onClick={onClipboard} disabled={busy}>
          <ClipboardImage size={20} />
          <span>识别剪贴板</span>
          <kbd>Ctrl Shift O</kbd>
        </button>
        <button className="quick-action" type="button" onClick={onDemo} disabled={busy}>
          <ImagePlus size={20} />
          <span>示例图片</span>
          <kbd>Demo</kbd>
        </button>
      </div>
    </aside>
  );
}
