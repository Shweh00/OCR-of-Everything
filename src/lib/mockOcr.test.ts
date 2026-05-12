import { createMockOcrResult, resultToHistoryItem, sourceLabel } from "./mockOcr";

describe("mockOcr", () => {
  it("returns deterministic local-only OCR shape for unavailable native engines", () => {
    const result = createMockOcrResult("region", "框选区域");
    expect(result.localOnly).toBe(true);
    expect(result.engine).toBe("mock_local_adapter");
    expect(result.text).toContain("框选区域");
    expect(result.blocks.length).toBeGreaterThan(0);
  });

  it("maps OCR result into a local history item", () => {
    const result = createMockOcrResult("clipboard", "微信图片");
    const history = resultToHistoryItem(result);
    expect(history.source).toBe("clipboard");
    expect(history.title).toBe("剪贴板图片");
    expect(history.preview).toContain("微信图片");
  });

  it("labels all MVP input sources", () => {
    expect(sourceLabel("drag_drop")).toBe("拖入图片");
    expect(sourceLabel("file")).toBe("本地图片");
    expect(sourceLabel("demo")).toBe("示例截图");
  });
});
