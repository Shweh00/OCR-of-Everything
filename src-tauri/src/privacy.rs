pub fn redact_ocr_text_for_log(text: &str) -> String {
    if text.is_empty() {
        return String::new();
    }
    format!("[redacted:{} chars]", text.chars().count())
}

#[cfg(test)]
mod tests {
    use super::redact_ocr_text_for_log;

    #[test]
    fn redacts_text_content() {
        assert_eq!(redact_ocr_text_for_log("hello"), "[redacted:5 chars]");
    }
}
