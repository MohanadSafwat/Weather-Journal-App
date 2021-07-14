//make global vars 
let date;
let specifiedDate;
let content;
let zipCode;

// my own api key and url of weather api
const apiKey = "&appid=b7a8613f93b501b86c8c94ffd092db3e";
var url = "https://api.openweathermap.org/data/2.5/weather?zip=";

// postDataToServer function that send the data to the server to store it 
const postDataToServer = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST", 
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), 
  });

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// event listner
document.getElementById("generate").addEventListener("click", action);

function action(e) {

    zipCode =  document.getElementById("zip").value;
    content =  document.getElementById("feelings").value;
    date = new Date();
    specifiedDate = date.getMonth() + "." + date.getDate() + "." + date.getFullYear();
      
  getWeather(url, zipCode, apiKey)
    .then(function(data) {
      postDataToServer("/weather", {
        temp: data.main.temp,
        content: content,
        date: specifiedDate,
      });
      dynamicUI()

    })

        
}




const getWeather = async (url, zipCode, key) => {
    

  const res = await fetch(url + zipCode + key);

  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const dynamicUI = async () => {
  const request = await fetch("/all");
  try {
    const data = await request.json();
    document.getElementById('content').innerHTML = "your feeling is:"+data[data.length -1].content;
    document.getElementById("temp").innerHTML = "temperature is: "+data[data.length -1 ].temp;
    document.getElementById("date").innerHTML = "date is: "+data[data.length -1].date;
  } catch (error) {
    console.log("error", error);
  }
};
