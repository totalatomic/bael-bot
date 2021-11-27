const Discord = require('discord.js');
const reactiongifs = require('../json/allgifs.json');
//make a list for users on cooldown
const talkedRecently = new Set();
const { blacklist } = require('./blacklist')

const embed = new Discord.MessageEmbed();

exports.waifugifs = function (args, msg, gifName, text, NL) {
    if (talkedRecently.has(msg.author.id)) {
        msg.channel.send(`Wait 50 seconds before typing that again. ${msg.author.username}`);
        msg.delete({ timeout: 5 }).catch(console.error);
    }
    else {
        const user = msg.mentions.users.first() || msg.author;
        var gifToUse = Math.floor(Math.random() * reactiongifs[gifName].length);
        var msgArgs = blacklist(args, NL)

        embed
            .setAuthor(user.username, user.avatarURL())
            .setColor(0x0cf0ba)
            .setImage(reactiongifs[gifName][gifToUse], {size: 1024})
            .setTitle(user.username + text)
            .setDescription(msgArgs);

        msg.channel.send(embed);
        if (!user.id === "701740972714885140") {
            // Adds the user to the set so that they can't talk for a minute
            talkedRecently.add(msg.author.id);
            setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(msg.author.id);
            }, 50000);
        }
    }
}