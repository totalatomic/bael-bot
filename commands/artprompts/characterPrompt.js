const commando = require("@iceprod/discord.js-commando");
const axios = require("axios");
const cheerio = require('cheerio');
const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = class characterPrompt extends commando.Command {
    constructor(client) {
        super(client, {
            name: "characterprompt",
            memberName: "characterprompt",
            group: "artprompts",
            description: "description",
        });
    }
    async run(msg, { args }) {
        let embed = new MessageEmbed;
        //get the full html
        const { data } = await axios.get("https://www.artideasgenerator.com/appearance.php");
        //start cheerio
        const $ = cheerio.load(data);
        //find all of the en class's text
        const item = $(".en").text()
        //remove other html tags and split on the new line
        const arrAttb = item.replace(/<\/?[^>]+(>|$)/g, "").split("\n")
        //remove white spaces and unnessery data
        var trimmedArrAtrb = [];
        arrAttb.forEach(function (atr, i) {
            if (atr.trim() == '' || atr == null || i == 0 || i == arrAttb.length - 1) {
                return;
            }
            return trimmedArrAtrb.push(atr.trim())
        })

        //create the description string
        var detailarr = []
        trimmedArrAtrb.forEach(function (atr, i){
            if (i == 0) return;
            if (atr == "(Optional)") {
                return detailarr.push({name: atr,value: '\u200B', inline: false})
            }
            let satr = atr.replace(':',':#').split('#');
            detailarr.push({name: satr[0], value: satr[1], inline: true});
        })
        embed
            .addFields(detailarr)
            .setTitle(trimmedArrAtrb[0])

        msg.say(embed)
    }
};