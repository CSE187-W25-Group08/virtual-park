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

    if (email == 'matt@books.com') {
      return HttpResponse.json('this-is-an-id') 
    }

    if (email == 'dog@books.com') {
      return HttpResponse.json('this-guy-has-tickets')
    }

    if (email == 'fake@books.com') {
      return new HttpResponse(null, { status: 401 }) 
    }

    if (email == 'empty@books.com') {
      return new HttpResponse('')
    }

    if (email == 'problem@books.com') {
      return HttpResponse.json('problem-guy')
    }
  }),

  http.post('http://localhost:4010/graphql', async ({ request }) => {
      const body = await request.json() as graphQLRequest
      const { driverId } = body.variables

      if (driverId === 'this-is-an-id') {
        return HttpResponse.json({
          data: {
            unpaidTicketCount: 0
          }
        })
      }

      if (driverId === 'this-guy-has-tickets') {
        return HttpResponse.json({
          data: {
            unpaidTicketCount: 5
          }
        })
      }

      if (driverId === 'problem-guy') {
        return HttpResponse.json(null, { status: 401 })
      }
    })
]