module.exports = {
	name: 'queue',
	description: 'Commando per sapere i nomi delle canzoni in coda',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Non c\'è nessun canzone in corso ora.');
		return message.channel.send(`
__**Coda:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Canzone attuale:** ${serverQueue.songs[0].title}
		`);
	}
};
