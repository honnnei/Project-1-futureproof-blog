const express = require("express");
const app = express();
const path = require("path")
const fs = require("fs")
//const querystring = require('querystring')

const PORT = process.env.PORT || 4001;

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('views'));


var obj = {posts : []};
obj.posts.push({blogPost:''});
json = JSON.stringify(obj);
fs.writeFileSync('storage.json', json);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/make_post.html'))
}) 

app.post('/', (req, res) => {
    formData = req.body;
    fs.readFile('storage.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now it an object
        obj.posts.push(formData); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFileSync('storage.json', json); // write it back 
    }});

    console.log(formData);
    console.log(obj);
    //let writeData = JSON.stringify(formData);
    //fs.appendFileSync('./storage.json', writeData);
    res.redirect('/new-entry'); 
}); 

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