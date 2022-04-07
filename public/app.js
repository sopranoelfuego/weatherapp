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
  latitudeElement.value = longitudeElement.value = ''
  return
 }
 if (data.status === 400) {
  alert('Error aquire,please make sure you provides right coordinates')
  latitudeElement.value = longitudeElement.value = ''
  return
 }
 displayWeatherInfo(data)
 latitudeElement.value = longitudeElement.value = ''
}
const KelvinToCelsius = kelvinDegree => Math.ceil(kelvinDegree - 273.15)

const displayWeatherInfo = info => {
 console.log('info here', info)
 const { name, clouds, wind, main } = info
 const {
  temp,
  // feels_like,
  temp_min,
  temp_max,
  pressure,
  humidity,
  sea_level,
  grnd_level,
 } = main

 infoDisplayer.innerHTML = `
  
   
 <div class="left">
      <p class="temperature" name="temperature">
       ${KelvinToCelsius(temp)}&deg;C
      </p>
      <div>
      Humidité : ${humidity}%</br>
      Clouds:${clouds?.all}%</br> 
      Vent : ${wind?.speed} m/s</br>
      </div>
   </div>
   <div class="right">
   <h2 class="city" name="city">
      ${name}
   </h2>
   </div>
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
   latitude: latitudeElement.value.trim(),
   longitude: longitudeElement.value.trim(),
  })
})

// export const backKelvinToFahrenheit = kelvinDegree =>
//  Math.ceil(((kelvinDegree - 273.15) * 9) / 5 + 32)

getWeather({ longitude: '29.347916', latitude: '-3.361260' })
