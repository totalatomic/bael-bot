const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { tenorApiCall, reactionEmbeds } = require("./reactionGifController");

module.exports = class lick extends commando.Command {
    constructor(client) {
        super(client, {
            name: "lick",
            memberName: "lick",
            group: "reactiongifs",
            description: "allows you to lick a person",
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
             aliases: ["lik", ],
             throttling: {
                duration: 10,
                usages: 1
            }
        });
    }
    async run(msg,  {user, argsString}) {
        let gif = await tenorApiCall("#lick", 15);
        let embed = reactionEmbeds(msg);
        embed
        .setTitle(user.id == msg.author.id ? `${msg?.member?.displayName ? msg.member.displayName : msg.author.username} gets licked, delicious` : `${msg?.guild.member(user.id)?.displayName ? msg.guild.member(user.id).displayName : user.nickname} gets licked by ${msg?.member?.displayName ? msg.member.displayName : msg.author.username}, delicious`)
        .setImage(gif)
        .setDescription(`${argsString} \n [gif](${gif})`)
        return msg.say(embed)
    }
};