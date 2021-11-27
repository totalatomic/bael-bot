const { CommandDispatcher, FriendlyError } = require('@iceprod/discord.js-commando')
const { default: Axios } = require('../../node_modules/axios');
const  {MessageEmbed} = require('discord.js');
let key = "QOR5VPA0CYSL";

exports.tenorApiCall = async function (gifName, limit) {
  try {
    let rand = Math.floor(Math.random() * limit);
    var res = await Axios.get("https://api.tenor.com/v1/search?q=anime+" + encodeURIComponent(gifName) + "&key=" + encodeURIComponent(key) + "&limit=" + encodeURIComponent(limit) + "&contentfilter=low");
    return res.data.results[rand].media[0].mediumgif.url
  } catch (error) {
    console.log(error)
  }
}
exports.declareVAR = async function (delcaring, limit) {
  try {
    let rand = Math.floor(Math.random() * limit);
    var res = await Axios.get("https://api.tenor.com/v1/search?q=" + encodeURIComponent(delcaring) + "&key=" + encodeURIComponent(key) + "&limit=" + encodeURIComponent(limit) + "&contentfilter=low");
    return res.data.results[rand].media[0].mediumgif.url;
  } catch (error) {
    console.log(error)
  }
}

exports.reactionEmbeds = function(msg) {
  if(msg && msg.guild)
        if(!msg.channel.permissionsFor(msg.client.user).has("EMBED_LINKS")) throw new FriendlyError("this command requires me to have embed_links");
    
    var embed = new MessageEmbed();
    if(msg && msg.guild){
        embed
        .setColor(msg?.guild?.me.roles.color?.hexColor || 0x0cf0ba)
        .setTimestamp(new Date())
        .setFooter(msg.author.username);
    }
    return embed;
}

