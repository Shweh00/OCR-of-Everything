import { Clipboard, Copy, MoreHorizontal, RefreshCw, WrapText } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { cleanLineBreaks } from "../lib/resultFormatting";
import { copyResultText } from "../lib/tauriCommands";
import type { OcrResult } from "../lib/types";
import { IconButton } from "./IconButton";
import { PrivacyStatusChip } from "./PrivacyStatusChip";

interface ResultViewerProps {
  result: OcrResult;
  onRetry: () => void;
}

export function ResultViewer({ result, onRetry }: ResultViewerProps) {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [selection, setSelection] = useState("");
  const cleanedText = useMemo(() => cleanLineBreaks(result.text), [result.text]);

  function updateSelection() {
    const node = textRef.current;
    if (!node) {
      return;
    }
    setSelection(node.value.slice(node.selectionStart, node.selectionEnd));
  }

  async function copyAll() {
    await copyResultText(result.text);
  }

  async function copySelected() {
    await copyResultText(selection || result.text);
  }

  async function copyCleaned() {
    await copyResultText(cleanedText);
  }

  return (
    <section className="result-panel" aria-label="识别结果">
      <header className="panel-header">
        <div>
          <h2>识别结果</h2>
          <p>{result.engine} · {result.durationMs} ms</p>
        </div>
        <PrivacyStatusChip />
      </header>
      <textarea
        ref={textRef}
        className="result-textarea"
        value={result.text}
        onChange={() => undefined}
        onSelect={updateSelection}
        onMouseUp={updateSelection}
        onKeyUp={updateSelection}
        aria-label="可选择的识别文字"
      />
      <footer className="result-actions">
        <button className="button button--primary" type="button" onClick={copyAll}>
          <Clipboard size={16} />
          复制全文
        </button>
        <button className="button button--selection" type="button" onClick={copySelected}>
          <Copy size={16} />
          复制选中
        </button>
        <button className="button button--subtle" type="button" onClick={onRetry}>
          <RefreshCw size={16} />
          重新识别
        </button>
        <button className="button button--subtle" type="button" onClick={copyCleaned}>
          <WrapText size={16} />
          整理换行
        </button>
        <IconButton icon={<MoreHorizontal size={18} />} label="更多操作" variant="soft" />
      </footer>
    </section>
  );
}
