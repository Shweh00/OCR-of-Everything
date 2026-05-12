import { FileImage, Image, Upload } from "lucide-react";
import { DragEvent, ClipboardEvent, useState } from "react";
import { isImageFile } from "../lib/tauriCommands";

interface ImageDropPanelProps {
  onImage: (name: string) => void;
  busy: boolean;
}

export function ImageDropPanel({ onImage, busy }: ImageDropPanelProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "browser">("chat");
  const [isDragging, setDragging] = useState(false);

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    const file = Array.from(event.dataTransfer.files).find(isImageFile);
    if (file) {
      onImage(file.name);
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    const file = Array.from(event.clipboardData.files).find(isImageFile);
    if (file) {
      onImage(file.name);
      return;
    }
    if (event.clipboardData.items.length > 0) {
      onImage("粘贴截图");
    }
  }

  return (
    <section className="image-panel" aria-label="聊天和浏览器图片识别入口">
      <div className="tabs" role="tablist">
        <button
          className={activeTab === "chat" ? "active" : ""}
          type="button"
          onClick={() => setActiveTab("chat")}
          role="tab"
          aria-selected={activeTab === "chat"}
        >
          从聊天图片提取文字
        </button>
        <button
          className={activeTab === "browser" ? "active" : ""}
          type="button"
          onClick={() => setActiveTab("browser")}
          role="tab"
          aria-selected={activeTab === "browser"}
        >
          浏览器图片
        </button>
      </div>
      <div className="image-panel-body">
        <div className="wechat-preview" aria-hidden="true">
          <div className="wechat-title">微信图片</div>
          <div className="chat-bubble">这张图里的文字想直接复制</div>
          <div className="chat-image">
            <Image size={26} />
            <span>图片文字</span>
          </div>
        </div>
        <div
          className={`drop-zone ${isDragging ? "drop-zone--active" : ""}`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onPaste={handlePaste}
          tabIndex={0}
          role="button"
          aria-disabled={busy}
        >
          <Upload size={30} />
          <strong>拖入图片</strong>
          <span>或粘贴截图</span>
          <kbd>Ctrl + V</kbd>
          <small><FileImage size={14} /> PNG / JPG / WebP / BMP / TIFF</small>
        </div>
      </div>
    </section>
  );
}
