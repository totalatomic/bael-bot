const commando = require("@iceprod/discord.js-commando");
const { default: Axios, default: axios } = require("axios");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const cheerio = require('cheerio');
const { API, } = require('nhentai-api');
const Canvacord = require("canvacord");
const dailySchema = require('../../schemas/daily-schema')

let embed = new MessageEmbed;
let cache = [];

const clearCache = () => {
    cache = [];
    setTimeout(clearCache, 1000 * 60 * 10) //clear the cache once every 10 minutes
}
clearCache();

module.exports = class embedtest extends commando.Command {
    constructor(client) {
        super(client, {
            name: "embedtest",
            memberName: "embedtest",
            group: "embeds",
            description: "simple test to see how commands/embeds work in the new framework",
            aliases: ["embed", "test"],
            hidden: true,
            args: [{
                type: "integer",
                key: "number",
                prompt: "_",
                default: 10,
                wait: 10,
             }]
        });
    }

    async run(msg, {number}) {
        //get the full html
        const {data } = await axios.get("https://www.artideasgenerator.com/appearance.php");
        //start cheerio
        const $ = cheerio.load(data);
        //find all of the en class's text
        const item = $(".en").text()
        //remove other html tags and split on the new line
        const arrAttb = item.replace(/<\/?[^>]+(>|$)/g, "").split("\n")
        //remove white spaces and unnessery data
        const trimmedArrAtrb = [];
        arrAttb.forEach(function(atr, i) {
            if(atr.trim() == '' || atr == null || i == 0 || i == arrAttb.length - 1){
                return;
            }
            return trimmedArrAtrb.push(atr.trim())
        })

        //create the description string
        let discription = 
        `${trimmedArrAtrb[1]}\n 
        ${trimmedArrAtrb[2]}\n
        ${trimmedArrAtrb[3]}\n
        ${trimmedArrAtrb[4]}\n
        ${trimmedArrAtrb[5]}\n
        ${trimmedArrAtrb[6]}\n
        ${trimmedArrAtrb[7]}\n
        ${trimmedArrAtrb[8]}\n
        ${trimmedArrAtrb[9]}\n
        ${trimmedArrAtrb[10]}\n
        **${trimmedArrAtrb[11]}**\n
        ${trimmedArrAtrb[12]}\n
        ${trimmedArrAtrb[13]}\n
        ${trimmedArrAtrb[14]}`
        
        //create embed
        embed
        .setTitle(trimmedArrAtrb[0])
        .setDescription(discription)

        msg.say(embed)
    }
};