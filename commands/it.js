const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const mikuBotVer = fs.readFileSync('./versionID.txt', 'utf8');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('it')
		.setDescription('Asks for basic Diagnostic Info')
		.addUserOption(option => option.setName('user').setDescription('Optional user to ping')),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		if (user && user.id !== interaction.user.id && !user.bot && !user.system) {
			const helpEmbed = new EmbedBuilder()
				.setColor(0x86cecb)
				.setAuthor({ name: 'Send screenshots of', iconURL: 'https://images.gamebanana.com/img/ico/games/6296031c71087.png'})
				.setDescription(`- your mods folder\n- Eden project folder in the mods folder\n- config.toml in the Eden project folder\n- right click on the Eden project folder, select properties, and screenshot that\n\n${user}, please provide the requested information.`)
				.setFooter({ text: `${mikuBotVer}`});
			await interaction.reply({ embeds: [helpEmbed] });
		} else {
			const helpEmbed = new EmbedBuilder()
				.setColor(0x86cecb)
				.setAuthor({ name: 'Send screenshots of', iconURL: 'https://images.gamebanana.com/img/ico/games/6296031c71087.png'})
				.setDescription('- your mods folder\n- Eden project folder in the mods folder\n- config.toml in the Eden project folder\n- right click on the Eden project folder, select properties, and screenshot that')
				.setFooter({ text: `${mikuBotVer}`});
			await interaction.reply({ embeds: [helpEmbed] });
		}
	},
};
