/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


let baseURL = 'http://api.animalinfo.org/data/?animal='
const apiKey = "&appid=b7a8613f93b501b86c8c94ffd092db3e";
var url = "https://api.openweathermap.org/data/2.5/weather?zip=";


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const zipCode =  document.getElementById('zip').value;
getWeather(url,zipCode, apiKey)

}
const getWeather = async (url, zipCode, key)=>{

  const res = await fetch(url+zipCode+key)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}