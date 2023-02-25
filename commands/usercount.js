const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('usercount')
		.setDescription('Number of users in server'),
	async execute(interaction) {
		const guild = message.guild;
  		const memberCount = guild.memberCount;
		const helpEmbed = new EmbedBuilder()
			.setColor(0x86cecb)
			.setAuthor({ name: 'Member Count', iconURL: 'https://images.gamebanana.com/img/ico/games/6296031c71087.png'})
			.setDescription(`The guild has ${memberCount} members.`);
		await interaction.reply({ embeds: [helpEmbed] });
	},
};