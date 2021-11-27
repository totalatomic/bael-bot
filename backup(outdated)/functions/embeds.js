const Discord = require('discord.js');
const talkedRecently = new Set();
const { blacklist } = require('../json/blacklist @.json')

exports.AV = function (args, msg) {
    const embedAV = new Discord.MessageEmbed();
    const user = msg.mentions.users.first() || msg.author;

    if (talkedRecently.has(msg.author.id)) {
        msg.channel.send(`Wait 20 seconds before typing that again. -${msg.author.username}`);
        msg.delete({ timeout: 5 }).catch(console.error);
    }
    else {
        embedAV
            .setColor(0x0cf0ba)
            .setFooter(msg.author.username)
            .setImage(user.avatarURL({ size: 2048, dynamic: true }))
            .setTitle(`${user.username}'s profile picture`)
            .setDescription(`Links:\n[png](${user.displayAvatarURL({ format: "png", size: 2048 })}) | [jpg](${user.displayAvatarURL({ format: "jpg", size: 2048 })}) | [gif](${user.displayAvatarURL({ format: "gif", size: 2048, dynamic: true })}) | [webp](${user.displayAvatarURL({ format: "webp", size: 2048 })})`)
            .setTimestamp(new Date())
        msg.channel.send(embedAV);

        if (msg.author.id != "701740972714885140") {
            // Adds the user to the set so that they can't talk for a minute
            talkedRecently.add(msg.author.id);
            setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(msg.author.id);
            }, 20000);
        }
    }
}
exports.Poll = function (args, msg) {
    const embedPoll = new Discord.MessageEmbed();
    if (talkedRecently.has(msg.author.id)) {
        msg.channel.send(`Wait 60 seconds before typing that again. - ${msg.author.username}`);
    }
    else {
        if (!args[1]) {
            embedPoll
                .setColor(0x0cf0ba)
                .setTitle('poll')
                .setDescription('to make a poll do: >poll to make a simple yes or no poll')

            msg.channel.send(embedPoll);
            // Adds the user to the set so that they can't talk for a minute
            talkedRecently.add(msg.author.id);
            setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(msg.author.id);
            }, 20000);
            return;
        }
        let msgArgs = args.slice(1).join(' ');
        blacklist.forEach(function (item, index, array) {
            msgArgs = msgArgs.replace(item, ` `);
        });

        embedPoll
            .setColor(0x0cf0ba)
            .setDescription(`📝**${msgArgs}**`)
            .setAuthor(msg.author.username, msg.author.avatarURL());

        msg.channel.send(embedPoll).then(MessageReaction => {
            MessageReaction.react('✅');
            MessageReaction.react('♻');
            MessageReaction.react('❌');
            msg.delete({ timeout: 5 }).catch(console.error)
        });

        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(msg.author.id);
        setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(msg.author.id);
        }, 60000);

    }
}
exports.ClassicPoll = function (args, msg) {
    if (talkedRecently.has(msg.author.id)) {
        msg.channel.send(`Wait 60 seconds before typing that again. - ${msg.author.username}`);
    }
    else {
        if (!args[1] === "poll") return msg.reply("classic?");
        if (!args[2]) {
            msg.channel.send('to make a poll do: >classic poll <message> to make a simple yes or no poll');
            // Adds the user to the set so that they can't talk for a minute
            talkedRecently.add(msg.author.id);
            setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(msg.author.id);
            }, 20000);
            return;
        }
        let msgArgs = args.slice(2).join(' ');
        blacklist.forEach(function (item, index, array) {
            msgArgs = msgArgs.replace(item, ` `);
        });

        msg.channel.send(`📝**${msgArgs}**`).then(MessageReaction => {
            MessageReaction.react('✅');
            MessageReaction.react('❌');
            msg.delete({ timeout: 5 }).catch(console.error)
        });

        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(msg.author.id);
        setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(msg.author.id);
        }, 60000);

    }
}