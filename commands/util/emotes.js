const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class emotes extends commando.Command {
    constructor(client) {
        super(client, {
            name: "emote",
            memberName: "emotes",
            group: "util",
            description: "input a single emote or emote name input multiple to get a responce with all the emotes \n *note*: only works with emoji's from servers in which bael is present",
            argsType: "multiple",
            aliases: ["e", "emotes"],
            throttling: {
                duration: 15,
                usages: 1
            }
        });
    }
    async run(msg, args) {
        // collection of emote names parced on spaces
        //check if there are parces emote names
        if (args[0] == undefined) return msg.reply("please mention a emote");
        //make the embed
        var embed = new MessageEmbed();
        //check if there are multiple emotes
        //if not go to a function that handles individual  emotes
        if (args.length == 1) {
            let emoteLink = await single_EmoteParcing(args[0], this.client)
            if (emoteLink == undefined || !emoteLink) {
                return msg.reply(`couldnt find :${args[0]}:`)
            }
            embed
                .setImage(emoteLink)
                .setDescription(["jpg", "webp", "gif", "png", "jpeg"].map(t => `[${t}](${emoteLink}.${t})`).join(" | "))
                .setColor(msg.member?.roles.color?.hexColor)

            return msg.say(embed);
        }
        //if yes go to a function that handles multiple emotes
        else {
            let emotes = await multi_EmoteParcing(args, this.client);
            return msg.say(emotes)
        }
    }
};

async function single_EmoteParcing(emoteName, this_client) {
    // reserve variables for emote info and link info
    let emote;
    let link;
    // singular emote name or emote object
    // try to split the emote name on ':' 
    var parcedEmoteName = emoteName.replace('>', '').split(':');
    // check if $parcedEmotename has more than one item
    if (parcedEmoteName.length > 1) {
        // if yes search on the included emote name and or on the id
        emote = await this_client.emojis.cache.find(Emoji => Emoji.name === parcedEmoteName[1])
        //if it doesnt find the emote
        if (emote == undefined) {
            link = `https://cdn.discordapp.com/emojis/${parcedEmoteName[2]}`
            //return the id link
            return link;
        }

        //return the name link
        link = `https://cdn.discordapp.com/emojis/${emote.id}` + (emote.animated ? ".gif" : "");
        return link;
        //emote name
    } else {
        // if not that means we are dealing with an emote name  
        //search on  emote name
        emote = this_client.emojis.cache.find(Emoji => Emoji.name === emoteName);
        //if nothing is found return error
        if (emote == undefined) {
            return null;
        }
        //if something is found return emoteNameLink
        link = `https://cdn.discordapp.com/emojis/${emote.id}` + (emote.animated ? ".gif" : "");
        return link;
    }
}
async function multi_EmoteParcing(emoteNames, this_client) {
    let all_Emotes = "";
    for (let i = 0; i < emoteNames.length; i++) {
        //split on : to account for actual emoji input
        var parcedEmoteName = emoteNames[i].split(':')
        let e;
        //if it is emoji input do this:
        if (parcedEmoteName.length > 1) {
            //get the emote from name
            e = await this_client.emojis.cache.find(Emoji => Emoji.name === parcedEmoteName[1])
        } else {
            //get the emote from emoji input
            e = await this_client.emojis.cache.find(Emoji => Emoji.name === emoteNames[i])

        }
        //if it cant find an emote it pastes into :: this is for when a unicode emoji is put in
        if (e == undefined || !e) { emotes += `:${args[i]}:`; continue; }
        if (e.animated == false) {
            //if its a normal emote
            all_Emotes += ` <:${e.name}:${e.id}>`;
            continue;
        }
        else if (e.animated) {
            //if its animated a gif
            all_Emotes += ` <a:${e.name}:${e.id}>`;
            continue;
        }
    }
    return all_Emotes;

}
