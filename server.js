// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Require HTTP

const https = require("https");

// Start up an instance of app

const app = express();

const cors = require('cors');
app.use(cors());
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder

app.use(express.static('website'));




// Setup Server
app.get('/',function(req,res){
    res.sendFile(__dirname+"website/index.html");
    
});

app.post('/',function(req,res){
    var zipCode = req.body.zip;
    console.log(zipCode);
    const apiKey = "b7a8613f93b501b86c8c94ffd092db3e";
    var url = "https://api.openweathermap.org/data/2.5/weather?zip="+zipCode+"&appid="+apiKey;
    https.get(url,function(response){
        response.on("data",function(data)
        {
            const weatherData = JSON.parse(data);
            const description = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"


            res.write("<p> description is "+description+"</p>");
            res.write("<h1>temp is "+temp+ "</h1>");
            res.write("<img src=\"" +imageUrl+"\">" );
            res.send();




        });
    });
    
});


app.listen(3000,function(){
    console.log("hello from server 3000");
});