import dotenv from 'dotenv'
dotenv.config()

import app from './app'

app.listen(3030, () => {
  console.log('Server running on port 3030')
  console.log('API Testing UI: http://localhost:3030/api/v0/registrar/docs')
})
