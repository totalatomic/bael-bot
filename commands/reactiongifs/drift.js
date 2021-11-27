const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { tenorApiCall, reactionEmbeds } = require("./reactionGifController");

module.exports = class drift extends commando.Command {
    constructor(client) {
        super(client, {
            name: "drift",
            memberName: "drift",
            group: "reactiongifs",
            description: "i feel i have been in this place before",
            throttling: {
                duration: 10,
                usages: 1
            },
            hidden: true
        });
    }
    async run(msg, args) {
        let gif = await tenorApiCall("drifting", 8);
        let embed = reactionEmbeds(msg);
        embed
        .setTitle(`${msg?.member?.displayName ? msg.member.displayName : msg.author.username} does a sick drift, look at them go`)
        .setImage(gif)
        .setDescription(args ? `${args} \n [gif](${gif})` : `[gif](${gif})`)
        return msg.say(embed)
    }
};