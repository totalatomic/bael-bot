const commando = require("@iceprod/discord.js-commando");
const config = require("./config.json");
const path = require('path');
const { MongoClient } = require('mongodb');
const MongoDBprov = require('commando-provider-mongo');
const mongo = require('./util/mongo');
const afkSchema = require("./schemas/afk-schema");
const { error } = require("console");
const { MessageEmbed } = require("discord.js");

const client = new commando.CommandoClient({
    owner: '701740972714885140',
    commandPrefix: config.prefix,
    disableMentions: "all"
});

client.setProvider(
    MongoClient.connect(config.mongoPath, {
        useUnifiedTopology: true,
        keepAlive: true,
        useNewUrlParser: true,
        connectTimeoutMS: 1000 * 3
        })
        .then((client) => {
            return new MongoDBprov(client, 'baelDB')
        }).catch(err => {
            console.error(err);
        })
)

client
    .on("ready", async () => {
        //shows a message that the bot is online
        console.log(`bael has risen, at ${client.readyAt}`)

        //new database connection
        await mongo()
        //imports commands
        client.registry
            .registerGroups([
                ["embeds", "embed commands"],
                ["util", "tools and utility commands"],
                ["reactiongifs", "reaction commands"],
                ["gacha", "gacha"],
                ["fun", "fun commands"],
                ["artprompts", "artprompts"]
            ])
            .registerDefaultTypes().registerDefaultGroups().registerDefaultCommands({
                unknownCommand: false,
                
            })
            .registerCommandsIn(path.join(__dirname, 'commands'))
        //sets the activity of the bot
        client.user.setActivity(`the chaos in ${client.guilds.cache.size} servers`, { type: 'WATCHING'});
    })
    .on("message", async msg => {
        try {
            //if the author is a bot
            if (msg.author.bot) return;
            //if dm
            if(msg.channel.type === 'dm') return;
            //if someone is mentioned and they are afk
            if (msg.mentions.members.size) {
                var responses = [];
                for (const [, mention] of msg.mentions.members) {
                    var message = await afkSchema.findOne({
                        userId: mention.id,
                        guildId: msg.guild.id
                    })
                    if (message) responses.push(`**${mention.displayName}**: "${message.reason}" \n`);
                }
                //if there is nobody in the pinged list in afk
                if (!responses.length){
                    //check if the author is afk as wel just to be sure
                    try{
                        var message = await afkSchema.findOne({
                            userId: msg.author.id,
                            guildId: msg.guild.id
                        });
                        if (!message) return;
                        message.deleteOne({
                            _id: message.id
                        })
            
                        return msg.reply("welcome back, i removed your afk").then(m => {
                            m.delete({ timeout: 5000 })
                          })
                    }catch(error){
                        console.log(error);
                    }
                }
    
                var texts = [];
                for (var response of responses) {
                    if (texts[texts.length - 1] && texts[texts.length - 1].length + response.length <= 2000) texts[texts.length - 1] += response;
                    else texts.push(response);
                }
                msg.reply(texts).then(m => {
                    m.delete({ timeout: 5000 })
                  });
            }
            try{
                var message = await afkSchema.findOne({
                    userId: msg.member.id,
                    guildId: msg.guild.id
                });
                if (!message) return;
                message.deleteOne({
                    _id: message.id
                })
    
                return msg.reply("welcome back, i removed your afk").then(m => {
                    m.delete({ timeout: 5000 })
                  })
            }catch(error){
                console.log(error);
            }
        } catch (error) {
            console.log(error)
        }




    })
    .on("commandError",(command, error, message, args, fromPattern) => {
        let embed = new MessageEmbed();
        embed
        .setTitle(`incountered a error on >${command.name}`)
        .setDescription(`error: \n ${error}`)
        .addField(`message content:`,`${message.content}`)
        .addField("at guild:",`${message.guild.name}\n **at channel:**\n ${message.channel.name}`)
        .setTimestamp(message.createdTimestamp)
        .setAuthor(`command author: ${message.author.username}`, message.author.avatarURL());
        client.channels.cache.get('793515561777627146').send(embed)
       })   
    .login(config.token);
