const express = require("express");
const app = express();
const path = require("path")
const fs = require("fs")
//const querystring = require('querystring')

const PORT = process.env.PORT || 4001;

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/make_post.html'))
}) 

app.post('/', (req, res) => {
    formData = req.body;
    let writeData = JSON.stringify(formData);
    fs.writeFileSync('../storage.json', writeData);
    res.redirect('/results'); 
}); 

//use this to transfer data from my form to the json object. there should be a redirect in this route to prevent resubmission.

app.get('/new-entry', (req, res) => {
    let rawData = fs.readFileSync('../storage.json');
    let output = JSON.parse(rawData);
    console.log(output);
});

//this route is for retrieving data from the big storage.json and displaying it to the user

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})