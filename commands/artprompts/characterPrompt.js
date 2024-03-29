const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const {fetchPrompt} = require('./artpromptsController');

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
        //create the description string
        var trimmedArrAtrb = await fetchPrompt('appearance', 'en');
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