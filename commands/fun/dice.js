const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");
let embed = new MessageEmbed;

module.exports = class dice extends commando.Command {
    constructor(client) {
        super(client, {
            name: "dice",
            memberName: "dice",
            group: "fun",
            description: "rolls a dice with a given amount of sides",
            args: [{
                type: "string",
                key: "dice",
                prompt: "what kind of dice do you wish to use",
                wait: 5,
            }],
            aliases: ["d", "roll",],
            throttling: {
                duration: 10,
                usages: 1
            }
        });
    }
    run(msg, { dice }) {
        //get the dice 
        //check if we can split the dice on d
        //get a random number for each of the dices
        // if it is either 1 or the highest number make it bold

        console.log(dice)
        embed
            .setTitle(`${msg?.member?.displayName ? msg.member.displayName : msg.author.username} rolled: ${Math.floor(Math.random() * dice)}`)
            .setColor(msg?.member?.roles.color?.hexColor)
        return msg.say(embed);
    }
};