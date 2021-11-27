const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { tenorApiCall, reactionEmbeds } = require("./reactionGifController");

module.exports = class nom extends commando.Command {
    constructor(client) {
        super(client, {
            name: "nom",
            memberName: "nom",
            group: "reactiongifs",
            description: "allows you to nom, or to nom someone else",
            aliases: ["nomm", "bite"],
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
             default: " ",}],
             throttling: {
                duration: 5,
                usages: 1
            }
        });
    }
    async run(msg, {user, argsString}) {
        let gif = await tenorApiCall("nom", 20);
        let embed = reactionEmbeds(msg);
        embed
        .setTitle(user.id == msg.author.id ? `${msg?.member?.displayName ? msg.member.displayName : msg.author.username} gets nommed, lets hope that didnt hurt too much` : `${msg?.guild.member(user.id)?.displayName ? msg.guild.member(user.id).displayName : user.nickname} gets nommed by ${msg?.member?.displayName ? msg.member.displayName : msg.author.username}`)
        .setImage(gif, {size: 1024})
        .setDescription(`${argsString} \n [gif](${gif})`)
        return msg.say(embed)
    }
};