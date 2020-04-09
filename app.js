const express = require("express");
const app = express();;
const path = require("path");
const fs = require("fs");
const querystring = require('querystring');
const url = require('url');


const PORT = process.env.PORT || 4001;

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('views'));


fs.readFile('storage.json', 'utf8', function setObjCallback(err,data){
    if (err){
        console.log(err);
    } else {
        obj = JSON.parse(data);
        return obj;
    }});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/make_post.html'))
}) 

//creating a new post:
app.post('/', (req, res) => {
    formData = req.body;
    fs.readFile('storage.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now it an object
        let commentArray = [];
        //adding a date stamp:
        
                var thisDate = new Date();
                var day = thisDate.getDate();
                var ukTime= (thisDate.getTimezoneOffset() + 60) / 60; //getting the difference of hours btw the users time zone and UK time GMT + 1
                let dayOfWeek = "";
                //getting day of the week
                switch (thisDate.getDay()) {
                    case 0:
                      dayOfWeek = "Sunday";
                      break;
                    case 1:
                        dayOfWeek = "Monday";
                      break;
                    case 2:
                        dayOfWeek = "Tuesday";
                      break;
                    case 3:
                        dayOfWeek = "Wednesday";
                      break;
                    case 4:
                        dayOfWeek = "Thursday";
                      break;
                    case 5:
                        dayOfWeek = "Friday";
                      break;
                    case 6:
                        dayOfWeek = "Saturday";
                  }
                let month = "";
                  //getting the month name
                switch (thisDate.getMonth()) {
                    case 0:
                      month = "January";
                      break;
                    case 1:
                        month = "February";
                      break;
                    case 2:
                        month = "March";
                      break;
                    case 3:
                        month = "April";
                      break;
                    case 4:
                        month = "May";
                      break;
                    case 5:
                        month = "June";
                      break;
                    case 6:
                        month = "July";
                    case 7:
                         month = "August";
                      break;
                    case 8:
                        month = "September";
                      break;
                    case 9:
                        dayOfWeek = "October";
                      break;
                    case 10:
                        dayOfWeek = "November";
                      break;
                    case 11:
                        dayOfWeek = "December";
                      break;
                  }
                //getting the time stamp:
                    var hours = thisDate.getHours() + ukTime; //offetting the local hours for GMT +1
                    var minutes = thisDate.getMinutes();
                    var ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // the hour '0' should be '12'
                    minutes = minutes < 10 ? '0'+minutes : minutes;
                    var strTime = hours + ':' + minutes + ' ' + ampm;
                //putting the date stamp together:
                var today = `${dayOfWeek} ${month} ${day} at ${strTime} (GMT +1)`;
        //addidint a date stamp to the post object:
        formData.date = today;
        //adding an array for comments:
        formData.comments = commentArray;
        obj.posts.push(formData); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFileSync('storage.json', json); // write it back 
    }});
    res.redirect('/blog-feed'); 
}); 

// //creating a new comment:

app.post('/comment/:postIndex', (req, res) => {
    let postArrayId = parseInt(req.params.postIndex); //works
    let postArrayIndex = postArrayId; // -1 
    console.log(req.params);
    console.log(req.body);
    let commentData = req.body;
    
    fs.readFile('storage.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
     
        commentObj = JSON.parse(data); 
        commentObj.posts[postArrayIndex].comments.push(commentData);
        console.log(commentObj.posts[postArrayIndex].comments);
        
        // //now it is an object
        json = JSON.stringify(commentObj); //convert it back to json
        fs.writeFileSync('storage.json', json); // write it back 
    }});
    res.redirect('/blog-feed');
});

//use this to transfer data from my form to the json object. there should be a redirect in this route to prevent resubmission.

app.get('/blog-feed', (req, res) => {
    let rawData = fs.readFileSync('./storage.json');
    let output = JSON.parse(rawData);
    console.log(output);
    res.sendFile(path.join(__dirname, '/views/display.html'));
});


app.get('/get-posts', (req,res) => {
    res.sendFile(path.join(__dirname, 'storage.json'));
});
//this route is for retrieving data from the big storage.json and displaying it to the user

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})
