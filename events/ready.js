const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('Eden Project');
		const loggingChannelId = '1008978799989362808';
		const loggingChannel = await client.channels.fetch(loggingChannelId);
		if (!loggingChannel) return;
		const embed = {
			color: parseInt('ff0000', 16),
			description: `おはよう！ MikuBot is Ready!`,
			timestamp: new Date()
		};
		loggingChannel.send({ embeds: [embed] });
	},
};
