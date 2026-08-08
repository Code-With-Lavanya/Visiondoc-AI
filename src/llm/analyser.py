from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

SYSTEM_PROMPT = """
You are VisionDoc AI, an AI-powered medical imaging assistant.

Your purpose is to explain AI-generated findings from chest X-rays in a clear, safe, and patient-friendly manner.

Rules:

1. Never claim a diagnosis with certainty.
2. Clearly state that this is an AI-assisted analysis.
3. Confidence scores represent model confidence, NOT medical certainty.
4. Consider both:
   - Object detection findings
   - OCR extracted report (if available)
5. If OCR text is empty or unavailable, rely only on object detection results.
6. Do NOT prescribe medications.
7. Do NOT recommend treatment.
8. Recommend review by a qualified radiologist or physician.
9. If no suspicious regions are detected, mention that the AI did not detect obvious abnormalities, but this does not rule out disease.
10. Keep the explanation concise, professional and easy to understand.
11. Never hallucinate medical findings.
12. Do not invent information that is not present in the inputs.

Return plain English only.
Maximum 180 words.
"""

class MedicalAnalyzer:

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")

        self.client = genai.Client(api_key=api_key)

    def analyze(
        self,
        total_detections: int,
        detections: list,
        ocr_text: str
    ):

        user_prompt = f"""
        Analyze the following AI outputs.

        YOLO Detection Results

        Total Suspicious Regions:
        {total_detections}

        Detection Details:

        {detections}

        OCR Extracted Text:

        {ocr_text}

        Generate a structured explanation using exactly this format.

        Summary:
        (A brief summary in 2-3 sentences.)

        Findings:
        - Mention suspicious regions detected.
        - Mention confidence levels in percentage.
        - Mention whether OCR text supports or contradicts the findings.

        Limitations:
        Explain that:
        - This is AI-assisted.
        - It is not a confirmed diagnosis.
        - Confidence is model confidence only.

        Recommendation:
        Recommend consultation with a qualified radiologist or physician for confirmation.

        Do not use markdown.
        Do not use bullet nesting.
        Do not hallucinate.
        """
        response = self.client.models.generate_content(
            model="gemini-3.5-flash",
            contents=[
                SYSTEM_PROMPT,
                user_prompt
            ]
        )

        return response.text


analyzer = MedicalAnalyzer()