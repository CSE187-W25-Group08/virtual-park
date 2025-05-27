import { extractLicensePlateText } from './googleVision'

export async function processImage(imageBuffer: Buffer): Promise<string|undefined> {
  const plateText = await extractLicensePlateText(imageBuffer)
  console.log('processImage result:', plateText)
  return plateText
}
