const commando = require("@iceprod/discord.js-commando");
const { default: Axios, default: axios } = require("axios");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const cheerio = require('cheerio');
const { API, } = require('nhentai-api');
const dailySchema = require('../../schemas/daily-schema')

let embed = new MessageEmbed;
let cache = [];

const clearCache = () => {
    cache = [];
    setTimeout(clearCache, 1000 * 60 * 10) //clear the cache once every 10 minutes
}
clearCache();

module.exports = class embedtest extends commando.Command {
    constructor(client) {
        super(client, {
            name: "embedtest",
            memberName: "embedtest",
            group: "embeds",
            description: "simple test to see how commands/embeds work in the new framework",
            aliases: ["embed", "test"],
            hidden: true,
            args: [{
                type: "integer",
                key: "number",
                prompt: "_",
                default: 10,
                wait: 10,
             }]
        });
    }

    async run(msg, {number}) {

    }
};