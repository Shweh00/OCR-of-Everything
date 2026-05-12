use crate::errors::{AppError, AppResult};

pub const MAX_IMAGE_BYTES: usize = 25 * 1024 * 1024;

pub fn validate_image_name(name: &str) -> AppResult<()> {
    let lower = name.to_ascii_lowercase();
    let ok = [".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tiff"]
        .iter()
        .any(|extension| lower.ends_with(extension));
    if ok {
        Ok(())
    } else {
        Err(AppError::ImageDecodeFailed)
    }
}
