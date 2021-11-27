const commando = require("@iceprod/discord.js-commando");
const userobj = require('../../schemas/user-schema')
const dailySchema = require('../../schemas/daily-schema')

const hasclaimed = "you have already claimed your daily token"
let cache = [];

const clearCache = () => {
    cache = [];
    setTimeout(clearCache, 1000 * 60 * 10) //clear the cache once every 10 minutes
}
clearCache();


module.exports = class daily extends commando.Command {
    constructor(client) {
        super(client, {
            name: "daily",
            memberName: "daily",
            group: "gacha",
            description: "description",
            throttling: {
                duration: 60 * 60 * 24, //24 hours
                usages: 1
            }
        });
    }
    async run(msg, { args }) {
        if (cache.find(a => (a.userId === msg.author.id && a.guildId === msg.guild.id))) {
            return msg.reply(hasclaimed);
        }
        //make the object
        var cacheOBJ = {
            userId: msg.author.id,
            guildId: msg.guild.id
        }
        //check the database
        let res = await dailySchema.findOne({})
        //if the person has already claimed update the database
        if (res) {
            const then = new Date(res.updatedAt);
            const now = new Date().getTime();

            const diff = Math.abs(now - then);
            const diffDays = Math.round(diff / (1000 * 60 * 60 * 24));

            if (diffDays <= 0.5) {
                cache.push(cacheOBJ)
                return msg.reply(hasclaimed);
            }
        }

        //if not give the daily rewards
        let rand = Math.floor(Math.random() * 15 + 6)
        await userobj.updateOne({ userId: msg.author.id, guildId: msg.guild.id }, {
            $inc: { mana: rand }
        }).then(msg.reply(`you got [${rand}] mana, see you in 12 hours ;p`))
        //add person to database and cache
        //push to the database
        await dailySchema.updateOne(cacheOBJ, cacheOBJ, { upsert: true })
        //push to the cache
        cache.push(cacheOBJ)
    }
};