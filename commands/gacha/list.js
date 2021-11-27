const commando = require("@iceprod/discord.js-commando");

const gatchaSchema = require('../../schemas/gatcha-schema');
const GotchaInsertSchema = require('../../schemas/gatchaInsert-schema');
const { GotchaEmbed } = require('./gotchaController');

module.exports = class list extends commando.Command {
    constructor(client) {
        super(client, {
            name: "list",
            memberName: "list",
            group: "gacha",
            description: "lists all the waifu's you or a pinged person have",
            args: [{
                type: "user",
                key: "user",
                prompt: "which user to use?",
                default: msg =>  msg.mentions.members.first() || msg.author,
                wait: 10,
            }],
            aliases: [""]
        });
    }
    async run(msg, { user }) {
        const Claimed = await gatchaSchema.find({
            userid: user.id,
            guildId: msg.guild.id
        }, (error) => {
            if (error)
                console.log(error)
        })
        if (Claimed.length) {
            try {
                let embed = GotchaEmbed(msg);
                let list = [];
                const curwaifu = await GotchaInsertSchema.find({
                    index: {
                        $in: Claimed.map(val => val.urlid)
                    }
                })
                curwaifu.forEach(value => {
                    list.push(`${value.name}`)
                });
                if(list){
                    embed
                    .setTitle(`${user.username}'s harem:`)
                    .setDescription(list)
                    return msg.say(embed)
                }
                else return msg.reply(`${user.tag} isnt married to anyone`);
            } catch (error) {
                console.log(error)
            }
        } else {
            return msg.reply(`${user.tag} isnt married to anyone`)
        }
    }
};