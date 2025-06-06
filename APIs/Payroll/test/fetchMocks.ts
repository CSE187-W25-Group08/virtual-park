import { http, HttpResponse } from 'msw'

interface graphQLRequest {
  query: string
  variables: {
    driverId: string
  }
}

export const fetchMocks = [
  http.get('http://localhost:3010/api/v0/auth/id', async ({ request }) => {
    const url = new URL(request.url)
    const email = url.searchParams.get('email')

    if (!email) {
      return new HttpResponse(null, { status: 400 })
    }

    if (email == 'matt@books.com') {
      return HttpResponse.json('this-is-an-id') 
    }

    if (email == 'dog@books.com') {
      return HttpResponse.json('this-guy-has-tickets')
    }
  }),

  http.post('http://localhost:4010/graphql', async ({ request }) => {
      const body = await request.json() as graphQLRequest
      const { driverId } = body.variables

      if (driverId === 'this-is-an-id') {
        return HttpResponse.json({
          data: {
            unpaidTicketPayrollCount: 0
          }
        })
      }

      if (driverId === 'this-guy-has-tickets') {
        return HttpResponse.json({
          data: {
            unpaidTicketPayrollCount: 5
          }
        })
      }
    })
]