use chrono::Utc;
use uuid::Uuid;

use crate::errors::AppResult;
use crate::models::{BoundingBox, OcrBlock, OcrResult};

use super::types::{OcrAdapter, OcrInput};

pub struct MockOcrAdapter;

impl OcrAdapter for MockOcrAdapter {
    fn engine_name(&self) -> &'static str {
        "mock_local_adapter"
    }

    fn recognize(&self, input: OcrInput) -> AppResult<OcrResult> {
        let name = input.image_name.unwrap_or_else(|| "屏幕截图".to_string());
        let language_hint = if input.language_hints.is_empty() {
            "zh-Hans/en".to_string()
        } else {
            input.language_hints.join("+")
        };
        let lines = [
            format!("清取 OCR · {name}"),
            "仅处理你复制、拖入或框选的图片".to_string(),
            format!("本地模拟适配器已保留真实 OCR 边界 · {language_hint}"),
        ];
        let blocks = lines
            .iter()
            .enumerate()
            .map(|(index, text)| OcrBlock {
                id: Uuid::new_v4().to_string(),
                text: text.to_string(),
                confidence: 0.92 - index as f64 * 0.02,
                bbox: BoundingBox {
                    x: 42.0,
                    y: 36.0 + index as f64 * 42.0,
                    width: 420.0,
                    height: 30.0,
                },
            })
            .collect::<Vec<_>>();

        Ok(OcrResult {
            job_id: Uuid::new_v4().to_string(),
            source: input.source,
            text: lines.join("\n"),
            blocks,
            engine: self.engine_name().to_string(),
            duration_ms: 118,
            created_at: Utc::now().to_rfc3339(),
            local_only: true,
        })
    }
}
