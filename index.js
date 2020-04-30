require('dotenv').config();
const { readdirSync } = require('fs');
const { join } = require('path');
const MusicClient = require('./struct/Client');
const { Collection } = require('discord.js');
const client = new MusicClient({ token: process.env.token, prefix: process.env.prefix });

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', `${file}`));
	client.commands.set(command.name, command);
}

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

    if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;
	const args = message.content.slice(client.config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	if (command.guildOnly && message.channel.type !== 'text') return message.reply('I can\'t execute that command inside DMs!');
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		if (command.usage) reply += `\nThe proper usage would be: \`${client.config.prefix}${command.name} ${command.usage}\``;
		return message.channel.send(reply);
	}
	if (!client.cooldowns.has(command.name)) {
		client.cooldowns.set(command.name, new Collection());
	}
	const now = Date.now();
	const timestamps = client.cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

    /*if(message.author.bot) 
    {
        return undefined;
    }

    if (!message.content.startsWith(prefix))
    {
        console.log('sono entrato su prefix!');
        return undefined;
    }

    const args = message.content.split(' ');

    if (message.content.startsWith(prefix+'play'))
    {
        console.log('sono entrato su play!');
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) 
        {
            return message.channel.send('Mi dispiace ma devi essere in un canale vocale per ascolare la musica!');
        }
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT'))
        {
            return message.channel.send('Non riesco a connettermi alla chat vocale!');
        }
        if(!permissions.has('SPEAK'))
        {
            return message.channel.send('Non riesco a parlare in questa chat vocale!');
        }

        try 
        {
            var connection = await voiceChannel.join();
        } catch (error) {
            console.error('Non riesco ad entrare nella chat vocale: ${error}');
            return message.channel.send('Non riesco ad entrare nella chat vocale: ${error}');
        }

        const dispatcher = connection.playStream(ytdl(args[1]))
            .on('end', () => {
                console.log('Brano finito!');
                voiceChannel.leave();
            })
            .on('error', error => {
                console.error(error);
            });
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    } else if (message.content.startsWith(prefix+'stop')){
        if(!message.member.voice.channel) 
        {
            return message.channel.send('Tu non sei in una chat vocale!');
        }
        message.member.voice.channel.leave();
        return undefined;
    } else{
        console.log('errore!');
        console.log(prefix);
    }

    if (message.content.startsWith(`${prefix}play`)) {
        execute(message, serverQueue);
        return;
      } else if (message.content.startsWith(`${prefix}skip`)) {
        skip(message, serverQueue);
        return;
      } else if (message.content.startsWith(`${prefix}stop`)) {
        stop(message, serverQueue);
        return;
      } else {
        message.channel.send("You need to enter a valid command!");
    }*/



});

client.login(client.config.token);