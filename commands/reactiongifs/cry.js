const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { tenorApiCall, reactionEmbeds } = require("./reactionGifController");

module.exports = class cry extends commando.Command {
    constructor(client) {
        super(client, {
            name: "cry",
            memberName: "cry",
            group: "reactiongifs",
            description: "allows you to cry",
            aliases: ["cri", "cries", "crys"],
            throttling: {
                duration: 10,
                usages: 1
            }
        });
    }
    async run(msg, args) {
        let gif = await tenorApiCall("cry", 30);
        let embed = reactionEmbeds(msg);
        embed
        .setTitle(`${msg?.member?.displayName ? msg.member.displayName : msg.author.username} cries, how sad axl play despacito`)
        .setImage(gif)
        .setDescription(args ? `${args} \n [gif](${gif})` : `[gif](${gif})`)
        return msg.say(embed)
    }
};