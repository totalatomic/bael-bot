const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { tenorApiCall, reactionEmbeds } = require("./reactionGifController");

module.exports = class kiss extends commando.Command {
    constructor(client) {
        super(client, {
            name: "kiss",
            memberName: "kiss",
            group: "reactiongifs",
            description: "allows you to kiss a pinged user or yourself",
            aliases: ["kissed", "kis"],
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
        let gif = await tenorApiCall("kiss", 30);
        let embed = reactionEmbeds(msg);
        embed
        .setTitle(user.id == msg.author.id ? `${msg?.member?.displayName ? msg.member.displayName : msg.author.username} gets kissed, how lewd` : `${msg?.guild.member(user.id)?.displayName ? msg.guild.member(user.id).displayName : user.nickname} gets kissed by ${msg?.member?.displayName ? msg.member.displayName : msg.author.username}, how my my what a lewd thing to do`)
        .setImage(gif)
        .setDescription(`${argsString} \n [gif](${gif})`)
        return msg.say(embed)
    }
};