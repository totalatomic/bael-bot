const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { tenorApiCall, reactionEmbeds } = require("./reactionGifController");

module.exports = class pillow extends commando.Command {
    constructor(client) {
        super(client, {
            name: "pillow",
            memberName: "pillow",
            group: "reactiongifs",
            description: "allows you to give a lap pillow",
            aliases: ["lap", "lappillow"],
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
    async run(msg, {user, argsString} ) {
        let gif = await tenorApiCall("#lap+pillow", 2);
        let embed = reactionEmbeds(msg);
        embed
        .setTitle(user.id == msg.author.id ? `${msg?.member?.displayName ? msg.member.displayName : msg.author.username} gets a lap pillow, don\'t enjoy my thighs too much` : `${msg?.guild.member(user.id)?.displayName ? msg.guild.member(user.id).displayName : user.nickname } gets a lap pillow from ${msg?.member?.displayName ? msg.member.displayName : msg.author.username}`)
        .setImage(gif)
        .setDescription(`${argsString} \n [gif](${gif})`)
        msg.say(embed)
    }
};