const commando = require("@iceprod/discord.js-commando");
const { tenorApiCall,reactionEmbeds } = require("./reactionGifController");

module.exports = class sip extends commando.Command {
    constructor(client) {
        super(client, {
            name: "sip",
            memberName: "sip",
            group: "reactiongifs",
            description: "alows you to sip",
            aliases: ["sipp", "drink", "consume"],
            throttling: {
                duration: 5,
                usages: 1
            }
        });
    }
    async run(msg, args) {
        let gif = await tenorApiCall("sip", 26);
        let embed = reactionEmbeds(msg);
        embed
        .setTitle(`${msg?.member?.displayName ? msg.member.displayName : msg.author.username} takes a sip, please dont drink too much`)
        .setImage(gif)
        .setDescription(args ? `${args} \n [gif](${gif})` : `[gif](${gif})`)
       return msg.say(embed)
    }
};