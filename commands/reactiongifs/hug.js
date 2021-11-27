const { MessageEmbed } = require("discord.js");
const { tenorApiCall, reactionEmbeds } = require("./reactionGifController");
const commando = require("@iceprod/discord.js-commando");

module.exports = class hug extends commando.Command {
    constructor(client) {
        super(client, {
            name: "hug",
            memberName: "hug",
            group: "reactiongifs",
            description: "allows you to hug ppl who need/deserve a hug",
            aliases: ["hugg"],
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
                duration: 10,
                usages: 1
            }
        });
    }
    async run(msg, {user, argsString}) {
        let gif = await tenorApiCall("hugging", 30);
        let embed = reactionEmbeds(msg);
        embed
        .setTitle(user.id == msg.author.id ? `${msg?.member?.displayName ? msg.member.displayName : msg.author.username} gets hugged, what a cute hug` : `${msg?.guild.member(user.id)?.displayName ? msg.guild.member(user.id).displayName : user.nickname} gets hugged by ${msg?.member?.displayName ? msg.member.displayName : msg.author.username}, what a cute sight`)
        .setImage(gif)
        .setDescription(`${argsString} \n [gif](${gif})`)
        return msg.say(embed)
    }
};