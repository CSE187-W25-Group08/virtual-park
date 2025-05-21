import { Controller, Post, Route, Tags, Body } from 'tsoa'
import { processImage } from './ocrService'
import { Express } from 'express'

@Route('ocr')
@Tags('OCR')
export class OCRController extends Controller {
  @Post('scan')
  public async scan(
    @Body() body: {base64Image: string}
  ): Promise<{ licensePlate: string }> {
    try {
        const buffer = Buffer.from(body.base64Image, 'base64')
        const licensePlate = await processImage(buffer)
        return { licensePlate }
        } catch (err) {
        console.error('OCR Controller Error:', err)
        throw err
        }
  } 
}
