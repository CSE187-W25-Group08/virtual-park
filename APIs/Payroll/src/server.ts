/*
#######################################################################
#
# Copyright (C) 2022-2025 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without 
# the express written permission of the copyright holder.
#
#######################################################################
*/
/*
#######################################################################
#                   DO NOT MODIFY THIS FILE
#######################################################################
*/

import dotenv from 'dotenv'
dotenv.config()

import app from './app'

app.listen(3040, () => {
  console.log(`Server Running on port 3040`)
  console.log('API Testing UI: http://localhost:3040/api/v0/docs/')
})