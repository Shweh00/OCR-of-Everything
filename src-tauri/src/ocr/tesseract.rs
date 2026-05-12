use crate::errors::{AppError, AppResult};
use crate::models::OcrResult;

use super::types::{OcrAdapter, OcrInput};

pub struct TesseractAdapter;

impl OcrAdapter for TesseractAdapter {
    fn engine_name(&self) -> &'static str {
        "tesseract"
    }

    fn recognize(&self, _input: OcrInput) -> AppResult<OcrResult> {
        Err(AppError::OcrEngineUnavailable)
    }
}
