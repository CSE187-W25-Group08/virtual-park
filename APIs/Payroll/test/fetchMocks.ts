import { http, HttpResponse } from 'msw'

interface graphQLRequest {
  query: string
  variables: {
    input: string
  }
}

export const fetchMocks = [
  http.post('http://localhost:3010/api/v0/auth/id', async ({ request }) => {
    const url = new URL(request.url)
    const email = url.searchParams.get('email')

    if (!email) {
      return new HttpResponse(null, { status: 400 })
    }

    if (email == 'matt@books.com' || email == 'dog@books.com') {
      return HttpResponse.json('this-is-an-id') 
    }
  }),

  http.post('http://localhost:4010/graphql', async ({ request }) => {
      const body = await request.json() as graphQLRequest
      const { input } = body.variables
  
      if (input === 'this-is-an-id') {
        return HttpResponse.json({
          data: {
            unpaidTicketPayrollCount: 0
          }
        })
      }
    })
]