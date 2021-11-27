const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { tenorApiCall,reactionEmbeds } = require("./reactionGifController");

module.exports = class smug extends commando.Command {
    constructor(client) {
        super(client, {
            name: "smug",
            memberName: "smug",
            group: "reactiongifs",
            description: "allows you to smugly laugh",
            aliases: ["smugly", "laugh", "heh"],
            throttling: {
                duration: 10,
                usages: 1
            }
        });
    }
    async run(msg, args ) {
        try {
            let gif = await tenorApiCall("smug", 36);
            let embed = reactionEmbeds(msg);
            embed
            .setTitle(`${msg?.member?.displayName ? msg.member.displayName : msg.author.username} laughs smugly`)
            .setImage(gif)
            .setDescription(args ? `${args} \n [gif](${gif})` : `[gif](${gif})`)
            
            return msg.say(embed)
        } catch (error) {
            console.log(error)
        }

    }
};