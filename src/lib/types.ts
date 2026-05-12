export type OcrSource = "clipboard" | "drag_drop" | "file" | "region" | "demo";

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface OcrBlock {
  id: string;
  text: string;
  confidence: number;
  bbox: BoundingBox;
}

export interface OcrResult {
  jobId: string;
  source: OcrSource;
  text: string;
  blocks: OcrBlock[];
  engine: string;
  durationMs: number;
  createdAt: string;
  localOnly: boolean;
}

export interface HistoryItem {
  id: string;
  source: OcrSource;
  title: string;
  preview: string;
  text: string;
  engine: string;
  createdAt: string;
}

export interface RecognizeRequest {
  source: OcrSource;
  imageName?: string;
  languageHints?: string[];
  saveHistory?: boolean;
}

export interface PrivacySettings {
  saveHistory: boolean;
  saveImages: boolean;
  allowCloudOcr: boolean;
}
