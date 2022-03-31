/* Global Project Variables */
const content = document.getElementById('content')
const feelingsField = document.getElementById('feelings')
const dateField = document.getElementById('date')
const temperatureField = document.getElementById('temp')
// Dynamically create a new JS date instance
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Link and Key from openweathremap.org
const key = '&appid=31562766ee00aa3699e7ad8ca87a71c3'
const baseLink = 'http://api.openweathermap.org/data/2.5/weather?'

//Zip number constant
const zipNumber = document.getElementById('zip'); 

const openWeather = async function (baseLink, zip = '', api) {
  //defining url
    const url = `${baseLink}zip=${zip}${api}` 
    return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        title.innerHTML="Unexpected error fetching data ";
        throw new Error(response.status);
      }
});

 
}

// custom data by user
const postServer = async function (path, data = {}) {
  const response = await fetch(path, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(data),
    }) 
  console.log(data)
}


//button  async function, await for waiting data from server
const button = async function () { 
  const newData = await openWeather(baseLink, zipNumber.value, key)
  const data = { date: newDate, temperature: newData.main.temp, feelingsData: feelingsField.value}
  await postServer(('http://localhost:3000'), data) 
  .then(async function () {
    const response = await fetch(('http://localhost:3000/all'));
    const jsonText = await response.json()
    
    dateField.innerHTML = jsonText.date;
    content.innerHTML = jsonText.feelingsPost;
  
    // changed temparature to degree celcius
    temperatureField.innerHTML = Math.floor((jsonText.temperature)-273.15);     
  });
} 


// Click Button Event Listener
const generate = document.getElementById('generate');
generate.addEventListener('click', button);