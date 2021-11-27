const commando = require("@iceprod/discord.js-commando");
const { } = require("discord.js");
const { UCEmbed } = require('./EmbedController');

const art = require("../../json/art.json")

module.exports = class baelfanart extends commando.Command {
    constructor(client) {
        super(client, {
            name: "baelfanart",
            memberName: "baelfanart",
            group: "util",
            description: "fanart made by talented artists",
            aliases: ["bael", "fanart", "fanarts", "baal"],
            throttling: {
                duration: 10,
                usages: 1
            },
            details: "a collection of bael fanart, note: if this command is run in a nsfw channel it will show lewd fanart"
        });
    }

    run(msg, args) {
        //make the embed
        let embed = UCEmbed(msg);
        embed.setFooter("do you have bael fanart you want added? contact: Totalatomic#9117")
        //if the channel is safe for work
        if (!msg.channel.nsfw || msg.channel.nsfw == undefined) {
            //make a random based on the length of the sfw json array
            let randSfw = Math.floor(Math.random() * art.art.length)
            embed
                .setImage(art.art[randSfw].artwork)
                .setTitle(`${msg?.member?.displayName ? msg.member.displayName : msg.author.username} requesting a picture of me? my, my im almost flattered`)
                .setDescription(`this amazing art was made by: ${art.art[randSfw].artist}`)
            return msg.say(embed)
        }
        //if  the channel isnt safe for work
        else {
            let randNsfw = Math.floor(Math.random() * art.lewd.length)
            embed
                .setImage(art.lewd[randNsfw].artwork)
                .setTitle(`${msg?.member?.displayName ? msg.member.displayName : msg.author.username}, ara ara requesting lewd pictures of me? how cute`)
                .setDescription(`this amazing art was made by: ${art.lewd[randNsfw].artist}`)
            return msg.say(embed)
        }

    }
};