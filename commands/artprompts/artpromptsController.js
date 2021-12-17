const axios = require("axios");
const cheerio = require('cheerio');

exports.fetchPrompt = async function (params, htmlclass) {
    //get the full html
    const { data } = await axios.get(`https://www.artideasgenerator.com/${params}.php`);
    //start cheerio
    const $ = cheerio.load(data);
    //find all of the en class's text
    const item = $(`.${htmlclass}`).text()
    console.log(item)
    //remove other html tags and split on the new line
    const arrAttb = item.replace(/<\/?[^>]+(>|$)/g, "").split("\n")
    console.log(arrAttb)
    //remove white spaces and unnessery data
    var trimmedArrAtrb = [];
    arrAttb.forEach(function (atr, i) {
        if (atr.trim() == '' || atr == null || i == 0 || i == arrAttb.length - 1) {
            return;
        }
        return trimmedArrAtrb.push(atr.trim())
    })
    return trimmedArrAtrb;
}