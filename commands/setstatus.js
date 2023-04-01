const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setstatus')
        .setDescription('Sets the bot\'s status')
        .addStringOption(option =>
            option.setName('status')
                .setDescription('The new status for the bot')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Type of the status (PLAYING, WATCHING, LISTENING, STREAMING, COMPETING)')
                .setRequired(true)
                .addChoice('Playing', 'PLAYING')
                .addChoice('Watching', 'WATCHING')
                .addChoice('Listening', 'LISTENING')
                .addChoice('Streaming', 'STREAMING')
                .addChoice('Competing', 'COMPETING')),
    async execute(interaction) {
        // Check if the user has the Administrator permission
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return await interaction.reply({ content: 'You do not have the required permissions to use this command.', ephemeral: true });
        }

        const status = interaction.options.getString('status');
        const type = interaction.options.getString('type');
        await interaction.client.user.setActivity(status, { type: type });
        await interaction.reply({ content: `Status updated to: ${type[0].toUpperCase() + type.slice(1).toLowerCase()} ${status}`, ephemeral: true });
    },
};
