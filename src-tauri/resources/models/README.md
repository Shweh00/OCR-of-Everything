# Optional OCR Models

The MVP does not bundle PP-OCR or ONNX models. System OCR adapters and the local
mock adapter are kept behind the same `OcrAdapter` trait so a future enhanced
engine can download verified models only after explicit user consent.
