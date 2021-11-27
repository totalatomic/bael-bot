const commando = require("@iceprod/discord.js-commando");
const {FriendlyError} = require('@iceprod/discord.js-commando');
const afkSchema = require('../../schemas/afk-schema');

module.exports = class afk extends commando.Command {
    constructor(client) {
        super(client, {
            name: "afk",
            memberName: "afk",
            group: "util",
            description: "brb",
            args: [
                {
                    type: "string",
                    key: "reason",
                    prompt: "-",
                    default: "is afk ",
                }
            ],
            throttling: {
                duration: 60 * 5, //5min
                usages: 1
            }
        });
    }
    async run(msg, { reason }) {
        try {
            await new afkSchema({
                userId: msg.author.id,
                guildId: msg.guild.id,
                reason: reason
            }).save();
            
            return await msg.reply(`set your afk to: ${reason}`).then(m => {
            m.delete({ timeout: 5000 })
            });
                

        } catch (error) {
            console.log(error)
        }
    }
};