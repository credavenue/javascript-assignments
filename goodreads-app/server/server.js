const express = require('express');
const path = require('path');
const goodReadsUtils = require("../goodReadsUtils");

let app = express();
let HTML_FILE = path.resolve(__dirname, '../App.html');
let key = "ai7gApVUJHETopsGfQtxEQ";


app.use(express.static('dist'))
app.get('/', function(req, res) {
    res.sendFile(HTML_FILE)
});

app.get('/getResponse', async function(req, res) {
    let url = "https://www.goodreads.com/search/index.xml?key="+key+"&q="+req.query.name+"&page="+req.query.page;
    let xmlResponse = await goodReadsUtils.getResponseForUrl(url);
    let jsResponse = await goodReadsUtils.parseXmlToJs(xmlResponse);
    res.json(jsResponse);
});

app.listen(3000, function(){
    console.log("App listens in 3000");
})