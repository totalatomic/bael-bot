const commando = require("@iceprod/discord.js-commando");
const GotchaInsertSchema = require('../../schemas/gatchaInsert-schema');
const gatchaSchema = require('../../schemas/gatcha-schema');
const { GotchaEmbed } = require('./gotchaController');

let emotes = [
    "0️⃣",
    "1️⃣",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣",
]

module.exports = class find extends commando.Command {
    constructor(client) {
        super(client, {
            name: "find",
            memberName: "find",
            group: "gacha",
            description: "finds the given waifu in the db and gives a preview",
            args: [
                {
                    type: "string",
                    key: "argsString",
                    prompt: "please mention a waifu for me to find in my collection",
                }
            ]
        });
    }
    async run(msg, { argsString }) {
        let searchString = argsString.toLocaleLowerCase();
        function escapeRegExp(string) { // https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
            return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
        }
        const exists = await GotchaInsertSchema.find({
            name: { $regex: escapeRegExp(searchString) }
        }).limit(10);
        if (exists.length == 1 || exists.length > 1) {
            let embed = GotchaEmbed(msg);
            if (exists.length > 1) {
                let list = [];
                await exists.forEach(value =>
                    list.push(`${value.name}`)
                )
                embed
                    .setTitle("multiple found, please specify. here are all that i found:")
                    .setDescription(list)
                    .setImage(exists[0].Url)
                //send the message and store it in a const so the emote part can work
                const sendMessage = await msg.say(embed)
                //base the amount of emotes on the amount of results
                for (let i = 0; i < exists.length; i++) {
                    await sendMessage.react(emotes[i])
                }

                const filter = (reaction, user) => {
                    return [emotes[0], emotes[1], emotes[2], emotes[3], emotes[4], emotes[5], emotes[6], emotes[7], emotes[8], emotes[9]].includes(reaction.emoji.name) && user.id == msg.author.id;
                };
                const collector = sendMessage.createReactionCollector(filter, { time: 60000 });

                collector.on('collect', async (reaction, user) => {
                    for (let i = 0; i <= emotes.length; i++) {
                        if (reaction.emoji.name == emotes[i]) {
                            buildembed(i)
                            break;
                        }
                    }
                })

                async function buildembed(Index) {
                    let rank = weightToRank(exists[Index].weight)
                    embed
                        .setTitle(`preview: ${exists[Index].name}`)
                        .setImage(exists[Index].Url)
                        .setDescription(`**description:** ${exists[Index].description}\n **verified:** ${exists[Index].verified}\n **index:** ${exists[Index].index} \n**class:** ${rank}`)

                    return sendMessage.edit(embed);
                }
                return
            }
            try {
                let rank = weightToRank(exists[0].weight)
                embed
                    .setTitle(`preview: ${exists[0].name}`)
                    .setImage(exists[0].Url)
                    .setDescription(`**description:** ${exists[0].description}\n **verified:** ${exists[0].verified}\n **index:** ${exists[0].index}\n **class:** ${rank}`)

                return msg.say(embed)
            } catch (error) {
                console.log(error)
            }
        } else {
            return msg.say(`${argsString} doesnt exist in the database`)
        }
    }
};
function weightToRank(weight) {
    var conversion = "";
    switch (weight) {
        case 10:
        case 9:
            conversion = "very common"
            return conversion
        case 8:
        case 7:
        case 6:
        case 5:
            conversion = "common"
            return conversion
        case 4:
            conversion = "uncommon"
            return conversion
        case 3:
            conversion = "rare"
            return conversion
        case 2:
            conversion = "legendary"
            return conversion
        case 1:
            conversion = "ultra legendary"
            return conversion
        default:
            conversion = "yeah this doesnt work"
            return;
    }
}