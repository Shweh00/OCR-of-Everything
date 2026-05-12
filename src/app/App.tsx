import { useState } from "react";
import { CaptureOverlay } from "../components/CaptureOverlay";
import { HistoryStrip } from "../components/HistoryStrip";
import { ImageDropPanel } from "../components/ImageDropPanel";
import { QuickPanel } from "../components/QuickPanel";
import { ResultViewer } from "../components/ResultViewer";
import { ScreenshotWorkspace } from "../components/ScreenshotWorkspace";
import { cleanLineBreaks } from "../lib/resultFormatting";
import { copyResultText } from "../lib/tauriCommands";
import { useOcrJob } from "../hooks/useOcrJob";

export function App() {
  const { busy, result, history, recognize, selectHistory } = useOcrJob();
  const [overlayVisible, setOverlayVisible] = useState(false);

  async function handleCopyAll() {
    if (result) {
      await copyResultText(result.text);
    }
  }

  async function handleClean() {
    if (result) {
      await copyResultText(cleanLineBreaks(result.text));
    }
  }

  return (
    <main className="app-shell">
      <CaptureOverlay
        visible={overlayVisible}
        onCancel={() => setOverlayVisible(false)}
        onRecognize={async () => {
          const nextResult = await recognize("region", "框选区域");
          setOverlayVisible(false);
          return nextResult;
        }}
      />
      <section className="hero-band">
        <QuickPanel
          busy={busy}
          onClipboard={() => void recognize("clipboard", "剪贴板")}
          onRegion={() => setOverlayVisible(true)}
          onDemo={() => void recognize("demo", "示例图片")}
        />
        <ScreenshotWorkspace
          busy={busy}
          onRecognize={() => void recognize("demo", "截图预览")}
          onCopy={handleCopyAll}
          onClean={handleClean}
        />
      </section>
      <section className="work-band">
        <ImageDropPanel busy={busy} onImage={(name) => void recognize("drag_drop", name)} />
        {result ? (
          <ResultViewer result={result} onRetry={() => void recognize(result.source, "重新识别")} />
        ) : (
          <div className="empty-result">
            <strong>等待识别</strong>
            <span>完成截图、拖入图片或识别剪贴板后，文字会在这里变成可选择文本。</span>
          </div>
        )}
      </section>
      <HistoryStrip items={history} onSelect={selectHistory} />
    </main>
  );
}
