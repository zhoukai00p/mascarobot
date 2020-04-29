const Discord = require('discord.js');
const {
	prefix,
	token,
} = require('./config.json');
const ytdl = require('ytdl-core');

const client = new Discord.Client();
client.login(process.env.token);

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

    if (message.content === 'ciao') {

       message.reply('Ciao!');

       }

});