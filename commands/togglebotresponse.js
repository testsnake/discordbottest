const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('togglebotresponse')
    .setDescription('Toggle the role that controls whether the bot responds to random messages.'),

  async execute(interaction) {
    const guild = interaction.guild;
    const user = interaction.member;
    const roleId = '1091208299111776318';
    const hasRole = user.roles.cache.has(roleId);

    if (hasRole) {
      await user.roles.remove(roleId);
      await interaction.reply({
        content: 'The role has been removed, and the bot will now respond to your messages.',
        ephemeral: true,
      });
    } else {
      await user.roles.add(roleId);
      await interaction.reply({
        content: 'The role has been added, and the bot will no longer respond to your messages.',
        ephemeral: true,
      });
    }
  },
};
