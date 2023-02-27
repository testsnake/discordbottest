const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clap')
		.setDescription('Adds 👏 Clap 👏 Emoji 👏 in 👏 between 👏 each 👏 word.'),
	async execute(interaction) {
		const text = interaction.options.getString('text');
		const clapText = str.replace(/ /g, ' 👏 ')
		await interaction.reply({ content: clapText, allowedMentions: { repliedUser: false  }});
	},
};
