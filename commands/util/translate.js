const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { TranslateInput } = require("./TranslateController");
let embed = new MessageEmbed;

module.exports = class translate extends commando.Command {
    constructor(client) {
        super(client, {
            name: "translate",
            memberName: "translate",
            group: "util",
            description: "translate input to a given language ex: >translate <lang> <input>",
            argsType: "multiple",
            aliases: ["translat", "tr", "trl", "tl"],
            throttling: {
                duration: 10,
                usages: 1
            }
        });
    }
    async run(msg, args) {
        let lang = args[0];
        let text = args.slice(1).join(" ")

        //checks if the input is sanitised to go into the api
        if (!lang) return msg.reply("Do I look like im psychic? What language do you want me to translate to?");
        if (lang.length != 2) return msg.reply("Please use abbreviations ex: english = en")
        if (!text) return msg.reply("What do you want me to translate?")

        //build the embed
        embed
            //send the data to the translator and get the return translated back
            .setDescription(await TranslateInput(text, lang))
            .setTitle("Google Translate:")
            .setColor(msg?.guild?.me.roles.color?.hexColor || 0x0cf0ba)
            .setFooter(msg.author.username)
            .setTimestamp(new Date())
            .setAuthor(msg.member.displayName, msg.author.avatarURL());
        //send the embed
        msg.say(embed);
    }
};