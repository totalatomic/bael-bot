const commando = require("@iceprod/discord.js-commando");
const axios = require("axios");
const cheerio = require('cheerio');

module.exports = class sceneprompt extends commando.Command {
    constructor(client) {
        super(client, {
            name: "sceneprompt",
            memberName: "sceneprompt",
            group: "artprompts",
            description: "describes a scene for you to use as insperation",
            throttle: {
                uses: 1,
                time: 20
            }
        });
    }
    async run(msg, { args }) {
        
    }
};