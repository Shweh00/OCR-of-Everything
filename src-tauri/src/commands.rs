use chrono::Utc;
use tauri::Manager;
use tauri_plugin_clipboard_manager::ClipboardExt;
use uuid::Uuid;

use crate::capture::{CaptureStartRequest, CaptureStartResponse};
use crate::errors::AppResult;
use crate::models::{
    CommandOk, CopyTextRequest, HistoryResponse, ListHistoryRequest, OcrResult, RecognizeRequest,
};
use crate::ocr;
use crate::ocr::types::OcrInput;
use crate::storage::history_repository::history_from_result;

#[tauri::command]
pub async fn recognize_clipboard_image(request: RecognizeRequest) -> AppResult<OcrResult> {
    recognize_with_mockable_adapter("clipboard", request)
}

#[tauri::command]
pub async fn recognize_file(request: RecognizeRequest) -> AppResult<OcrResult> {
    recognize_with_mockable_adapter("file", request)
}

#[tauri::command]
pub async fn recognize_region_capture(request: RecognizeRequest) -> AppResult<OcrResult> {
    recognize_with_mockable_adapter("region", request)
}

fn recognize_with_mockable_adapter(default_source: &str, request: RecognizeRequest) -> AppResult<OcrResult> {
    let adapter = ocr::default_adapter();
    adapter.recognize(OcrInput {
        source: request.source.unwrap_or_else(|| default_source.to_string()),
        image_name: request.image_name,
        language_hints: request.language_hints.unwrap_or_else(|| vec!["zh-Hans".to_string(), "en".to_string()]),
    })
}

#[tauri::command]
pub async fn start_region_capture(_request: CaptureStartRequest) -> AppResult<CaptureStartResponse> {
    Ok(CaptureStartResponse {
        capture_id: Uuid::new_v4().to_string(),
        overlay_shown: true,
    })
}

#[tauri::command]
pub async fn copy_result_text(app: tauri::AppHandle, request: CopyTextRequest) -> AppResult<CommandOk> {
    let _format = request.format;
    app.clipboard().write_text(request.text).map_err(|_| crate::errors::AppError::Unsupported("clipboard write failed".to_string()))?;
    Ok(CommandOk { ok: true })
}

#[tauri::command]
pub async fn list_history(_request: ListHistoryRequest) -> AppResult<HistoryResponse> {
    let adapter = ocr::default_adapter();
    let sample = adapter.recognize(OcrInput {
        source: "demo".to_string(),
        image_name: Some("历史示例".to_string()),
        language_hints: vec!["zh-Hans".to_string(), "en".to_string()],
    })?;
    let mut item = history_from_result(&sample);
    item.created_at = Utc::now().to_rfc3339();

    Ok(HistoryResponse {
        items: vec![item],
        next_cursor: None,
    })
}

#[tauri::command]
pub async fn update_settings() -> AppResult<CommandOk> {
    Ok(CommandOk { ok: true })
}
