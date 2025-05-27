import { Resolver, Mutation, Arg } from 'type-graphql';
import { processImage } from './ocrService';
import {ScanResult} from './schema'

@Resolver()
export class OCRResolver {
  @Mutation(() => ScanResult)
  async scanImage(
    @Arg('base64Image') base64Image: string
  ): Promise<ScanResult | undefined> {
    const buffer = Buffer.from(base64Image, 'base64');
    const licensePlate = await processImage(buffer);
    return {licensePlate};
  }
}