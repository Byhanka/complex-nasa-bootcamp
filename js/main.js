// worked with house Hayden to figure out complex API's Mentor Seth, cohort members Mena, Patricia, Angel, Zach, Denzel, Jessica, Akeem, Valery, Nia and Kadhir

//grab variables
const btn = document.querySelector('#search')
const items = document.querySelector('#list')


//create function
function facilityLocation(){
    const url = ('https://data.nasa.gov/resource/gvk9-iz74.json')

    fetch(url)
    .then(res => res.json())
    .then(nasaData => {
        console.log(nasaData)
    const addFacility = (facility) => {
        // console.log(facility)
        const {latitude: lat, longitude: lon } = facility.location // grabbing latitude and longitude from facility location object 
        // console.log(lat)
        // console.log(lon)
        const {facility: addr, city, state} = facility // grabbing address, city and state from the facility object

        const listItem = document.createElement('li') // creating the li element to be displayed in the dom
        listItem.innerText = `${addr}, ${city}, ${state}, ${''}` // displaying address city and state in the dom

        const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e8d1869379d757626c33eda772b2a4fa`
        
        fetch(url2)
        .then(res => res.json())
        .then(weatherData =>{
            console.log(weatherData)
            if (weatherData?.main?.temp) {  //  if the weather is true then grab main if main is true grab temp
                let kelvin = weatherData.main.temp // putting the temperature into kelvin
                let fahrenheit = (kelvin - 273.15) * 1.8 + 32 // converting kelvin into fahrenheight
                // weather.innerText = (`temp ${Math.floor(fahrenheit)}`)
                listItem.innerText += `Temperature : ${Math.floor(fahrenheit)}`
            }
        })
        items.appendChild(listItem) // appending the created li's into the UL 
        throw new Error('stop loop') // creating a new error message to stop it from pulling all at once 
    } 
    nasaData.forEach(addFacility)   // looping through nasa objected data adding it to the list and displaying it to the DOM 
    }) 
}
btn.addEventListener('click', facilityLocation) // creating event listener to run function when button is clicked. 