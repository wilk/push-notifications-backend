const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    bunyan = require('bunyan'),
    logger = bunyan.createLogger({name: 'reg-be'}),
    config = require('config'),
    Sentencer = require('sentencer'),
    request = require('request'),
    PUSH_NOTIFICATION_INTERVAL = 5000

let tokens = []

setInterval(() => {
    if (tokens.length === 0) return

    let message = Sentencer.make("Sometimes {{ adjective }} {{ nouns }} make it {{ adjective }}")

    console.log(`SENDING A PUSH NOTIFICATION -> ${message}`)

    let payload = {
        notifications: [{
            tokens: tokens,
            platform: 2,
            message: message
        }]
    }

    console.log('PUSH NOTIFICATION PAYLOAD', payload)
    request.post('http://localhost:8088/api/push', {body: payload, json: true}, function (err, res, data) {
        if (err) return console.error(err)

        if (res.statusCode === 200) console.log('PUSH NOTIFICATION SENT')
        else console.log('CANNOT SEND PUSH NOTIFICATION', res.statusCode)
    })
}, PUSH_NOTIFICATION_INTERVAL)

app.use(bodyParser.json())
app.use(cors())
app.use((req, res, next) => {
    logger.info(`${req.ip} ${req.method} ${req.url}`)
    
    next()
})
app.post('/register', (req, res) => {
    logger.info(`REGISTER ID: ${req.body.registrationId}`)

    if (tokens.indexOf(req.body.registrationId) === -1) tokens.push(req.body.registrationId)
    
    res.end()
})
app.get('/sender', (req, res) => {
    logger.info(`SENDER ID: ${config.senderID}`)
    
    res.json({senderId: config.senderID})
})

app.listen(config.port, config.host, () => logger.info(`app listening on ${config.host}:${config.port}`))