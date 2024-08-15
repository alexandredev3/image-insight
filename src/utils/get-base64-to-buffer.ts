export function getBase64ImageData(file: string) {
  const base64 = file.split(",")[1];
  if (!base64) {
    throw new Error("Invalid base64");
  }
  const fileBuffer = Buffer.from(base64, "base64");
  return fileBuffer;
}
