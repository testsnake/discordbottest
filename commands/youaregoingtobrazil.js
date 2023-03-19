const { SlashCommandBuilder, Discord } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('youaregoingtobrazil')
      .setDescription('Sends a user to Brazil and gives them the Brazil role.')
      .addUserOption(option => option.setName('user').setDescription('The user you want to send to Brazil.')),
  async execute(interaction) {
    const userBlock = interaction.options.getUser('user');
    let user = userBlock ? await interaction.guild.members.fetch(userBlock.id) : interaction.member;
    const guild = interaction.guild;

    // Check if the command user is the same as the user being sent to Brazil.
    const isSelf = interaction.user.id === user.id;

    // Check if the command user has the required role or is sending themselves to Brazil.
    if (!isSelf && !interaction.member.roles.cache.has('1008903943511883786')) {
      return await interaction.reply({ content: 'You do not have permission to use this command.\nOnly Eden Project team members can send users to brazil.', ephemeral: true });
    }

    try {
      // Check if the user already has the Brazil role.
      if (user.roles.cache.has('1084357826262085694')) {
        await user.roles.remove('1084357826262085694'); // Remove the Brazil role.
        await user.roles.add('1008898695355449394'); // Add the member role.
        return await interaction.reply(`${user} has been retrieved from Brazil!`);
      }

      // Add the Brazil role and remove the member role.
      await user.roles.add('1084357826262085694');
      await user.roles.remove('1008898695355449394');
      return await interaction.reply(`${user} has been sent to Brazil!`);
    } catch (error) {
      console.error(error);
      return await interaction.reply({ content: 'There was an error sending the user to Brazil. Please try again.', ephemeral: true });
    }
  },
};

