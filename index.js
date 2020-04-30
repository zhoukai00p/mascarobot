const Discord = require('discord.js');
/*const {
	prefix,
	token,
} = require('./config.json');*/
const ytdl = require('ytdl-core');
const token = process.env.token;
const prefix = process.env.prefix;

const client = new Discord.Client({ disableEveryone: true });

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
    var messaggio = message.content.toLocaleLowerCase();
    if ((messaggio === 'ciao masca') || (messaggio === 'ciao mascaro') || (messaggio === 'ciao mascarobot') || (messaggio === 'ciao mascaro bot'))
    {

       message.reply(' Ciao!');

    }

});

client.login(token).catch(err => console.log(err));