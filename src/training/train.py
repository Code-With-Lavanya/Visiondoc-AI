from pathlib import Path
from ultralytics import YOLO


def main():
    ROOT = Path(__file__).resolve().parents[2]

    model = YOLO("yolo11n.pt")

    model.train(
        data=str(ROOT / "dataset.yaml"),
        epochs=50,
        imgsz=640,
        batch=12,
        save_period=5,
        workers=4,
        device=0,
        cache=False,
        project="runs",
        name="visiondoc_yolo_smoke"
    )


if __name__ == "__main__":
    main()