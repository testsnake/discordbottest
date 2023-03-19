const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('download')
		.setDescription('Eden Project Download Link'),
	async execute(interaction) {
		await interaction.reply({ content: '**Eden Project Full Version**\nhttps://gamebanana.com/mods/405848\n\n**Lite Version**\nFor more details, use /lite\nhttps://gamebanana.com/mods/427167'});
	},
};
