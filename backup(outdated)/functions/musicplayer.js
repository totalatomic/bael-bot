const Discord = require('discord.js');
const bot = Discord.Client;
exports.musicPlay = async function(arg, msg){
    const voiceChannel = msg.member.voice.channel;
            if (!voiceChannel) return msg.channel.send('you will need to be in a voice channel to use this command');
            const permissions = voiceChannel.permissionsFor(bot.user);
            if (!permissions.has('CONNECT')) return msg.channel.send("i lack the required permissions to join, perhaps ask a mod to fix this small problem");
            if (!permissions.has('SPEAK')) return msg.channel.send('i lack the required permissions to talk, perhaps contact a mod to fix this small problem')

            try {
                var connection = await voiceChannel.join()
            } catch (error) {
                console.log(`failed to connect: ${error}`);
                return msg.channel.send(`There was a error while connecting: ${error}`)
            }
            const dispatcher = connection.play(ytdl(args[1]))
                .on('finish', () => {
                    voiceChannel.leave();
                })
            on('error', error => {
                console.log(error);
            })
            dispatcher.setVolumeLogarithmic(5 / 5)
}
exports.musicStop = async function(args, msg){
    if (!msg.member.voice.channel) return msg.channel.send('you will need to be in the voice chat to stop me');
            msg.member.voice.channel.leave();
            return undefined;
}