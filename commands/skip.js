module.exports = {
	name: 'skip',
	description: 'Comando per saltare le canzoni.',
	cooldown: 5,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Mi dispiace ma devi essere in una chat vocale per utilizzare sto comando!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Non c\'è nessun canzone in corso ora da saltare.');
		serverQueue.connection.dispatcher.end('Hai usato il comando per saltare la canzone!');
	}
};
