import sharp from "sharp";

export async function compressImage(file: Buffer) {
  const imageCompressed = await sharp(file)
    .resize({ width: 200 })
    .png({
      quality: 70,
      compressionLevel: 8,
    })
    .toBuffer();

  return imageCompressed.toString("base64");
}
