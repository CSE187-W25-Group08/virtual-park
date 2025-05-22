import { extractLicensePlateText } from './googleVision'

export async function processImage(imageBuffer: Buffer): Promise<string> {
  const plateText = await extractLicensePlateText(imageBuffer)
  return plateText
}
