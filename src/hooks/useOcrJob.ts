import { useCallback, useEffect, useState } from "react";
import { listHistory, recognizeImage } from "../lib/tauriCommands";
import type { HistoryItem, OcrResult, OcrSource } from "../lib/types";

export function useOcrJob() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<OcrResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const refreshHistory = useCallback(async () => {
    setHistory(await listHistory(50));
  }, []);

  useEffect(() => {
    void refreshHistory();
  }, [refreshHistory]);

  const recognize = useCallback(
    async (source: OcrSource, imageName?: string) => {
      setBusy(true);
      try {
        const nextResult = await recognizeImage({
          source,
          imageName,
          languageHints: ["zh-Hans", "en"],
          saveHistory: true,
        });
        setResult(nextResult);
        await refreshHistory();
        return nextResult;
      } finally {
        setBusy(false);
      }
    },
    [refreshHistory],
  );

  const selectHistory = useCallback((item: HistoryItem) => {
    setResult({
      jobId: item.id,
      source: item.source,
      text: item.text,
      blocks: [],
      engine: item.engine,
      durationMs: 0,
      createdAt: item.createdAt,
      localOnly: true,
    });
  }, []);

  return {
    busy,
    result,
    history,
    recognize,
    selectHistory,
  };
}
