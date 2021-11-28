const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const {fetchPrompt} = require('./artpromptsController');

module.exports = class colourPrompt extends commando.Command {
    constructor(client) {
        super(client, {
            name: "colourprompt",
            memberName: "colourprompt",
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
        var trimmedArrAtrb = await fetchPrompt('colors', 'palette')
        var detailarr = []
        trimmedArrAtrb.forEach(function (atr, i){
           var satr = parseColor(atr)
            detailarr.push({name: atr, value: 'hex: ' + satr, inline: true});
        })
        embed
            .addFields(detailarr)
            .setTitle("here are two colour sets")

        msg.say(embed)
    }
};
function parseColor(color) {
    var arr=[]; color.replace(/[\d+\.]+/g, function(v) { arr.push(parseFloat(v)); });
    var returnhex = "#" + arr.slice(0, 3).map(toHex).join("")
    return returnhex;
}
function toHex(int) {
    var hex = int.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}