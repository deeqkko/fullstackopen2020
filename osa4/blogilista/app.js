const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')





mongoose.connect(config.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      logger.info(`Connected to Database`)
    })
    .catch(error => {
      logger.error(`Error connecting DB: ${error.message}`)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownUrl)
app.use(middleware.errorHandler)




module.exports = app