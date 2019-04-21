var express = require('express');
var path = require('path');
var app = express(),
HTML_FILE = path.resolve(__dirname, '../App.html');

app.use(express.static('dist'))
app.get('/', function(req, res) {
    res.sendFile(HTML_FILE)
});

app.listen(3000, function(){
    console.log("App listens in 3000");
})