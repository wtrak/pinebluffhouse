import argparse
from pathlib import Path

from PIL import Image, ImageOps


DEST = Path(__file__).resolve().parents[1] / "public" / "house"

ROOMS = {
    "Bathroom": "hall-bath",
    "Bed 2": "bed-2",
    "Bed 3": "bed-3",
    "Closet": "primary-closet",
    "Dining": "dining",
    "Kitchen": "kitchen",
    "Laundry:Guest Bath": "laundry-half-bath",
    "Living Room": "living",
    "Master Bath": "primary-bath",
    "Master Bed": "primary-bed",
    "Outside": "outside",
    "Roof": "attic-roof",
    "Sunroom": "sunroom",
    "hallways": "hall",
}

LOOSE_FILES = {
    "IMG_20260908_153829424.jpg": "systems-01.jpg",
    "IMG_20260908_153901881.jpg": "systems-02.jpg",
    "IMG_20260908_154037450.jpg": "systems-03.jpg",
    "IMG_20260908_154353390.jpg": "systems-04.jpg",
    "IMG_20260908_154358288.jpg": "systems-05.jpg",
    "IMG_20260908_154532566.jpg": "systems-06.jpg",
    "IMG_20260908_155822762_HDR.jpg": "outside-12.jpg",
    "IMG_20260908_160158493_HDR.jpg": "outbuilding-01.jpg",
    "carport door into halway to dining.jpg": "hall-04.jpg",
}

IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp"}


def save_photo(source: Path, destination: Path) -> None:
    with Image.open(source) as raw:
        image = ImageOps.exif_transpose(raw).convert("RGB")
        image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
        image.save(destination, quality=82, optimize=True, progressive=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="Prepare the Pine Bluff walkthrough photographs.")
    parser.add_argument("--source", required=True, type=Path, help="Folder containing the organized room folders")
    parser.add_argument("--plan", required=True, type=Path, help="Measured floor-plan image")
    args = parser.parse_args()

    DEST.mkdir(parents=True, exist_ok=True)
    for old_asset in DEST.glob("*.jpg"):
        old_asset.unlink()

    with Image.open(args.plan) as raw:
        plan = ImageOps.exif_transpose(raw).convert("RGB")
        plan.thumbnail((2200, 2200), Image.Resampling.LANCZOS)
        plan.save(DEST / "floor-plan.jpg", quality=92, optimize=True, progressive=True)

    count = 1
    for folder_name, slug in ROOMS.items():
        sources = sorted(
            path
            for path in (args.source / folder_name).iterdir()
            if path.is_file() and path.suffix.lower() in IMAGE_SUFFIXES
        )
        for index, source in enumerate(sources, start=1):
            save_photo(source, DEST / f"{slug}-{index:02d}.jpg")
            count += 1

    for source_name, output_name in LOOSE_FILES.items():
        save_photo(args.source / source_name, DEST / output_name)
        count += 1

    print(f"Prepared {count} metadata-free images in {DEST}")


if __name__ == "__main__":
    main()
