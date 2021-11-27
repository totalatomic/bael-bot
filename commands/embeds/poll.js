const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");

let emotes = [
    "1️⃣",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣",
    "🔟"
]


module.exports = class poll extends commando.Command {
    constructor(client) {
        super(client, {
            name: "poll",
            memberName: "poll",
            group: "embeds",
            description: "allows users to make a poll",
            throttle: {
                uses: 1,
                time: 20
            }
        });
    }
    run(msg, args) {
        let embedPoll = new MessageEmbed;
        if (!args) {
            embedPoll
                .setColor(msg?.member?.roles.color?.hexColor)
                .setTitle('poll')
                .setDescription('to make a poll do: >poll to make a simple yes or no poll')

            return msg.channel.send(embedPoll);
        }
        
        //split on ; this creates an array
        var polltext = args.split(';')

        if (polltext.length == 1) {
            embedPoll
                .setColor(msg?.member?.roles.color?.hexColor)
                .setDescription(`📝**${args}**`)
                .setAuthor(msg?.member?.displayName ? msg.member.displayName : msg.author.username, msg.author.avatarURL());

            return msg.channel.send(embedPoll).then(MessageReaction => {
                MessageReaction.react('✅');
                MessageReaction.react('♻');
                MessageReaction.react('❌');
                msg.delete({ timeout: 5 }).catch(console.error)
            });
        } else if (polltext.length > 10) {
            embedPoll
                .setColor(msg?.member?.roles.color?.hexColor)
                .setTitle('poll')
                .setDescription('too many options, please remember that 10 is the limit')

            return msg.channel.send(embedPoll);
        } else {
            embedPoll
                .setTitle(`poll`)
                .setAuthor(msg.member?.displayName ? msg.member.displayName : msg.author.username, msg.author.avatarURL())
                .setColor(msg?.member?.roles.color?.hexColor);
            for (let i = 0; i < polltext.length; i++) {
                if (!polltext[i] || polltext[i] == undefined) {
                    continue
                } else {
                    if (polltext[i].length > 1024) {
                        msg.reply(`option ${i + 1} has too many characters the limit is 1024`)
                        continue
                    } else {
                        embedPoll
                            .addField(`option${i + 1}:`, polltext[i])
                    }

                }
            }
            return msg.say(embedPoll).then(MessageReaction => {
                for (let ii = 0; ii < polltext.length; ii++) {
                    MessageReaction.react(emotes[ii]);
                }
                msg.delete({ timeout: 5 }).catch(console.error)
            });
        }


    }
};