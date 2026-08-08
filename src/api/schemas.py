from pydantic import BaseModel

class Detection(BaseModel):
    confidence: float
    bbox: list[float]


class PredictionResponse(BaseModel):
    total_detections: int
    detections: list[Detection]
    ai_explanation: str
