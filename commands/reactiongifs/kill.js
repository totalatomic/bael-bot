const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { declareVAR, reactionEmbeds } = require("./reactionGifController");

module.exports = class kill extends commando.Command {
    constructor(client) {
        super(client, {
            name: "kill",
            memberName: "kill",
            group: "reactiongifs",
            description: "allows you to kill either a person or yourself",
            args: [{
                type: "user",
                key: "user",
                prompt: "which user to kill?",
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
        let gif = await declareVAR("anime+die", 8);
        let embed = reactionEmbeds(msg);
        embed
        .setTitle(user.id == msg.author.id ? `${msg?.member?.displayName ? msg.member.displayName : msg.author.username} commits not alive, their soul shall make a fine addition to my collection` : `${msg?.guild.member(user.id)?.displayName ? msg.guild.member(user.id).displayName : user.nickname} gets killed by ${msg?.member?.displayName ? msg.member.displayName : msg.author.username}, wait friendly fire is on?`)
        .setImage(gif)
        .setDescription(`${argsString} \n [gif](${gif})`)
        return msg.say(embed)
    }
};