use serde::Serialize;
use thiserror::Error;

#[derive(Debug, Error, Serialize)]
#[serde(tag = "code", content = "message")]
pub enum AppError {
    #[error("clipboard does not contain an image")]
    ClipboardNoImage,
    #[error("OCR engine is unavailable on this platform")]
    OcrEngineUnavailable,
    #[error("image decoding failed")]
    ImageDecodeFailed,
    #[error("unsupported command in this MVP shell: {0}")]
    Unsupported(String),
}

pub type AppResult<T> = Result<T, AppError>;
