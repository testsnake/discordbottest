const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const fs = require('fs');
const mikuBotVer = fs.readFileSync('./versionID.txt', 'utf8');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('edenpatch')
		.setDescription('Info on songlimit patch, song id patch, ect'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor(0x86cecb)
			.setAuthor({ name: 'Eden Patch', iconURL: 'https://images.gamebanana.com/img/ico/games/6296031c71087.png'})
			.setDescription(`The Eden \_\_\_\_\_\_\_ Patch series of mods are public releases of mods that are included within Eden Project and as a result can cause some unintended side effects when enabled with Eden Project, as the mods are effectively running twice.`)
			.setFooter({ text: `${mikuBotVer}`});
		await interaction.reply({ embeds: [embed] });
	},
};
