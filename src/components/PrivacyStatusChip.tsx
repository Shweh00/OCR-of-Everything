import { ShieldCheck } from "lucide-react";

export function PrivacyStatusChip() {
  return (
    <span className="privacy-chip">
      <ShieldCheck size={15} aria-hidden="true" />
      本地识别 · 未上传
    </span>
  );
}
