from sklearn.model_selection import train_test_split
from pathlib import Path
import shutil
from tqdm import tqdm
ROOT = Path(__file__).resolve().parents[2]

IMAGES_DIR = ROOT / "Desktop" / "Vision doc AI" /  "data" / "processed" / "images"
LABELS_DIR = ROOT / "Desktop" / "Vision doc AI" /  "data" / "processed" / "labels"
TRAIN_IMAGES = IMAGES_DIR / "train"
VAL_IMAGES = IMAGES_DIR / "val"

TRAIN_LABELS = LABELS_DIR / "train"
VAL_LABELS = LABELS_DIR / "val"
TRAIN_IMAGES.mkdir(parents=True, exist_ok=True)
VAL_IMAGES.mkdir(parents=True, exist_ok=True)

TRAIN_LABELS.mkdir(parents=True, exist_ok=True)
VAL_LABELS.mkdir(parents=True, exist_ok=True)

image_files = list(IMAGES_DIR.glob("*.png"))
train_images, val_images = train_test_split(
    image_files,
    test_size=0.2,
    random_state=42,
    shuffle=True
    )

for image_path in tqdm(train_images, desc="Copying Train Images"):

    label_path = LABELS_DIR / f"{image_path.stem}.txt"

    shutil.copy2(
        image_path,
        TRAIN_IMAGES / image_path.name
    )

    shutil.copy2(
        label_path,
        TRAIN_LABELS / label_path.name
    )

for image_path in tqdm(val_images, desc="Copying Validation Images"):

    label_path = LABELS_DIR / f"{image_path.stem}.txt"

    shutil.copy2(
        image_path,
        VAL_IMAGES / image_path.name
    )

    shutil.copy2(
        label_path,
        VAL_LABELS / label_path.name
    )
