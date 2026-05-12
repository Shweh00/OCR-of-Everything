use chrono::Utc;

use crate::models::{HistoryItem, OcrResult};

pub fn history_from_result(result: &OcrResult) -> HistoryItem {
    HistoryItem {
        id: result.job_id.clone(),
        source: result.source.clone(),
        title: source_title(&result.source).to_string(),
        preview: result.text.lines().next().unwrap_or("识别结果").to_string(),
        text: result.text.clone(),
        engine: result.engine.clone(),
        created_at: if result.created_at.is_empty() {
            Utc::now().to_rfc3339()
        } else {
            result.created_at.clone()
        },
    }
}

fn source_title(source: &str) -> &'static str {
    match source {
        "clipboard" => "剪贴板图片",
        "drag_drop" => "拖入图片",
        "file" => "本地图片",
        "region" => "屏幕框选",
        _ => "识别结果",
    }
}
