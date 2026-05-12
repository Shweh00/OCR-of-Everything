use crate::errors::AppResult;
use crate::models::OcrResult;

#[derive(Debug, Clone)]
pub struct OcrInput {
    pub source: String,
    pub image_name: Option<String>,
    pub language_hints: Vec<String>,
}

pub trait OcrAdapter: Send + Sync {
    fn engine_name(&self) -> &'static str;
    fn recognize(&self, input: OcrInput) -> AppResult<OcrResult>;
}
