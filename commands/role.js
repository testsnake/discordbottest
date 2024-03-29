const { SlashCommandBuilder, discord } = require('discord.js');

const roles = {
    'Miku': '1103049491139002398',
    'Rin': '1103050052248809562',
    'Len': '1103050149011402782',
    'Luka': '1103050292414664796',
    'Meiko': '1103050438753910874',
    'Kaito': '1103050562913706125',
    'Teto': '1103050727233962168',
    'Gumi': '1103050911347130528',
    'HisoStreamNotfications': '1069068249964216410',
    'Pokeslow': '1129104083148623872',
    'Eden': '1129104204150087781',
    'HisoBodyGuard': '1128820873940455534',
    'HisoDickRider': '1025635769546723428',
    'ignoredByBot': '1091208299111776318',

};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Gives you a role')
        .addStringOption(option =>
            option.setName('role')
                .setDescription('The role you want to give yourself')
                .setRequired(true)
                .addChoices(
                    { name: 'Miku', value: roles.Miku },
                    { name: 'Rin', value: roles.Rin },
                    { name: 'Len', value: roles.Len },
                    { name: 'Luka', value: roles.Luka },
                    { name: 'Meiko', value: roles.Meiko },
                    { name: 'Kaito', value: roles.Kaito },
                    { name: 'Teto', value: roles.Teto },
                    { name: 'Gumi', value: roles.Gumi },
                    { name: 'Hiso Stream Notfications', value: roles.HisoStreamNotfications },
                    { name: 'PokeSlow', value: roles.Pokeslow },
                    { name: 'Eden', value: roles.Eden },
                    { name: 'Hiso BodyGuard', value: roles.HisoBodyGuard },
                    { name: 'Hiso DickRider', value: roles.HisoDickRider },
                    { name: 'ignored By Bot', value: roles.ignoredByBot },
                ),
        ),
    async execute(interaction) {
        try {
            const role = interaction.options.getString('role');
            const newRole = await interaction.guild.roles.cache.get(role);

            for (const roleID of Object.values(roles)) {
                if (interaction.member.roles.cache.has(roleID)) {
                    const oldRole = await interaction.guild.roles.cache.get(roleID);
                    await interaction.member.roles.remove(oldRole);
                }
            }

            await interaction.member.roles.add(newRole);
            await interaction.reply({
                content: `Added ${newRole.name} `,
                allowedMentions: {repliedUser: false},
                ephemeral: true
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'There was an error while executing this command! Please message testsnake with the following error: ' + error,
                ephemeral: true
            });
        }
    }
}
