# VisionDoc AI

> AI-assisted chest X-ray triage and visual analysis system using a custom YOLO object-detection model, FastAPI, and Gemini-powered explanations.

**Live Application:** https://visiondoc-ai.vercel.app/  
**Backend API:** https://visiondoc-ai.onrender.com/  
**API Documentation:** https://visiondoc-ai.onrender.com/docs  
**Repository:** https://github.com/Code-With-Lavanya/Visiondoc-AI

---

## Overview

VisionDoc AI is an end-to-end AI application built to demonstrate how a computer-vision model can be integrated into a production-style web application.

The system accepts a chest X-ray image, sends it to a FastAPI backend, runs a custom-trained YOLO model for visual detection, and then uses Gemini to generate a structured, patient-friendly explanation based on the model's output.

The current production pipeline is:

```text
Chest X-ray
     │
     ▼
Next.js Frontend
     │
     ▼
FastAPI Backend
     │
     ▼
Custom YOLO Detection Model
     │
     ├── Detection count
     ├── Confidence scores
     └── Bounding boxes
     │
     ▼
Gemini AI Explanation
     │
     ▼
Structured API Response
     │
     ▼
Frontend Results Dashboard
```

The application is intended for **research and educational purposes only** and is **not a substitute for professional medical diagnosis**.

---

## Features

- Upload chest X-ray images through a web interface
- Custom YOLO-based computer-vision inference
- Detection confidence scores
- Bounding-box coordinates for detected regions
- Visual detection overlay on the uploaded X-ray
- Gemini-generated explanation of model findings
- FastAPI REST API
- Interactive Swagger API documentation
- Production frontend deployed on Vercel
- Production backend deployed on Render
- Responsive analysis dashboard
- Analysis history interface
- Frontend/backend separation
- Configurable backend API URL
- Client-side request timeout handling for longer inference requests

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- Lucide Icons
- shadcn/ui-style components

### Backend

- Python 3.11
- FastAPI
- Uvicorn
- Pydantic
- Python Multipart/File Upload handling

### Computer Vision

- Ultralytics YOLO
- PyTorch
- OpenCV
- Custom-trained YOLO weights

### AI / LLM

- Google Gemini
- Gemini is used to generate explanations from the computer-vision model's structured output.

### Deployment

- Vercel — frontend
- Render — backend

---

## Project Structure

```text
Visiondoc-AI/
│
├── frontend/
│   └── visiondoc-ai/
│       ├── app/
│       ├── components/
│       ├── lib/
│       ├── services/
│       ├── types/
│       ├── public/
│       ├── package.json
│       └── ...
│
├── src/
│   ├── api/
│   │   ├── main.py
│   │   ├── routes.py
│   │   ├── schemas.py
│   │   └── utils.py
│   │
│   ├── inference/
│   │   └── predictor.py
│   │
│   ├── llm/
│   │   └── analyser.py
│   │
│   ├── ocr/
│   │   └── extractor.py
│   │
│   ├── preprocessing/
│   └── training/
│
├── runs/
│   └── visiondoc_yolo_smoke5/
│       └── weights/
│           └── best.pt
│
├── data/
├── notebooks/
├── requirements.txt
└── README.md
```

---

## How the Backend Works

The main prediction endpoint accepts an uploaded image:

```text
POST /predict/
```

The backend:

1. Saves the uploaded image temporarily.
2. Passes the image to the custom YOLO model.
3. Extracts detections from the model result.
4. Collects confidence scores and bounding boxes.
5. Sends the structured detection information to the Gemini analysis component.
6. Returns the final prediction response to the frontend.

A simplified response looks like:

```json
{
  "total_detections": 1,
  "detections": [
    {
      "confidence": 0.1145,
      "bbox": [265, 465, 476, 683]
    }
  ],
  "ai_explanation": "..."
}
```

The model currently returns detection information rather than forcing an abnormality class when the trained detection output does not provide one.

---

## YOLO Model

The computer-vision component uses a custom-trained YOLO model.

The trained weights are stored under:

```text
runs/visiondoc_yolo_smoke5/weights/best.pt
```

The predictor loads the model and performs inference on uploaded images.

Example inference configuration:

```python
result = self.model.predict(
    source=image_path,
    conf=0.05,
    verbose=False
)[0]
```

The relatively low confidence threshold is intentional for the current experimental model so that potential detections are not immediately filtered out.

---

## Gemini Explanation Layer

The LLM layer receives structured information produced by the computer-vision model.

It is used to:

- summarize detected findings
- communicate model confidence
- explain what the detection means in plain language
- avoid presenting the output as a definitive medical diagnosis

The LLM is not responsible for performing the visual detection itself. The computer-vision model produces the detections first; Gemini operates on that structured output.

---

## OCR Status

An OCR implementation is still present in the repository:

```text
src/ocr/extractor.py
```

The OCR component was implemented using PaddleOCR and **works locally**, but it is currently **not part of the production prediction pipeline**.

### Why is OCR currently disabled?

During deployment and debugging, PaddleOCR introduced additional runtime/deployment complexity and significantly increased the work required to get the hosted inference pipeline stable.

The OCR component was tested locally and the implementation itself works, but attempts were made to debug the hosted OCR integration without reaching a stable production implementation.

For the current release, OCR was therefore removed from the active prediction flow so that the core:

```text
YOLO → Gemini → API → Frontend
```

pipeline could remain stable and deployable.

The OCR code has intentionally been retained in the repository rather than permanently deleted.

### Future Work

OCR integration may be revisited in a future version.

Possible improvements include:

- investigating PaddleOCR deployment compatibility
- reducing OCR model initialization overhead
- separating OCR into an independent service
- using a lighter OCR implementation
- optimizing model loading and startup time
- integrating OCR only when it provides meaningful value to the final analysis

---

## API

### Health Check

```text
GET /
```

Returns a basic backend status response.

### Prediction

```text
POST /predict/
```

Accepts:

```text
multipart/form-data
file: image
```

Returns:

- total detections
- detection confidence
- bounding-box coordinates
- AI-generated explanation

### Swagger Documentation

The deployed API provides interactive documentation at:

https://visiondoc-ai.onrender.com/docs

---

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Code-With-Lavanya/Visiondoc-AI.git
cd Visiondoc-AI
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

Windows:

```powershell
.venv\Scripts\activate
```

### 3. Install backend dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file if required by the LLM configuration.

Example:

```env
GEMINI_API_KEY=your_api_key_here
```

Never commit API keys or other secrets to GitHub.

### 5. Start the FastAPI server

From the project root:

```bash
uvicorn src.api.main:app --reload
```

The API should be available at:

```text
http://127.0.0.1:8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

---

## Running the Frontend

```bash
cd frontend/visiondoc-ai
npm install
npm run dev
```

The frontend can then be opened through the local Next.js development server.

The frontend uses a configurable backend API URL so that the same application can communicate with either a local FastAPI instance or the deployed Render backend.

---

## Deployment

### Frontend

The Next.js frontend is deployed using Vercel.

Production frontend:

https://visiondoc-ai.vercel.app/

The frontend communicates with the deployed FastAPI backend through an environment variable such as:

```env
NEXT_PUBLIC_API_URL=https://visiondoc-ai.onrender.com
```

### Backend

The FastAPI backend is deployed using Render.

Production backend:

https://visiondoc-ai.onrender.com/

The backend runs using Uvicorn and exposes the FastAPI application.

---

## Important Limitations

This project is an experimental AI/ML application and has several limitations:

- The YOLO model is not a clinically validated diagnostic model.
- Low-confidence detections should not be interpreted as confirmed abnormalities.
- Gemini explanations are generated from model outputs and should not be treated as medical advice.
- The application does not replace radiologists or other qualified healthcare professionals.
- OCR is currently disabled in production.
- The current model and inference pipeline are intended primarily for research, experimentation, and educational demonstration.
- Hosted inference can be slower during cold starts or under limited compute resources.

---

## Future Improvements

Planned or potential improvements include:

- Reintroducing OCR with a production-compatible implementation
- Better medical-image preprocessing
- Improved YOLO training and validation
- More robust confidence calibration
- Class-specific detection output
- Better handling of false positives
- Persistent user analysis history
- Authentication
- Database integration
- More detailed model evaluation metrics
- Performance optimization for hosted inference
- Improved observability and error logging
- Automated testing
- CI/CD pipeline
- More comprehensive API validation

---

## Disclaimer

**VisionDoc AI is for research and educational purposes only.**

The predictions, detections, confidence values, and AI-generated explanations provided by this application are not medical diagnoses and should not be used to make healthcare decisions.

Always consult a qualified medical professional for interpretation of medical imaging.

---

## Author

Built as an end-to-end AI/ML engineering project covering:

```text
Machine Learning
      +
Computer Vision
      +
LLM Integration
      +
Backend API Development
      +
Frontend Development
      +
Cloud Deployment
```

---

## Version

```text
VisionDoc AI v1.0.0
```
