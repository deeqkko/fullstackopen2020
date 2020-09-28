const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info(new Date())
    logger.info(`Method: ${request.method}; Path: ${request.path}`)
    logger.info(`Body: ${request.body}`)
    logger.info(`---`)
    next()
}

const tokenExtractor = (request, response, next) => {
    request.token = null
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        request.token = authorization.substring(7)
        logger.info(request.token)
    }

    next()
}

const unknownUrl = (request, response) => {
    response.status(404).send({error: 'Unknown url'})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'Invalid or malformatted Id'})
    }
    
    if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }

    next(error)
}

module.exports = {
    requestLogger,
    tokenExtractor,
    unknownUrl,
    errorHandler
}