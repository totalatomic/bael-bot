const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();
const img = "";
exports.natureScene = async function (args, msg) {
    try {
        session; //.Clientsession();
        response = await session.get("https://api.tenor.com/v1/random?q=anime+zero+two&key=XRK7Z66G3CUH&limit=20");
        data = JSON.loads(await Response.text());
        gif_choice = random.randint(1, 20)
        information = str(data['results'][gif_choice]['media'])
        Slicing1 = information[-1]
        Slicing2 = Slicing1[1]
        basedata = ast.literal_eval(Slicing2)
        gifurl = basedata['gif']['url']
        embed.set_image(url = gifurl)
        embed.set_author(name = (msg.author.name), icon_url = (msg.author.avatar_url))
        await session.close()
        await msg.send(embed = embed)
    } catch (error) {
        console.log(error);
    }

    
} 
