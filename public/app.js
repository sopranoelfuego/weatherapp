const infoDisplayer = document.getElementById('middle_up')
const form = document.querySelector('form')
const latitudeElement = document.getElementById('latitudeinputElement')
const longitudeElement = document.getElementById('longitudeinputElement')

const getWeather = async formData => {
 const { longitude, latitude } = formData
 const fullUrl = new Request(
  `http://localhost:5000/api?lon=${longitude}&lat=${latitude}`
 )
 const res = await fetch(fullUrl)
 const data = await res.json()

 if (data.status === 404) {
  alert('wrong Cordinates!! ,make sure you privide authentic coordinates...')
  return
 }

 if (data.status === 401) {
  alert('Error aquire,please retry')
  return
 }
 if (data.status === 400) {
  alert('Error aquire,please retry')
  return
 }
 displayWeatherInfo(data?.main, data.name)
 latitudeElement.value = longitudeElement.value = ''
}
const KelvinToCelsius = kelvinDegree => Math.ceil(kelvinDegree - 273.15)

const displayWeatherInfo = (info, name) => {
 console.log('info here', info)
 const {
  temp,
  // feels_like,
  temp_min,
  temp_max,
  pressure,
  humidity,
  sea_level,
  grnd_level,
 } = info

 infoDisplayer.innerHTML = `
  
   <h2 class="city" name="city">
      ${name}
   </h2>
   <p class="temperature" name="temperature">
    ${KelvinToCelsius(temp)} &deg;F
   </p>
  `
}

form.addEventListener('submit', e => {
 e.preventDefault()
 if (
  latitudeElement.value.trim() === '' ||
  longitudeElement.value.trim() === ''
 ) {
  alert('please fill the coordinates')
  return
 } else
  getWeather({
   latitude: latitudeElement.value,
   longitude: longitudeElement.value,
  })
})

getWeather({ longitude: '29.347916', latitude: '-3.361260' })
