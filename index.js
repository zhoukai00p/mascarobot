const Discord = require('discord.js');
/*const {
	prefix,
	token,
} = require('./config.json');*/
const ytdl = require('ytdl-core');
const token = process.env.token;
const prefix = process.env.prefix;

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Mascaro BOT online!');
   });
   client.once('reconnecting', () => {
    console.log('Riconnetto!');
   });
   client.once('disconnect', () => {
    console.log('Disconnetto!');
   });


client.on('message', message => {

    if ((message.content === 'ciao') || (message.content === 'Ciao') || (message.content === 'Ciao masca') || (message.content === 'Ciao Masca') || 
    (message.content === 'ciao masca') || (message.content === 'ciao Masca') || (message.content === 'Ciao Mascaro') || (message.content === 'ciao Mascaro') || 
    (message.content === 'ciao mascaro') || (message.content === 'Ciao mascaro'))
    {

       message.reply(' Ciao!');

    }

});

client.login(token).catch(err => console.log(err));