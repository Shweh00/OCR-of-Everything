use crate::errors::{AppError, AppResult};
use crate::models::OcrResult;

use super::types::{OcrAdapter, OcrInput};

pub struct PaddleOnnxOcrAdapter;

impl OcrAdapter for PaddleOnnxOcrAdapter {
    fn engine_name(&self) -> &'static str {
        "paddle_onnx"
    }

    fn recognize(&self, _input: OcrInput) -> AppResult<OcrResult> {
        Err(AppError::OcrEngineUnavailable)
    }
}
