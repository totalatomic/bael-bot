const GotchaInsertSchema = require('../../schemas/gatchaInsert-schema');
const commando = require("@iceprod/discord.js-commando");
const { MessageCollector } = require('discord.js');
const { GotchaEmbed } = require('./gotchaController');

const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/


module.exports = class gatchainsert extends commando.Command {
    constructor(client) {
        super(client, {
            name: "gatchainsert",
            memberName: "gatchainsert",
            group: "gacha",
            description: "description",
            aliases: ["insert", "add"],
            throttling: {
                duration: 60 * 2,
                usages: 1
            },
        });
    }
    async run(msg, { args }) {
        let questions = [
            "please enter a name",
            "please enter a description",
            "please enter a img url"
        ]
        let counter = 0;

        const filter = m => m.author.id === msg.author.id;

        const collector = new MessageCollector(msg.channel, filter, {
            max: questions.length,
            time: 1000 * 120 //2min
        })

        msg.say(questions[counter++])

        collector.on('collect', m => {
            if (counter < questions.length) {
                m.say(questions[counter++])
            }
        })

        collector.on('end', async collected => {
            let embed = GotchaEmbed(msg);
            if (collected.size < questions.length) {
                return msg.reply('not all fields filled please try this command again')
            }
            const hasWord = (str, word) => 
                str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s+/).includes(word);
            const containsbadword = hasWord(collected.first().content, "hitler")
            if (containsbadword) {
                return msg.reply(`come on, i expected better of you ${msg.author.tag}`)
            }
            let attached = collected.array()[2]?.attachments.array()[0]?.url
            let match = collected.array()[2].content.match(regex)
            if (match || attached) {
                let name = collected.first().content;
                let discription = collected.array()[1].content;
                let img = attached  ? attached : match[0] 

                name = name.toLocaleLowerCase();
                try {
                    const isTaken = await GotchaInsertSchema.findOne({
                        name: name
                    })

                    if(isTaken){
                        embed
                        .setTitle(`${name} already exists in the database`);
                        return msg.reply(embed);
                    }
                    else{
                        embed
                        .setTitle(`preview: ${name}`)
                        .setImage(img)
                        .setDescription(discription)
                        msg.say(embed)

                        try {
                            await new GotchaInsertSchema({
                                index: await GotchaInsertSchema.countDocuments(),
                                name: name,
                                description: discription,
                                Url: img,
                                verified: false,
                                weight: math.floor(Math.random() * 9 + 1)
                            }).save();
                            console.log(`${msg.author.tag} added ${name}`)
                            return msg.reply(`added ${name} to the queue`).then(m => {
                                m.delete({ timeout: 1000 * 15 })
                              })
                        } catch (error) {
                            console.log(error);
                        }

                    } 
                } catch (error) {
                    console.log(error)
                }

            }
            else return msg.reply('please enter a valid image link that ends with the .<filetype>')

        })
    }
};