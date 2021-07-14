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

var data=[];
app.post('/weather',function(req,res){
    projectData = {temp:req.body.temp, content: req.body.content, date:req.body.date};
    data.push(projectData);
});

app.get('/all',function(req,res){
     console.log(data);
    res.send(data);
})

app.listen(3000,function(){
    console.log("hello from server 3000");
});