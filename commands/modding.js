const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modding')
        .setDescription('Links to the modding server'),
    async execute(interaction) {
        await interaction.reply({ content: 'https://discord.gg/megamixplus'});
    },
};
