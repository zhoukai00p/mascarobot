module.exports = {
	name: 'stop',
	description: 'Comando per fermare le canzoni.',
	cooldown: 5,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Mi dispiace ma devi essere in una chat vocale per utilizzare sto comando!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Non c\'è nessun canzone in corso ora per fermarlo.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Hai usato il comando per fermare le canzoni!');
	}
};
