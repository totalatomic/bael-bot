const commando = require("@iceprod/discord.js-commando");
const axios = require("axios");
const { MessageEmbed } = require("discord.js");
let embedBN = new MessageEmbed;

module.exports = class banner extends commando.Command {
    constructor(client) {
        super(client, {
            name: "banner",
            memberName: "banner",
            group: "util",
            description: "displays a users banner if they have one, if no user is given it will display the authors",
            args: [{
                type: "user",
                key: "user",
                prompt: "which user to use?",
                default: msg =>  msg.author,
                wait: 10,
             }],
            throttling: {
                duration: 60 * 2 ,//at 2 minutes
                usages: 1
            }
        });
    }
    async run(msg, { user }) {
        // use raw API request to get the User object from Discord API,
        // since the discord.js v12's one doens't support .banner property.
        const ApiUser = await this.client.api.users(user.id).get();
        if (!ApiUser.banner) return msg.reply("this user does not have a banner");

        //check if the banner is a gif by requesting the headers
        const baseUrl = `https://cdn.discordapp.com/banners/${user.id}/${ApiUser.banner}`;
        const { headers } = await axios.head(baseUrl);
            if (headers && headers.hasOwnProperty("content-type")) {
                let link = baseUrl + (headers["content-type"] == "image/gif" ? ".gif" : `.png`) + "?size=4096"
                embedBN
                .setColor(msg?.member?.roles.color?.hexColor)
                .setImage(link)
                .setTitle(`${msg?.guild?.member(user.id)?.displayName ? msg?.guild?.member(user.id)?.displayName : user.nickname}'s banner`)
                .setDescription(["jpg", "webp", "gif", "png", "jpeg"].map(t => `[${t}](${baseUrl + '.' + t })`).join(" | "))
                return msg.say(embedBN) ;
            }

        console.log(ApiUser)

    }
};