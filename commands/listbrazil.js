const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listbrazil')
        .setDescription('Lists all users who are currently stuck in Brazil.'),

    async execute(interaction) {
        const guild = interaction.guild;
        const brazilRoleId = '1084357826262085694';
        const brazilRole = await guild.roles.fetch(brazilRoleId);
        const membersWithRole = brazilRole.members.map(member => member.user.toString()).join(', ');

        const replyContent = membersWithRole
            ? `Users stuck in Brazil: ${membersWithRole}`
            : 'No users are currently stuck in Brazil.';

        await interaction.reply({ content: replyContent});
    },
};
