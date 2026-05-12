mod mac_vision;
mod mock_adapter;
mod paddle_onnx;
mod tesseract;
pub mod types;
mod windows_ocr;

use types::OcrAdapter;

pub fn default_adapter() -> Box<dyn OcrAdapter> {
    Box::new(mock_adapter::MockOcrAdapter)
}
