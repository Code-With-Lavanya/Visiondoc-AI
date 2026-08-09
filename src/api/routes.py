from pathlib import Path
import shutil
#from src.ocr.extractor import ocr_extractor
from fastapi import APIRouter, UploadFile, File
#from src.inference.predictor import predictor
from src.api.schemas import PredictionResponse
#from src.llm.analyser import analyzer


router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)

UPLOAD_DIR = Path("temp_uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
@router.post("/")
async def predict(file: UploadFile = File(...)):
    print("🔥🔥🔥 PREDICT ROUTE HIT 🔥🔥🔥", flush=True)

    from src.inference.predictor import predictor
    from src.ocr.extractor import ocr_extractor
    from src.llm.analyser import analyzer
    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    print("STEP 1: file received")
    result = predictor.predict(str(file_path))
    print("STEP 2: YOLO completed")


    detections = []

    for box in result.boxes:
        detections.append({
            "confidence": float(box.conf),
            "bbox": box.xyxy[0].tolist()
        })

    confidences = [d["confidence"] for d in detections]

    ocr_text = ocr_extractor.extract(str(file_path))
    print("STEP 3: OCR completed")

    explanation = analyzer.analyze(
        total_detections=len(detections),
        detections=detections,
        ocr_text=ocr_text
    )
    print("STEP 3: OCR completed")
    return PredictionResponse(
        total_detections=len(detections),
        detections=detections,
        ocr_text=ocr_text,
        ai_explanation=explanation
    )
