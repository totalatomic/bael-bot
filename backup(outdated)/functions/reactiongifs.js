const Discord = require('discord.js');
const reactiongifs = require('../json/allgifs.json');
const talkedRecently = new Set();
const { blacklist } = require('./blacklist')

const embedRG = new Discord.MessageEmbed();

exports.Reactiongifs = function (args, msg, gifName, description, giflength, ifbaelping, ifselfping, pingable) {
    if (talkedRecently.has(msg.author.id)) {
        msg.channel.send("Wait 20 seconds before typing that again. - " + msg.author.username);
        msg.delete({ timeout: 5 }).catch(console.error);
    }
    else {
        let mention = msg.mentions.users.first();
        let user = msg.author;
        var msgArgs = blacklist(args, giflength)
        if (mention == undefined) {
            //if nobody is pinned

            var gifToUse = Math.floor(Math.random() * reactiongifs[gifName].length);
            embedRG
                .setAuthor(user.username, user.avatarURL())
                .setColor(0x0cf0ba)
                .setImage(reactiongifs[gifName][gifToUse], {size: 1024})
                .setTitle(`${user.username} gets ${gifName}, ${description}`)
                .setDescription(msgArgs)
                .setFooter(`${gifToUse}`)
                .setTimestamp(new Date());
            if (gifName == "rice") {
            embedRG
            .setTitle(`${user.username} ${description}`);    
            }
            msg.channel.send(embedRG);
            return;
        }
        //if a person is pinged
        else{
            var gifToUse = Math.floor(Math.random() * reactiongifs[gifName].length);
            if (mention.id == '752964491716853861') {
                //the id is the bot id
                embedRG
                .setTitle(`${mention.username} gets ${gifName} by ${user.username}, ${ifbaelping}`);
                if (gifName == "rice") {
                    embedRG
                    .setTitle(`thank you ${user.username}, but i dont really need food how about you eat it instead`);
                }

            }
            //if you mention yourself
            else if (mention.id == msg.author.id) {
                if (gifName != "rice") {
                    embedRG
                    .setTitle(`${mention.username} gets ${gifName} by ${user.username}, ${ifselfping}`);
                }
                else{
                    embedRG
                    .setTitle(`${mention.username} gets ${gifName} from ${user.username}, ${ifselfping}`)
                }

            }
            else if (gifName == "rice") {

                embedRG
                .setTitle(`${mention.username} gets some ${gifName} from ${user.username}`)
            }


            //prevents me from getting bonked.
            else if(mention.id == '701740972714885140' && gifName == "bonked")return msg.channel.send("i recommend not hitting master unless you wish to lose a few digit\'s "); 
            //prevents ntr
            //quantum = 209880811057577985
            //4non = 252425284488396803
            else if (user.id != '209880811057577985' && mention.id == '252425284488396803' && gifName == "kissed" || user.id != '252425284488396803' && mention.id == '209880811057577985' && gifName == "kissed" ) return msg.channel.send("no ntr on this server only wholesome");
            else if (user.id != '209880811057577985' && mention.id == '252425284488396803' && gifName == "held" || user.id != '252425284488396803' && mention.id == '209880811057577985' && gifName == "held" ) return msg.channel.send("no ntr on this server only wholesome");
            else{
                embedRG
                    .setTitle(`${mention.username} gets ${gifName} by ${user.username}, ${description}`);
            }
            embedRG
                .setAuthor(user.username, user.avatarURL())
                .setColor(0x0cf0ba)
                .setImage(reactiongifs[gifName][gifToUse], {size: 1024})
                .setDescription(msgArgs)
                .setFooter(gifToUse)
                .setTimestamp(new Date());
    
            msg.channel.send(embedRG);

            if (!msg.author.id === "701740972714885140") {
                // Adds the user to the set so that they can't talk for a minute
                talkedRecently.add(msg.author.id);
                setTimeout(() => {
                    // Removes the user from the set after a minute
                    talkedRecently.delete(msg.author.id);
                }, 20000);
            }
        }
    }
}

