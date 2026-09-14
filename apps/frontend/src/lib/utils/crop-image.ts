export type PixelCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export async function cropImage(
  imageSrc: string,
  crop: PixelCrop,
  size: number,
): Promise<File> {
  const image = new Image();

  image.src = imageSrc;
  await image.decode();

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not create canvas context");
  }

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    size,
    size,
  );

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Crop failed"))),
      "image/jpeg",
      0.9,
    );
  });

  return new File([blob], "avatar.jpeg", {
    type: "image/jpeg",
  });
}
