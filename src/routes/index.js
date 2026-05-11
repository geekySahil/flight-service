const express = require('express')
const v1Route = require('./v1/index.js')


const router = express.Router()

// middleware that is specific to this router
// const timeLog = (req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// }


// router.use(timeLog)

router.use('/v1', v1Route)

module.exports = router
