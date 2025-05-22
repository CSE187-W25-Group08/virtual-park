import vision from '@google-cloud/vision'

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_CREDENTIALS_PATH || './service-account.json',
})

export async function extractLicensePlateText(imageBuffer: Buffer): Promise<string> {
  const [result] = await client.textDetection({ image: { content: imageBuffer } })
  const detections = result.textAnnotations

  if (!detections || detections.length === 0) {
    throw new Error("No text detected")
  }

  const fullText = detections[2].description || ""
  const match = fullText.match(/[A-Z0-9]{5,8}/)
  if (!match) throw new Error("No license plate found")
  return match[0]
}
