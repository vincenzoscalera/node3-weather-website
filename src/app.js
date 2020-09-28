const path = require('path')
const express = require ('express')
const hbs = require ('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const fetch = require('isomorphic-fetch')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'\\..\\public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs') // this allow us to us Handlebar.js
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vincenzo Scalera'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather App',
        name: 'Vincenzo Scalera'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is the help page. You can get all the help you want and need.',
        name: 'Vincenzo Scalera'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude = 0, longitude = 0, location} = {}) => {
        if (error){
            return res.send({ error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
        
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search'
        })
    }
    
    res.send({
        products: []
    })
})

// Error pages
app.get('/help/*', (req, res) =>{
    res.send('Help Article not found')
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: 'Page Not Found',
        notFoundText: 'This is the not found page. Select one of the available pages.',
        name: 'Vincenzo Scalera'
    })
})

app.listen(port, () =>{
    console.log('Server up and running. Good to go on port ' + port)
})