import { Clock3, History } from "lucide-react";
import type { HistoryItem } from "../lib/types";
import { IconButton } from "./IconButton";

interface HistoryStripProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export function HistoryStrip({ items, onSelect }: HistoryStripProps) {
  return (
    <section className="history-strip" aria-label="本地历史">
      <header>
        <div>
          <History size={17} />
          <span>本地历史</span>
        </div>
        <button type="button">打开历史</button>
      </header>
      <div className="history-items">
        {items.slice(0, 3).map((item) => (
          <button className="history-card" type="button" key={item.id} onClick={() => onSelect(item)}>
            <div className="history-thumb" aria-hidden="true" />
            <div>
              <strong>{item.title}</strong>
              <span>{item.preview}</span>
              <small><Clock3 size={12} /> 本地 · {new Date(item.createdAt).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}</small>
            </div>
          </button>
        ))}
        <IconButton icon={<History size={18} />} label="打开全部历史" variant="soft" />
      </div>
    </section>
  );
}
