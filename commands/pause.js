module.exports = {
	name: 'pause',
	description: 'Commnando per mettere in pausa le canzoni',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('In pausa!');
		}
		return message.channel.send('Non c\'è nessun canzone in corso ora per mettere in pausa.');
	}
};
