const commando = require("@iceprod/discord.js-commando");
const { GotchaEmbed } = require('./gotchaController');

const gatchaSchema = require('../../schemas/gatcha-schema');
const GotchaInsertSchema = require('../../schemas/gatchaInsert-schema');
const { MessageEmbed } = require("discord.js");
const userobj = require('../../schemas/user-schema')
const manareq = 5;

module.exports = class gacha extends commando.Command {
    constructor(client) {
        super(client, {
            name: "gacha",
            memberName: "gacha",
            group: "gacha",
            description: "honey 4pm time to spend your life savings for a png",
            throttling: {
                duration: 60 * 60 * 3, //3 hours
                usages: 3
            },
            aliases: ["w", "waifu"]
        });
    }
    async run(msg, { args }) {
        try {
            //check if the user has enough tokens
            //check if the user already has a account
            let uservals = await userobj.findOne({ userId: msg.author.id, guildId: msg.guild.id });
            if (uservals) {
                if (uservals.mana >= manareq) {
                    await userobj.updateOne({ userId: msg.author.id, guildId: msg.guild.id }, {
                        $inc: { mana: -manareq }
                    })
                } else {
                    return msg.reply(`you dont have enough mana, you will need ${manareq - uservals.mana} mana`)
                }
            }
            const character = await get_char();

            //check if the user already has the character
            let hascharacter = await gatchaSchema.find({ urlid: character.index, userid: msg.author.id, guildId: msg.guild.id })
            if (hascharacter.length) {
                //if you already have the character
                //find the user obj and increment the mana by 1
                userobj.updateOne({ userId: msg.author.id, guildId: msg.guild.id }, {
                    $inc: { mana: 1 }
                })
                //then return a embed showing the user
                let embed = build_embed(msg, character, true)
                return msg.say(embed)
            }
            //make the randomised stats so they can later be passed to the embed build
            //long ass aquasion i know but it basically takes the weight and makes rarer characters more powerfull on average
            var healthrand = ((80/ (character.weight + 2)) ^ (1 / 2)) + Math.floor(Math.random() * 4)
            var atcrand = ((80/ (character.weight + 2)) ^ (1 / 2)) + Math.floor(Math.random() * 4)
            var shieldrand = ((80/ (character.weight + 2)) ^ (1 / 2)) + Math.floor(Math.random() * 4)
            //the user doesnt have the character and possibly doesnt have a account
            if (uservals == undefined) {
                //if the user doesnt have a account
                new userobj({
                    userId: msg.author.id,
                    guildId: msg.guild.id,
                    mana: 1
                }).save();

                //save the result
                await new gatchaSchema({
                    userid: msg.author.id,
                    guildId: msg.guild.id,
                    urlid: character.index,
                    health: healthrand,
                    shield: shieldrand,
                    atc: atcrand,
                    ogWeight: character.weight,
                    lvl: 1
                }).save();

                let embed = build_embed(msg, character, false, healthrand, shieldrand, atcrand, character.weight)
                embed.setFooter("account has been created")
                return msg.say(embed)
            }
            //the user doesnt have the character and has an account
            //save the result
            await new gatchaSchema({
                userid: msg.author.id,
                guildId: msg.guild.id,
                urlid: character.index,
                health: healthrand,
                shield: shieldrand,
                atc: atcrand,
                lvl: 1
            }).save();
            //return result message
            //build the embed
            let embed = build_embed(msg, character, false, healthrand, shieldrand, atcrand, character.weight)
            //display the embed
            return msg.say(embed);

        } catch (error) {
            console.log(error)
        }
    }
};

function build_embed(msg, character, duplicate, bhp, bsld, batc, weight) {
    //get a embed
    let embed = new MessageEmbed();
    let rank = weightToRank(weight);

    //build the embed
    embed
        .setDescription(`discription: ${character.description}`)
        .setImage(character.Url)
        .setColor(msg?.guild?.me.roles.color?.hexColor || 0x0cf0ba)
        .setTimestamp(new Date())
        .setFooter(msg.author.username);

    if (!duplicate) {
        embed
            .addFields(
                { name: 'health:', value: `${bhp}`, inline: true },
                { name: 'shield strenght:', value: `${bsld}`, inline: true },
                { name: 'attack strenght:', value: `${batc}`, inline: true },
                { name: 'index:', value: `${character.index}`, inline: true },
                { name: 'rank:', value: rank, inline: true }
            )
            .setTitle(`${msg?.member?.displayName ? msg.member.displayName : msg.author.username} got ${character.name}`)
    } else {
        embed
            .setTitle(`${msg?.member?.displayName ? msg.member.displayName : msg.author.username} got (duplicate)${character.name}`)
            .setFooter("duplicates will automatically be sold for 1 mana")
    }
    return embed
}
async function get_char() {
    //get 5 random characters
    const characters = await GotchaInsertSchema.aggregate([
        { $sample: { size: 5 } },
        { $match: { verified: true } }
    ]);
    //filter the characters on weight
    var arr = [];
    for (let i = 0; i < characters.length; i++) {
        if (arr.length == 100) {
            break;
        }
        for (let ii = 0; ii < characters[i].weight * 10; ii++) {
            if (arr.length == 100) {
                break;
            }
            arr.push(characters[i]);
        }
    }
    let rand = Math.floor(Math.random() * arr.length);
    //get a character from the array
    const character = arr[rand];
    return character
}
function weightToRank(weight){
    var conversion= "";
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
        case  4:
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