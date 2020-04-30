module.exports = {
	name: 'volume',
	description: 'Comando per impostare il volume oppure per visualizzarlo.',
	cooldown: 5,
	execute(message, args) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Devi essere in chat vocale per impostare il volume!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Non c\'è nessun canzone in corso ora per regolare il volume.');
		if (!args[0]) return message.channel.send(`Il volume attuale è: **${serverQueue.volume}**`);
		serverQueue.volume = args[0]; // eslint-disable-line
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		return message.channel.send(`Hai settato il volume a: **${args[0]}**`);
	}
};
