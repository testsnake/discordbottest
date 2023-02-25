const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');
const { errMsg } = require('./index');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('restart')
    .setDescription('Restarts MikuBot'),
  async execute(interaction) {
    if (interaction.member.permissions.has('ADMINISTRATOR')) {
      exec('sudo reboot', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          errMsg(interaction.channel + `\nFailed to restart the MikuBot. Please try again later.`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
      await interaction.reply('Restarting the MikuBot...');
    } else {
      await interaction.reply({
        content: 'You do not have permission to use this command.',
        ephemeral: true
      });
    }
  },
};
