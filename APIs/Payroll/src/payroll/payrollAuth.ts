import { Request } from 'express'

export function expressAuthentication(
  request: Request,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const authHeader = request.headers.authorization

    if (!authHeader) {
       return reject({
        status: 401,
        message: 'Missing Authorization header',
      }) 
    }

    const apiKey = authHeader.includes(' ') ? authHeader.split(' ')[1] : authHeader

    if (apiKey === process.env.PAYROLL_API_KEY) {
      resolve(true)
    } else {
       return reject({
        status: 401,
        message: 'Missing Authorization header',
      }) 
    }
  })
}