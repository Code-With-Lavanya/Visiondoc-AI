from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api.routes import router

app = FastAPI(
    title="VisionDoc AI",
    version="1.0.0",
    description="AI-powered medical image analysis API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://YOUR-VERCEL-DOMAIN.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def home():
    return {
        "message": "Vision Doc AI Backend Running 🚀"
    }
