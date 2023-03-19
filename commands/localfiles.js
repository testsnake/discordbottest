const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('localfiles')
		.setDescription('Instructions on how to access the games local files'),
	async execute(interaction) {
		await interaction.reply({ content: 'https://cdn.discordapp.com/attachments/1008978799989362808/1086743597023510539/image.png'});
	},
};
