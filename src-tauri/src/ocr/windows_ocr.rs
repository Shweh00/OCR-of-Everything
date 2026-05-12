use crate::errors::{AppError, AppResult};
use crate::models::OcrResult;

use super::types::{OcrAdapter, OcrInput};

pub struct WindowsOcrAdapter;

impl OcrAdapter for WindowsOcrAdapter {
    fn engine_name(&self) -> &'static str {
        "windows_ocr"
    }

    fn recognize(&self, _input: OcrInput) -> AppResult<OcrResult> {
        Err(AppError::OcrEngineUnavailable)
    }
}
