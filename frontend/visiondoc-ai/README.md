# VisionDoc AI — Frontend Dashboard

A production-quality Next.js 15 (App Router) dashboard for **VisionDoc AI**, an
AI-assisted chest X-ray triage tool. The frontend uploads an X-ray to your
FastAPI + YOLO11 + PaddleOCR + Gemini backend, then renders detections,
confidence scores, extracted report text (OCR), and a structured,
patient-friendly AI explanation.

## Tech stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + a small hand-rolled Shadcn-style UI kit (`components/ui`)
- Axios for API calls
- lucide-react for icons
- No state management library, no UI kit runtime dependency — kept lean per spec

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then edit if your backend isn't on 127.0.0.1:8000
npm run dev
```

Open http://localhost:3000.

### Enable CORS on the backend

The dashboard calls your FastAPI backend directly from the browser, so make
sure CORS is enabled for the Next.js dev origin. In `src/api/main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Without this, requests from the browser will fail with a network/CORS error
even though the backend is running.

## Project structure

```
app/                       Routes (App Router)
  page.tsx                 Dashboard / landing
  analysis/page.tsx         Upload + analyze + results workspace
  history/page.tsx          Dummy analysis history
  settings/page.tsx         Backend URL config + dummy preferences
  about/page.tsx             Project info, tech stack, disclaimer
  layout.tsx / globals.css  Root layout, theme tokens

components/
  ui/                        Shadcn-style primitives (Button, Card, Badge, ...)
  layout/                    Sidebar, Topbar, Footer, AppShell
  dashboard/                 Hero, status cards, feature highlights
  upload/                    Drag & drop dropzone, Analyze button
  analysis/                  Workspace orchestrator, loading UI, empty state
  results/                   X-ray viewer w/ bbox overlay, detections, OCR
                              text, and structured AI explanation
  shared/                    Logo, error banner, backend status badge

hooks/                      use-image-upload, use-analyze, use-backend-status
services/api.ts             Axios client, predictXray(), error normalization
types/index.ts              Shared TypeScript types (see below)
lib/                        cn() helper, constants, dummy history data
```

## API response shape

The backend returns:

```json
{
  "total_detections": 2,
  "detections": [{ "confidence": 0.15, "bbox": [605, 353, 810, 796] }],
  "ocr_text": "...",
  "ai_explanation": {
    "summary": "...",
    "findings": ["...", "..."],
    "limitations": "...",
    "recommendation": "..."
  }
}
```

`types/index.ts` models this exactly — `ocr_text` and `ai_explanation` are
required fields, and `AiExplanation` is a structured object rendered as a
summary, a findings list, a limitations callout, and a recommendation
callout in `AiExplanationCard`.

Two fields remain modeled as **optional** for forward compatibility —
`annotated_image` and `medical_report` — in case the backend adds a
server-rendered annotated image or a fuller structured report later. They
aren't read by any component yet; add a `result.medical_report` /
`result.annotated_image` check wherever you want them to appear once the
backend starts returning them.

## Notes

- **Bounding boxes** are drawn client-side with an SVG overlay sized to the
  image's natural pixel dimensions, since the backend returns raw `bbox`
  coordinates rather than a pre-annotated image.
- **History** and parts of **Settings** are intentionally static/dummy, as
  specified — there's no backend persistence yet.
- This tool is for research/educational use only and is not a medical
  device — see the disclaimer on the About page.
