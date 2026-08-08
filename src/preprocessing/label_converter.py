from pathlib import Path
import pandas as pd
from tqdm import tqdm

ROOT = Path(__file__).resolve().parents[2]

CSV_PATH = ROOT / "downloads" / "archive"/ "drive-download-20240112T131344Z-002" / "stage_2_train_labels.csv"

LABELS_DIR = ROOT /"Desktop" / "Vision doc AI" / "labels"

IMAGE_SIZE = 1024

LABELS_DIR.mkdir(parents=True, exist_ok=True)

labels = pd.read_csv(CSV_PATH)

def convert_bbox_to_yolo(
    x: float,
    y: float,
    width: float,
    height: float,
    image_width: int,
    image_height: int
):
    """
    Convert Pascal VOC bounding box coordinates
    to YOLO format.

    Returns:
        (x_center, y_center, width, height)
    """

    x_center = (x + width / 2) / image_width
    y_center = (y + height / 2) / image_height

    width = width / image_width
    height = height / image_height

    return x_center, y_center, width, height
grouped = labels.groupby("patientId")

for patient_id, group in tqdm(grouped, desc="Generating YOLO Labels"):

    label_path = LABELS_DIR / f"{patient_id}.txt"

    with open(label_path, "w") as f:

        for _, row in group.iterrows():

            if row["Target"] == 0:
                continue

            x_center, y_center, width, height = convert_bbox_to_yolo(
                x=row["x"],
                y=row["y"],
                width=row["width"],
                height=row["height"],
                image_width=IMAGE_SIZE,
                image_height=IMAGE_SIZE,
            )

            f.write(
                f"0 {x_center:.6f} {y_center:.6f} {width:.6f} {height:.6f}\n"
            )
labels.groupby("patientId").size().sort_values(ascending=False).head()
