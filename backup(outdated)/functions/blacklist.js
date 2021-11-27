const Discord = require('discord.js');
const { blacklist } = require('../json/blacklist @.json')

exports.blacklist = function (args, namelength) {
    var msgArgs = args.slice(namelength).join(' ');
    blacklist.forEach(function (item, index, array) {
        msgArgs = msgArgs.replace(item, " ");
    });
    return msgArgs;
}