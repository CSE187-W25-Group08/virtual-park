import { Request } from "express";

export function expressAuthentication(request: Request): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      const error = new Error("Invalid API key");
      (error as Error & { status: number }).status = 401;
      return reject(error);
    }

    const apiKey = authHeader.includes(" ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (apiKey === "cn798J2policeCmn27HarrisnvwAS") {
      return resolve(true);
    } else {
      const error = new Error("Invalid API key");
      (error as Error & { status: number }).status = 401;
      return reject(error);
    }
  });
}
