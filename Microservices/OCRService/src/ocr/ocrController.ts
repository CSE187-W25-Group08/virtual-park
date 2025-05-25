import { Controller, Post, Route, Tags, Body } from 'tsoa'
import { processImage } from './ocrService'

@Route('ocr')
@Tags('OCR')
export class OCRController extends Controller {
  @Post('scan')
  public async scan(
    @Body() body: {base64Image: string}
  ): Promise<{ licensePlate: string | undefined}> {
      const buffer = Buffer.from(body.base64Image, 'base64')
      const licensePlate = await processImage(buffer)
      return { licensePlate }
  } 
}
