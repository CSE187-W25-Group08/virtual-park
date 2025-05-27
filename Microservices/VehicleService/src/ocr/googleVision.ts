import vision from '@google-cloud/vision'

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_CREDENTIALS_PATH || './service-account.json',
})

export async function extractLicensePlateText(imageBuffer: Buffer): Promise<string|undefined> {
  const [result] = await client.textDetection({ image: { content: imageBuffer } })
  const allText = result.textAnnotations?.[0].description
  
  // console.log('All detected text:', allText);

  const patterns = [
    /\b\d[A-Z]{3}\d{3}\b/i,
    /\b[A-Z]{3}\s*\d{3}\b/i
  ]
  
  for (const pattern of patterns) {
    const match = allText?.match(pattern)
    if (match) {
      const plate = match[0].replace(/\s/g, "").toUpperCase()
      // console.log('found plate:', plate)
      return plate
    }
  }
}
