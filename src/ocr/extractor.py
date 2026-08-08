from paddleocr import PaddleOCR

class OCRExtractor:

    def __init__(self):
        self.ocr = PaddleOCR(
            use_textline_orientation=True,
            lang="en"
        )

    def extract(self, image_path: str):
        result = self.ocr.ocr(image_path)

        extracted_text = []

        for page in result:
            if not page:
                continue

            rec_texts = page.get("rec_texts", [])
            extracted_text.extend(rec_texts)

        return "\n".join(extracted_text)


ocr_extractor = OCRExtractor()
