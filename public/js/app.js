
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

if (weatherForm.addEventListener){
    weatherForm.addEventListener('submit', function(e) {
        e.preventDefault()

        const location = search.value

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        fetch('/weather?address=' + location).then(function(response) {
            response.json().then(function(data) {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    })
}
else if (weatherForm.attachEvent){
    weatherForm.attachEvent('submit', function(e) {
        e.preventDefault()

        const location = search.value

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        fetch('/weather?address=' + location).then(function(response) {
            response.json().then(function(data) {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    })
}