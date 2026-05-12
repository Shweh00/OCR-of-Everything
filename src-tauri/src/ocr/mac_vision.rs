use crate::errors::{AppError, AppResult};
use crate::models::OcrResult;

use super::types::{OcrAdapter, OcrInput};

pub struct MacVisionOcrAdapter;

impl OcrAdapter for MacVisionOcrAdapter {
    fn engine_name(&self) -> &'static str {
        "mac_vision"
    }

    fn recognize(&self, _input: OcrInput) -> AppResult<OcrResult> {
        Err(AppError::OcrEngineUnavailable)
    }
}
