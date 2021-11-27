const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");
let embedAV = new MessageEmbed;
module.exports = class avatar extends commando.Command {
    constructor(client) {
        super(client, {
            name: "avatar",
            memberName: "avatar",
            group: "util",
            description: "command that shows your or someone elses profile picture",
            args: [{
                type: "user",
                key: "user",
                prompt: "which user to use?",
                default: msg =>  msg.author,
                wait: 10,
             }],
            aliases: ["av", "pfp", "avatars", "avatar"],
            throttling: {
                duration: 5,
                usages: 1
            }
            
        });
    }
    run(msg, {user}) {
        try {
            embedAV
            .setColor(msg?.member?.roles.color?.hexColor)
            .setFooter(msg?.member?.displayName ? msg.member.displayName : msg.author.username)
            .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
            .setTitle(`${msg?.guild?.member(user.id)?.displayName ? msg?.guild?.member(user.id)?.displayName : user.nickname}'s profile picture`)
            .setDescription(["jpg", "webp", "gif", "png", "jpeg"].map(t => `[${t}](${user.displayAvatarURL({ format: t, size: 4096, dynamic: true})})`).join(" | "))
            .setTimestamp(new Date())
        msg.say(embedAV);
        } catch (error) {
            console.log(error)
        }

    }
};