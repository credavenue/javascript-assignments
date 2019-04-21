const axios = require('axios');
const xml2js = require("xml2js");

const goodReadsUtils = {};

goodReadsUtils.parseXmlToJs = (xmlResponse) => {
    const parser = new xml2js.Parser({explicitArray : false});
    let toReturn;
    parser.parseString(xmlResponse, function (err, result) {
        if(err) {
            console.log(err);
            return {};
        }
        toReturn = result;
    });
    return toReturn;
};

goodReadsUtils.getResponseForUrl = async (url) => {

    let xmlResponse = await axios.get(url);
    return xmlResponse.data;
}

module.exports = goodReadsUtils;