/* Global Project Variables */
// Link and Key from openweathremap.org

const apiKey = '&appid=31562766ee00aa3699e7ad8ca87a71c3&units=metric';
const baseLink = 'http://api.openweathermap.org/data/2.5/weather?'

const content = document.getElementById('content')
const feelingsField = document.getElementById('feelings')
const dateField = document.getElementById('date')
const temperatureField = document.getElementById('temp')

// Dynamically create a new JS date instance
let d = new Date();
let newDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();


console.log (newDate)


//Zip number constant
const zipNumber = document.getElementById('zip'); 
console.log(zipNumber)
const openWeather = async function (baseLink, zipNumber = '', apiKey) {

  //defining url
  const url = `${baseLink}zip=${zipNumber}${apiKey}` 

  let title=document.querySelector('#title1');
  return fetch(url).then(response => {
    if (response.status == 200) {
      return response.json(); 
    } else {
      setTimeout(warn, 10);
      function warn () {
        title.innerHTML="Please enter valid input"
        setTimeout(warnWillDisapear, 3000);
          function warnWillDisapear () {
          title.innerHTML="Most Recent Entry ";
        }}
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


//button  asynchronus function, sending and receiving data from server
const button = async function () { 
  const newData = await openWeather(baseLink, zipNumber.value, apiKey)
  const data = { date: newDate, temperature: newData.main.temp, feelingsData: feelingsField.value}
  await postServer(('http://localhost:3000'), data) 

  .then(async function () {
    const response = await fetch(('http://localhost:3000/all'));
    const jsonText = await response.json()
    dateField.innerHTML = jsonText.date;
    content.innerHTML = jsonText.feelingsPost;
  
    // Unit value rounded up
    temperatureField.innerHTML = Math.floor((jsonText.temperature)); 
    // temperatureField.innerHTML = Math.floor((jsonText.temperature)-273.15);   //unit has been converted in the key    
  });
  
} 


// Click Button Event Listener
const generate = document.getElementById('generate');
generate.addEventListener('click', button);