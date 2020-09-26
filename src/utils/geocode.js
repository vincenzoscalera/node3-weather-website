const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidmluY2Vuem9zY2FsZXJhIiwiYSI6ImNrZjM2ZWE3dTAwNWIycXM2aTRwcTJ0c2YifQ.DzEg5FVmMyBqTzTxz_J8NA&limit=1'
    
    
    request({url:url, json:true},(error, response) =>{
        
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0){
            callback('Unable to find location! please try another search.', undefined)
        }
        else
        {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports = geocode