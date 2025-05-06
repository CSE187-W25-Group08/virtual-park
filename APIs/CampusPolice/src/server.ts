import dotenv from 'dotenv'
dotenv.config()

import app from './app'

app.listen(3020, () => {
  console.log('Server running on port 3020')
  console.log('API Testing UI: http://localhost:3020/api/v0/police/docs')
})
