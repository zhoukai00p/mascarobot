module.exports = {
	name: 'np',
	description: 'Comando per sapere il nome della canzone in corso.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Non c\'è nessun canzone in corso ora.');
		return message.channel.send(`Nome: **${serverQueue.songs[0].title}**`);
	}
};
