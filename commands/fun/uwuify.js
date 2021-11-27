const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { Uwuifier } = require("uwuifier/dist");

const footermsg = [
    "i cant believe im doing this, ill kill whoever thought of the idea of uwu speak",
    "what the fuck is this shit im looking at master",
    "Who the fuck coded me to do this?"
]

module.exports = class uwuify extends commando.Command {
    constructor(client) {
        super(client, {
            name: "uwuify",
            memberName: "uwuify",
            group: "fun",
            description: "turns input text into bottom speak",
        });
    }

    run(msg, args) {
        const uwu = new Uwuifier()
        const embed = new MessageEmbed()
        let rand = Math.floor(Math.random() * footermsg.length)
        let text = uwu.uwuifySentence(args)

        embed
        .setTitle(`${msg?.member?.displayName ? msg.member.displayName : msg.author.username} translated your input:`)
        .setDescription(text)
        .setColor(msg?.guild?.me.roles.color?.hexColor ? msg?.guild?.me.roles.color?.hexColor : 0x0cf0ba)
        .setFooter(footermsg[rand])
        return msg.say(embed)
	}
};