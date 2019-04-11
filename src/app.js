const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set static public path
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dinko Mitic'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
         title: 'About me',
         name: 'Dinko Mitic'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Dinko Mitic',
        help: 'You can call me any time'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })

        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            return res.send({
                weather: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })    

    // res.send({
    //     location: location,
    //     weather: forecastData,
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page Not Found',
        name: 'Dinko Mitic',
        errorMsg: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page Not Found',
        name: 'Dinko Mitic',
        errorMsg: 'Page not found'
    })
})



app.listen(3000, () => {
    console.log('Server started on port 3000')
})