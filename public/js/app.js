console.log('Client side js file')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() //doesn't refresh the browser
    
    const location = search.value
    const weatherURL = '/weather?address=' + location

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    fetch(weatherURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.weather
            }
        })
    })
})