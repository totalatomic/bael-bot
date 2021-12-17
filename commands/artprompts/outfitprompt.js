const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const {fetchPrompt} = require('./artpromptsController');

module.exports = class outfitprompt extends commando.Command {
    constructor(client) {
        super(client, {
            name: "outfitprompt",
            memberName: "outfitprompt",
            group: "artprompts",
            description: "gives two seperate outfit ideas, a simple one and a detailed one",
            throttle: {
                uses: 1,
                time: 20
            }
        });
    }
    async run(msg, { args }) {
        let embed = new MessageEmbed;
        var trimmedArrAtrb = await fetchPrompt('outfit', 'en')
        //create the description string
        var detailarr = []
        trimmedArrAtrb.forEach(function (atr, i){
            if (i == 0 || i == trimmedArrAtrb.length-1) return;
            if (atr == "Full Outfit :" || atr == "or Detailed Outfit :" || atr == "(Optional)") {
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