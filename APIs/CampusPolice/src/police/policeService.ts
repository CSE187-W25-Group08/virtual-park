// import { checkPermitFromPlate } from "../permit/service";

export async function hasActivePermitForPlate(plate: string): Promise<string> {
    try {
        // return await checkPermitFromPlate(plate);
        return 'this works'
    } catch {
      return 'catch err';
    }
}