const Discord = require('discord.js');
const bot = new Discord.Client({ disableEveryone: true });

const token = '';

const prefix = '>';

const { help, info, conversion, dice } = require('./functions/information');
const { Poll, AV, ClassicPoll } = require('./functions/embeds');
const { ReactiongifsUP } = require('./functions/reactiongifsunpingable');
const { waifugifs } = require('./functions/waIfu_commands');
const { Reactiongifs } = require('./functions/reactiongifs');
const { vent } = require('./functions/vent');
const {natureScene} = require('./functions/TESTING')
require('./json/relations.json')
var fuckinganon = false;

bot.on('ready', () => {
    console.log("bael has risen");
    bot.user.setActivity("what... don\'t tell me you were expecting a help command, fufu i could give you some >info for your efforts");
});

bot.on('message', async msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    let args = msg.content.substring(prefix.length).split(" ");
    args[0] = args[0].toLowerCase();
    switch (args[0]) {
        //info commands
        case 'info':
            info(args, msg);
            break;
        //functional commands
        case 'av':
            AV(args, msg);
            break;
        case 'poll':
            Poll(args, msg);
            break;
        case 'classic':
            ClassicPoll(args, msg);
            break;
        case 'convert':
            conversion(args, msg);
            break;
        //reaction commands
        case 'smug':
            ReactiongifsUP(args, msg, "smug", " laughs smugly.", 1,);
            break;
        case 'cry':
            ReactiongifsUP(args, msg, "cry", " is crying, quickly play the sad amv's.", 1);
            break;
        case 'shrug':
            ReactiongifsUP(args, msg, "shrug", " shrugs, :)", 1);
            break;
        case 'hold':
            Reactiongifs(args, msg, "held",
                " what a shamelessly lewd thing to do", 2,
                " why hold my hands when you can hold other parts of me ;)",
                " holds their own hand");
            break
        case 'denied':
            //755895734225731636 = submod
            //755895680228392981 = discmod
            if (msg.member.roles.cache.has('755895734225731636') || msg.member.roles.cache.has('755895680228392981')) {
                return ReactiongifsUP(args, msg, "denied", " doesn't like the idea", 1);
            }
            else return msg.channel.send("im sorry dave, i'm afraid i cant do that");
        case 'declare':
            if (!args[1] === null)
                args[1] = args[1].toLowerCase();
            if (args[1] === 'communism')
                ReactiongifsUP(args, msg, "communism", " comrade lets do this, for the soviet yun-yun", 2);
            else if (args[1] === 'crusade')
                ReactiongifsUP(args, msg, "crusade", " declares a crusade. lets crush the heretics", 2);
            else msg.channel.send("what were you going to declare user-sama?")
            break;
        case 'hug':
            Reactiongifs(args, msg, "hugged",
                " truly adorable.", 2,
                " fufu i do love a good hug",
                " you want to hug yourself? when you can hug me? your loss");
            break;
        case 'sip':
            ReactiongifsUP(args, msg, "sip", " takes a sip", 1);
            break;
        case 'ping':
            msg.channel.send("your internet is trash, get fucked lol");
            break;
        case 'yamero':
            ReactiongifsUP(args, msg, "yamero", " thinks its time to stop", 1);
            break;
        case 'pat':
            Reactiongifs(args, msg, "pet",
                " oh my how lewd", 2,
                " mmmmh i love headpats",
                " you cant really pat yourself you know, perhaps you should just pat me instead");
            break;
        case 'tsun':
            ReactiongifsUP(args, msg, "tsun", " hmpf, its not like i like you or anything... baka", 2);
            break;
        case 'rice':
            Reactiongifs(args, msg, "rice",
                " you look quite famished, here have some rice my dear.", 2,
                "",
                "");
            break;
        case 'kiss':
            Reactiongifs(args, msg, "kissed",
                " my what a lewd thing to do", 2,
                " ah a kiss, my i would almost blush",
                " why would you want to kiss yourself?");
            break;
        case 'sleep':
            ReactiongifsUP(args, msg, "sleep",
                " feels a bit sleepy", 1);
            break;
        case 'spin':
            ReactiongifsUP(args, msg, "spin",
                " gets spun like a record", 1);
            break;
        case 'pray':
            ReactiongifsUP(args, msg, "pray", " is praying to their god, how cute. it won\'t save you now", 1);
            break;
        case 'dance':
            ReactiongifsUP(args, msg, "dance", " is dancing", 1);
            break;
        case 'drunk':
            Reactiongifs(args, msg, "drunk", "fufu perhaps they sipped a bit to much", 1);
            break;
        case 'pout':
            ReactiongifsUP(args, msg, "pout", " pouts, my is there something wrong dear?", 2);
            break;
        case 'bonk':
            Reactiongifs(args, msg, "bonked",
                " that must have hurt", 2,
                " ow, thats not very nice",
                " why are you hitting yourself?");
            break;
        case 'nom':
            Reactiongifs(args, msg, "nomed",
                " what a little bite how adorable", 2,
                " are you trying to nom me? fufu go ahead i wont feel a thing",
                " i dont think its healthy to eat yourself");
            break;
        //waifu commands
        case 'astolfo':
            waifugifs(args, msg, "astolfo", " truly he is peak male performance don\'t you think?", 2);
            break;
        case 'miku':
            waifugifs(args, msg, "miku", " requests a picture of one of the best vocaloid artists and i will oblige", 2);
            break;
        case 'rem':
            msg.reply("who?");
            break;
        case 'zero':
            if (!args[1] === null)
                args[1] = args[1].toLowerCase();
            if (args[1] === 'two')
                waifugifs(args, msg, "zerotwo", " requests a picture of best girl and i will oblige", 2);
            else msg.channel.send("my my perhaps you could try >zero two, master");
            break;
        case 'freyja':
            if (!args[1] === null)
                args[1] = args[1].toLowerCase();
            if (args[1] === 'wion')
                waifugifs(args, msg, "freyjaWion", " requests a picture of best girl and i will oblige", 2);
            else msg.channel.send("were you perhaps trying to do >freyja wion");
            break;
        case 'holo':
            msg.channel.send("im sorry i only do best girls, perhaps try >zero two or >freyja wion or perhaps even >schwi");
            break;
        case 'schwi':
            waifugifs(args, msg, "schwi", " requests a picture of schwi from ngnl", 1);
            break;
        //misc.
        case 'exterminatus':
            msg.channel.send(`bael has arrived, and it is now that I perform our charge. In fealty to the god emperor our undying lord, and by the grace of the golden throne. I declare exterminatus upon ${msg.channel.name} I hereby sign the death warrant of an entire chat and consign a million souls to oblivion. May my justice account in all balance. The emperor protects`)
            break;
        case 'axl':
            msg.channel.send("It would appear you are looking for master trapu's pet perhaps try: axl help");
            break;
        case 'bael':
            msg.channel.send('My my were you expecting pictures of me, how cute. who knows maybe later ;)');
            break;
        case 'd':
            dice(args, msg);
            break;
        case 'suicide':
            msg.reply("i recommend against doing that. you have to outlive your enemies.");
            break;
        case 'eject':
            vent(args, msg);
            break;
        case 'e':
            if (args[1] == undefined) return msg.reply("please mention a emote");
            //loop through all args
            var emotes = "";
            try {
                for (let i = 1; i < args.length; i++) {
                    //caches the emote name
                    var e = bot.emojis.cache.find(Emoji => Emoji.name === args[i]);
                    //if it cant find an emote
                    if (e == undefined) { emotes += `:${args[i]}:`; continue; }
                    if (e.animated == false) {
                        //if its a normal emote
                        emotes += ` <:${e.name}:${e.id}>`;
                        continue;
                    }
                    else if (e.animated) {
                        //if its animated a gif
                        emotes += ` <a:${e.name}:${e.id}>`;
                        continue;
                    }
                }
                msg.channel.send(emotes);
            } catch (error) {
                console.log(error);
            }
            break;
        case "test":
            natureScene(args, msg);
            break;
        case "kirii":
            msg.channel.send(`<@${msg.author.id}> denied lmao bottom text gang`);
            break;
        case 'help':
            help(args, msg);
    }

})

bot.login(token);