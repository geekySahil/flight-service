const express = require('express')
const { ServerConfig, Logger } = require('./config/index.js')
const router = require('./routes')

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api', router)

app.listen(ServerConfig.PORT, async () => {
    console.log('Server is running on port ', ServerConfig.PORT)
    Logger.info('Server started Successfully')

  



})
