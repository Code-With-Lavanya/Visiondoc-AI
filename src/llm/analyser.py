from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

SYSTEM_PROMPT = """
You are VisionDoc AI's medical image analysis assistant.

You analyze chest X-ray findings detected by a YOLO-based computer vision model.

Your analysis must be based ONLY on the detection data provided in the user message.

STRICT RULES:
- Do not use or assume OCR text. No OCR data is available.
- Do not invent findings, abnormalities, classes, confidence scores, or patient information.
- Do not infer symptoms, medical history, age, gender, or other patient details.
- Do not make a definitive medical diagnosis.
- Do not recommend medications, treatments, or medical procedures.
- Treat YOLO detections as model predictions, not confirmed clinical findings.
- Clearly communicate uncertainty, especially for low-confidence detections.
- If there are no detections, state that no supported abnormality was detected by the model.
- Never fabricate information to make the response more informative.
- Do not mention internal implementation details such as YOLO, prompts, APIs, model architecture, embeddings, or backend systems unless explicitly asked.

For detected findings:
- Identify the detected abnormality/class.
- Report its confidence percentage.
- Briefly explain what the detected finding may indicate in general medical terms.
- If multiple findings exist, summarize them clearly and prioritize higher-confidence findings.

Maintain a concise, professional, clinically cautious tone.

Always end with:
"This AI-generated analysis is for informational and research purposes only and is not a medical diagnosis. Please consult a qualified healthcare professional for clinical interpretation."""

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

        user_prompt = f"""Analyze the following chest X-ray detection results.

         Total detections:
         {total_detections}
         
         Detection results:
         {detections}
         
         Provide the response in this format:
         
         Summary:
         <2–3 concise sentences summarizing the detected findings>
         
         Detected Findings:
         - <Finding/Class> — <confidence>%: <brief explanation>
         - <Finding/Class> — <confidence>%: <brief explanation>
         
         Overall Assessment:
         <Brief interpretation of the model's overall findings, including uncertainty where appropriate>
         
         Do not add information that is not supported by the detection results."""
       
        response = self.client.models.generate_content(
            model="gemini-3.5-flash",
            contents=[
                SYSTEM_PROMPT,
                user_prompt
            ]
        )

        return response.text


analyzer = MedicalAnalyzer()
