const request = require('request')
const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/forecast?access_key=e2c7f0c9816676781f043036ed71875c&query=' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        // console.log(latitude)
        // console.log(longitude)
        // console.log(url)
        // console.log(response.body)
        // console.log(response.body.success)
        
        // console.log("forecast:   --->" + " It is currently " + response.body.current + " degrees in " + response.body.location)
        
        var predictedForecast = "The predicted forecast is: " + response.body.current.weather_descriptions.toString()
        var onjectsInResponse = Object.keys(response.body.forecast).length
        //console.log(response.body.current.weather_descriptions.toString())
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (onjectsInResponse == 0){
            callback('Something wrong', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined,predictedForecast)
        }
    })
}


module.exports = forecast