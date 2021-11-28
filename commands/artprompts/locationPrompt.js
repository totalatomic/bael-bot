const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const {promptFetcher} = require('./artpromptsController');

module.exports = class locationPrompt extends commando.Command {
    constructor(client) {
        super(client, {
            name: "locationprompt",
            memberName: "locationprompt",
            group: "artprompts",
            description: "description",
            throttle: {
                uses: 1,
                time: 20
            }
        });
    }
    async run(msg, { args }) {
        let embed = new MessageEmbed;
        var arrAttb = await promptFetcher('/location.php')
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
            if (i == 0 || i == trimmedArrAtrb.length-1) return;
            if (atr == "Details to include :") {
                return detailarr.push({name: `**${atr}**` ,value: '\u200B', inline: false})
            }
            detailarr.push({name: '\u200B', value: atr, inline: true});
        })
        embed
            .addFields(detailarr)
            .setTitle(trimmedArrAtrb[0])

        msg.say(embed)
    }
};