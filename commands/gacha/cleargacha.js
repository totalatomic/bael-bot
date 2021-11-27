const commando = require("@iceprod/discord.js-commando");
const gatchaSchema = require('../../schemas/gatcha-schema');

module.exports = class cleargacha extends commando.Command {
    constructor(client) {
        super(client, {
            name: "cleargacha",
            memberName: "cleargacha",
            group: "gacha",
            description: "clears the claimed indexes from the gacha command",
            args: [
            ],
            userPermissions: [
                "ADMINISTRATOR"
            ],
            aliases: [
                "clear",
                "reset",
                "clearclaims",
                "clearall"
            ]
        });
    }
    async run(msg, { args }) {
        try {
            await gatchaSchema.deleteMany({})
            return msg.reply("reset the selection")
        } catch (error) {
            console.log(error)
        }

    }
};