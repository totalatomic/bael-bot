const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { tenorApiCall, reactionEmbeds } = require("./reactionGifController");

const bonks = [
    "https://media.tenor.com/images/e1abfac2a360a1c32052135e358e092f/tenor.gif",
    "https://media1.tenor.com/images/1fafbc792da0f6b5e3f346da5b81fafd/tenor.gif",
    "https://media1.tenor.com/images/dc4329d27745a6707219cb658f5b2c46/tenor.gif",
    "https://media.tenor.com/images/2f7d928dc382de3d2bad4a70732bf6f2/tenor.gif",
    "https://media1.tenor.com/images/10e3ed37158e9f88235a55fd59a33008/tenor.gif",
    "https://media.tenor.com/images/47698b115e4185036e95111f81baab45/tenor.gif",
    "https://media1.tenor.com/images/7437caf9fb0bea289a5bb163b90163c7/tenor.gif",
    "https://media1.tenor.com/images/4a6b15b8d111255c77da57c735c79b44/tenor.gif",
    "https://media.tenor.com/images/397fb2d758b4813681b66df6c1667e4a/tenor.gif",
    "https://media1.tenor.com/images/ec209369aec44130b42a76927f3620eb/tenor.gif"
]

module.exports = class bonk extends commando.Command {
    constructor(client) {
        super(client, {
            name: "bonk",
            memberName: "bonk",
            group: "reactiongifs",
            description: "allows you to hit another user or yourself",
            aliases: ["slap", "hit"],
            args: [{
                type: "user",
                key: "user",
                prompt: "which user to bonk?",
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
        try {
            let embed = reactionEmbeds(msg);
            let rand = Math.floor(Math.random() * bonks.length);
            let gif = bonks[rand];
            embed
                .setTitle(user.id == msg.author.id ? `${msg?.member?.displayName ? msg.member.displayName : msg.author.username} gets bonked, that must have hurt` : `${msg?.guild.member(user.id)?.displayName ? msg.guild.member(user.id).displayName : user.nickname} gets bonked by ${msg?.member?.displayName ? msg.member.displayName : msg.author.username}, that must have hurt`)
                .setImage(gif)
                .setDescription(`${argsString} \n [gif](${gif})`)
            return msg.say(embed)
        } catch (error) {
            console.log(error)
        }

    }
};