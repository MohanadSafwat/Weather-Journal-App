/* Global Variables */

// Create a new date instance dynamically with JS
let d;
let newDate;
let contentt;
let zipCode;

const apiKey = "&appid=b7a8613f93b501b86c8c94ffd092db3e";
var url = "https://api.openweathermap.org/data/2.5/weather?zip=";

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {

    zipCode =  document.getElementById("zip").value;
    contentt =  document.getElementById("feelings").value;
    d = new Date();
    newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
    console.log(zipCode+"::"+contentt+"::"+d+"::"+newDate);
      
  getWeather(url, zipCode, apiKey)
    .then(function(data) {
      console.log(data);
      postData("/weather", {
        temp: data.main.temp,
        content: contentt,
        date: newDate,
      });
    })
    .then(
        updateUI()
        );
}




const getWeather = async (url, zipCode, key) => {
    

  const res = await fetch(url + zipCode + key);
  console.log(res);

  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const data = await request.json();
    document.getElementById('content').innerHTML = data[0].content;
    document.getElementById("temp").innerHTML = data[0].temp;
    document.getElementById("date").innerHTML = data[0].date;
  } catch (error) {
    console.log("error", error);
  }
};
