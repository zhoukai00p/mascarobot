module.exports = {
	name: 'resume',
	description: 'Comando per far ripartire la musica.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('Fatto ripartire la musica per te!');
		}
		return message.channel.send('Non c\'è nessun canzone in corso ora da far ripartire.');
	}
};
