mod capture;
mod clipboard;
mod commands;
mod errors;
mod image_pipeline;
mod models;
mod ocr;
mod privacy;
mod storage;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            commands::recognize_clipboard_image,
            commands::recognize_file,
            commands::recognize_region_capture,
            commands::start_region_capture,
            commands::copy_result_text,
            commands::list_history,
            commands::update_settings,
        ])
        .run(tauri::generate_context!())
        .expect("failed to run Qingqu OCR");
}
