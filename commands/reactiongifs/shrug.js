const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { tenorApiCall, reactionEmbeds } = require("./reactionGifController");

module.exports = class shrug extends commando.Command {
    constructor(client) {
        super(client, {
            name: "shrug",
            memberName: "shrug",
            group: "reactiongifs",
            description: "¯\\_(ツ)_/¯",
            throttling: {
                duration: 10,
                usages: 1
            }
        });
    }
    async run(msg, args) {
        let gif = await tenorApiCall("shrug", 7);
        let embed = reactionEmbeds(msg);
        embed
            .setTitle(`${msg?.member?.displayName ? msg.member.displayName : msg.author.username} shrug's ¯\\_(ツ)_/¯`)
            .setImage(gif, { size: 1024 })
            .setDescription(args ? `${args} \n [gif](${gif})` : `[gif](${gif})`)
        return msg.say(embed)
    }
};