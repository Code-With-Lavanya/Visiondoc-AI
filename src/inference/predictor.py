from ultralytics import YOLO
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

MODEL_PATH = (
    ROOT
    / "runs"
    / "visiondoc_yolo_smoke5"
    / "weights"
    / "best.pt"
)


class VisionDocPredictor:

    def __init__(self):
        self.model = YOLO(MODEL_PATH)

    def predict(self, image_path: str, conf: float = 0.05):
        return self.model.predict(
            source=image_path,
            conf=conf,
            verbose=False
        )[0]


predictor = VisionDocPredictor()

