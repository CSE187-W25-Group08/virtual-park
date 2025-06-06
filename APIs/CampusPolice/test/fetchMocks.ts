import { http, HttpResponse } from 'msw'

interface graphQLRequest {
  query: string
  variables: {
    input: string
  }
}

export const fetchMocks = [
  http.post('http://localhost:4000/graphql', async ({ request }) => {
    const body = await request.json() as graphQLRequest
    const { input } = body.variables

    if (input === '123BC4A') {
      return HttpResponse.json({
        data: {
          getPermitByPlateAPI: [{
            isValid: true
          }]
        }
      })
    }

    if (input === '7ZJN054') {
      return HttpResponse.json({
        data: {
          getPermitByPlateAPI: [{
            isValid: false
          }]
        }
      })
    }

    return HttpResponse.json({
      data: {
        getPermitByPlateAPI: []
      }
    })
  })
]