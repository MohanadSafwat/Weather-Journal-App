// object that hold the data 
projectData = {};

// require express
const express = require("express");


// make an instanse of express called app
const app = express();

// require cors
const cors = require('cors');
app.use(cors());


// require body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Initialize the main project folder
app.use(express.static('website'));




// get request and send index.html
app.get('/',function(req,res){
    res.sendFile(__dirname+"website/index.html");
    
});

// data array that had all data 
var data=[];

// post request and push data in data array
app.post('/weather',function(req,res){
    projectData = {temp:req.body.temp, content: req.body.content, date:req.body.date};
    data.push(projectData);
});

// get request and send data to client 
app.get('/all',function(req,res){
    res.send(data);
})

//initialize port
app.listen(3000,function(){
    console.log("hello from port 3000");
});