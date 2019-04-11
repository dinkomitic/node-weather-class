const request = require('request')

const geocode = (address, callback) => {
    const mapBoxKey = 'pk.eyJ1IjoiZG1pdGljIiwiYSI6ImNqdGE0c2JkbDA3YXE0M251eDNkc3RqODQifQ.ZTlbfuv6KqwhljeVvo7zsw'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=1&access_token=' + mapBoxKey

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to mapping service.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode