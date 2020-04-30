const Discord = require('discord.js');
/*const {
	prefix,
	token,
} = require('./config.json');*/
const ytdl = require('ytdl-core');
const token = process.env.token;
const prefix = process.env.prefix;

const client = new Discord.Client({ disableEveryone: true });

client.on('warn', console.warn);

client.on('error', console.error);

client.once('ready', () => {
    console.log('Mascaro BOT online!');
   });

client.once('reconnecting', () => {
    console.log('Riconnetto!');
   });

client.once('disconnect', () => {
    console.log('Disconnetto!');
   });

client.on('message', async message => {

    var messaggioRisposta = message.content.toLocaleLowerCase();

    if ((messaggioRisposta === 'ciao masca') || (messaggioRisposta === 'ciao mascaro') || (messaggioRisposta === 'ciao mascarobot') || (messaggioRisposta === 'ciao mascaro bot'))
    {
       message.reply(' Ciao!');
    }

    if(message.author.bot) 
    {
        return undefined;
    }

    if (!message.content.startsWith(prefix))
    {
        return undefined;
    }

    const messaggio = message.content.split(' ');

    if (messaggio.content.startsWith('${prefix}play'))
    {
        const voiceChannel = messaggio.member.voiceChannel;
        if (!voiceChannel) 
        {
            return messaggio.channel.send('Mi dispiace ma devi essere in un canale vocale per ascolare la musica!');
        }
        const permissions = voiceChannel.permissions(messaggio.client.user);
        if (!permissions.has('CONNECT'))
        {
            return messaggio.channel.send('Non riesco a connettermi alla chat vocale!');
        }
        if(!permissions.has('SPEAK'))
        {
            return messaggio.channel.send('Non riesco a parlare in questa chat vocale!');
        }

        try 
        {
            var connection = await voiceChannel.join();
        } catch (error) {
            console.error('Non riesco ad entrare nella chat vocale: ${error}');
            return messaggio.channel.send('Non riesco ad entrare nella chat vocale: ${error}');
        }

        const dispatcher = connection.playStream(ytdl(args[1]))
            .on('end', () => {
                console.log('Brano finito!');
                voiceChannel.leave();
            })
            .on('error', error => {
                console.error(error);
            });
        dispatcher.setVolumeLogarithmic(5 / 5);
    } else if (messaggio.content.startsWith('${prefix}stop')){
        if(!messaggio.member.voiceChannel) 
        {
            return messaggio.channel.send('Tu non sei in una chat vocale!');
        }
        messaggio.member.voiceChannel.leave();
        return undefined;
    }
});

client.login(token);