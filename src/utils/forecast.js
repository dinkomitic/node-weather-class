const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a78c2b2928914c9ce0850937b6064c42/' + longitude + ',' + latitude + '?units=si&lang=hr'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find weather for location.', undefined)
        } else {
            callback(undefined, 
                body.daily.data[0].summary + ' Trenutno je ' + body.currently.temperature + ' stupnja Celzijusa. Postoji ' + body.currently.precipProbability + '% šanse padalina.\r\n Dnevna najviša temperatura: ' + body.daily.data[0].temperatureMax 
                + '. Dnevna najniža temperatura: ' + body.daily.data[0].temperatureMin
            )
        }
    })
}

module.exports = forecast