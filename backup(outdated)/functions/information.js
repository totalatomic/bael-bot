const Discord = require('discord.js');
const { match } = require('ffmpeg-static');
const embed = new Discord.MessageEmbed();
const information = require('../json/info.json');
const talkedRecently = new Set();


var botver = 'alpha: 0.16.10';

exports.info = function (args, msg) {
    var user = msg.author;

    if (talkedRecently.has(msg.author.id)) {
        msg.channel.send(`Wait 20 seconds before typing that again. -${msg.author.username}`);
        msg.delete({ timeout: 5 }).catch(console.error);
    }
    else {
        switch (args[1]) {
            case 'version':
                msg.channel.send(` am currently at version: ${botver}`);
                break;
            case 'creator':
                msg.channel.send('i was made by the illustrious Totalatomic#9117');
                break;
            
                case "convert":
                    msg.channel.send({
                        embed: {
                            color: 0x0cf0ba,
                            author: {
                                name: user.username,
                                icon_url: user.avatarURL()
                            },
                            title: `conversion methods`,
                            fields: [{
                                name: `convertions`,
                                value: information.allcomands.conversions,
                                inline: true
                            },
                            ],
                            timestamp: new Date()
                        }
                    });
                break;
            default:
                msg.channel.send({
                    embed: {
                        color: 0x0cf0ba,
                        author: {
                            name: user.username,
                            icon_url: user.avatarURL()
                        },
                        title: `my current commands:`,
                        fields: [{
                            name: `info commands`,
                            value: information.allcomands.info_commands,
                            inline: true
                        },
                        {
                            name: `useful commands`,
                            value: information.allcomands.useful_commands,
                            inline: true
                        },
                        {
                            name: `reactiongifs`,
                            value: information.allcomands.reaction_gifs,
                            inline: true
                        },
                        {
                            name: `waifu commands`,
                            value: information.allcomands.waifu_commands,
                            inline: true
                        },
                        {
                            name: `misc`,
                            value: information.allcomands.misc,
                            inline: true
                        }
                        ],
                        timestamp: new Date()
                    }
                });
                return;
        }

        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(msg.author.id);
        setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(msg.author.id);
        }, 20000);
    }
}
exports.help = function (args, msg){
    var user = msg.author;
    msg.channel.send({
        embed: {
            color: 0x0cf0ba,
            author: {
                name: user.username,
                icon_url: user.avatarURL()
            },
            title: `my current commands:`,
            fields: [{
                name: `info commands`,
                value: information.allcomands.info_commands,
                inline: true
            },
            {
                name: `useful commands`,
                value: information.allcomands.useful_commands,
                inline: true
            },
            {
                name: `reactiongifs`,
                value: information.allcomands.reaction_gifs,
                inline: true
            },
            {
                name: `waifu commands`,
                value: information.allcomands.waifu_commands,
                inline: true
            },
            {
                name: `misc`,
                value: information.allcomands.misc,
                inline: true
            }
            ],
            timestamp: new Date()
        }
    });
}
exports.conversion = function (args, msg) {
    if (talkedRecently.has(msg.author.id)) {
        msg.channel.send(`Wait 60 seconds before typing that again. ${msg.author.username}`);
        msg.delete({ timeout: 5 }).catch(console.error);
    } else {
        switch (args[1]) {
            case 'kgtolb':
                var kg = Number(args[2]);
                //m(lb) = m(kg) / 0.45359237
                var lb = kg / 0.45359237;
                msg.channel.send(`that would be ${lb} Lb`);
                break;
            case 'lbtokg':
                var lb = Number(args[2]);
                //m(kg) = m(lb) × 0.45359237
                var kg = lb * 0.45359237;
                msg.channel.send(`that would be ${kg} Kg`);
                break;
            case 'ftoc':
                var F = Number(args[2]);
                //T(°C) = (T(°F) - 32) / 1.8
                var C = (F - 32) / 1.8;
                msg.channel.send(`that would be ${C} degrees celsius`);
                break;
            case 'ctof':
                var c = Number(args[2]);
                //T(°F) = T(°C) × 1.8 + 32 
                var F = c * 1.8 + 32;
                msg.channel.send(`that would be  ${F} degrees fahrenheit`);
                break;
            case 'mtoft':
                var M = Number(args[2]);
                //d(ft) = d(m) / 0.3048
                var FT = M / 0.3048;
                msg.channel.send(`that would be ${FT} feet`);
                break;
            case 'fttom':
                var FT = Number(args[2]);
                //d(m) = d(ft) × 0.3048
                var M = FT * 0.3048;
                msg.channel.send(`that would be ${M} meter(s)`);
                break;
            case 'utodv':
                var U = Number(args[2]);
                var DV = U / 147;//cm
                msg.channel.send(`that would be ${DV} devito(s)`);
                break;
            case 'utobn':
                var	U = Number(args[2]);
                var BN = U / 17.8;//cm
                msg.channel.send(`that would be ${BN} bananas`)
                break;
            default:
                break;
        }
                        // Adds the user to the set so that they can't talk for a minute
                        talkedRecently.add(msg.author.id);
                        setTimeout(() => {
                            // Removes the user from the set after a minute
                            talkedRecently.delete(msg.author.id);
                        }, 60000);
    }
}
exports.dice = function(args, msg) {
    const embedAV = new Discord.MessageEmbed();
    const user = msg.mentions.users.first() || msg.author;

    if (talkedRecently.has(msg.author.id)) {
        msg.channel.send(`Wait 20 seconds before typing that again. -${msg.author.username}`);
        msg.delete({ timeout: 5 }).catch(console.error);
    }
    else {
        if(args[1] == null) return msg.channel.send('please instruct what kind of dice you are using');
        var U = Number(args[1]);

        msg.channel.send(`you rolled an: ${Math.floor(Math.random() * U)}`);

        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(msg.author.id);
        setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(msg.author.id);
        }, 20000);
    }
;
}