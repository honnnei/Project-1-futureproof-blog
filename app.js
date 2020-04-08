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
        var month = thisDate.getMonth() + 1;
        var year = thisDate.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        formData.date = today;
        //adding an array for comments:
        formData.comments = commentArray;
        obj.posts.push(formData); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFileSync('storage.json', json); // write it back 
    }});

    // console.log(formData);
    // console.log(obj);
    //let writeData = JSON.stringify(formData);
    //fs.appendFileSync('./storage.json', writeData);
    res.redirect('/new-entry'); 
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
        // commentObj = JSON.parse(data); 
        // commentObj.posts[postArrayIndex].comments = commentData;
        // console.log(commentObj.posts[postArrayIndex].comments);
        // let commentArray = [];
        commentObj = JSON.parse(data); 
        // commentObj.posts[postArrayIndex].comments = commentArray;
        commentObj.posts[postArrayIndex].comments.push(commentData);
        console.log(commentObj.posts[postArrayIndex].comments);
        
        // //now it an object
        json = JSON.stringify(commentObj); //convert it back to json
        fs.writeFileSync('storage.json', json); // write it back 
    }});
    res.redirect('/new-entry');
});

    // // console.log(commentData);
    // console.log(obj);
    // //let writeData = JSON.stringify(formData);
    // //fs.appendFileSync('./storage.json', writeData);
    // res.redirect('/new-entry'); 
 

//use this to transfer data from my form to the json object. there should be a redirect in this route to prevent resubmission.

app.get('/new-entry', (req, res) => {
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
