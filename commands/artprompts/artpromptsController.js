const axios = require("axios");
const cheerio = require('cheerio');

exports.promptFetcher = async function (params) {
    //get the full html
    const { data } = await axios.get(`https://www.artideasgenerator.com${params}`);
    const $ = cheerio.load(data);
    //find all of the en class's text
    const item = $(".en").text()
    //remove other html tags and split on the new line
    const arrAttb = item.replace(/<\/?[^>]+(>|$)/g, "").split("\n")
    //return an array with atributes to be handled in the command itself
    return arrAttb;
}