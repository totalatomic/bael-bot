const {FriendlyError} = require('@iceprod/discord.js-commando');
const  {MessageEmbed} = require('discord.js');
exports.GotchaEmbed = function (msg){
    if(msg && msg.guild)
        if(!msg.channel.permissionsFor(msg.client.user).has("EMBED_LINKS")) throw new FriendlyError("this command requires me to have embed_links");
    
    var embed = new MessageEmbed();
    if(msg && msg.guild){
        embed
        .setColor(msg?.guild?.me.roles.color?.hexColor ? msg?.guild?.me.roles.color?.hexColor : 0x0cf0ba)
        .setTimestamp(new Date())
    }
    return embed;
}