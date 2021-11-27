const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { tenorApiCall, reactionEmbeds } = require("./reactionGifController");
const config = require('../../config.json')


module.exports = class pet extends commando.Command {
    constructor(client) {
        super(client, {
            name: "pet",
            memberName: "pet",
            group: "reactiongifs",
            description: "allows you to pet someone or yourself",
            aliases: ["pat", "pe", "pwt"],
            args: [{
                type: "user",
                key: "user",
                prompt: "which user to use?",
                default: msg =>  msg.mentions.members.first() || msg.author,
                wait: 10,
            },
            {
                type: "string",
                key: "argsString",
                prompt: "for the emperor",
                default: " ",
            }],
            throttling: {
                duration: 5,
                usages: 1
            }
        });
    }
    async run(msg, { user, argsString }) {
        let gif = await tenorApiCall("headpat", 34)
        let embed = reactionEmbeds(msg);
        let title = user.id == msg.author.id ? `${msg?.member?.displayName ? msg.member.displayName : msg.author.username} gets headpats, how cute` : `${msg?.guild.member(user.id)?.displayName ? msg.guild.member(user.id).displayName : user.nickname} gets headpats from ${msg?.member?.displayName ? msg.member.displayName : msg.author.username}, adorable!`;
        
        if (user.id == config.baelID) {
            title = `hmmm i love headpats, i *will* remember this kind act human` 
        }
        
        embed
            .setTitle(title)
            .setImage(gif)
            .setDescription(`${argsString} \n [gif](${gif})`)
        return msg.say(embed)
    }
}