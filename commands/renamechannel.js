const { SlashCommandBuilder, Discord } = require('discord.js');

function getRandomRetrievalDelay() {
    const minMinutes = 3;
    const maxMinutes = 60;
    const range = maxMinutes - minMinutes;

    const randomValue = Math.random();
    const skewedValue = Math.pow(randomValue, 18);
    const delayMinutes = skewedValue * range + minMinutes;

    return delayMinutes * 60 * 1000;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('renamechannel')
        .setDescription('1 in 10 chance to rename a specific channel, otherwise send user to Brazil.')
        .addStringOption(option =>
            option
                .setName('newname')
                .setDescription('New channel name if successful.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const newChannelName = interaction.options.getString('newname');
        const guild = interaction.guild;
        const targetChannelId = '1009649075227984062';
        const brazilChannelId = '1084358094139699270';

        // Check if the command is being executed in the target channel
        if (interaction.channelId !== targetChannelId) {
            return await interaction.reply({
                content: `This command can only be executed in the target channel: <#${targetChannelId}>.`,
                ephemeral: true,
            });
        }

        const diceEmoji = '🎲';
        await interaction.reply({ content: `${diceEmoji} Rolling a random number.`, fetchReply: true });

        // Wait for 3 seconds before revealing the result
        await new Promise(resolve => setTimeout(resolve, 1000));
        await interaction.editReply({ content: `${diceEmoji} Rolling a random number..`, fetchReply: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        await interaction.editReply({ content: `${diceEmoji} Rolling a random number...`, fetchReply: true });
        await new Promise(resolve => setTimeout(resolve, 1000));


        // Generate a random number between 1 and 10
        const randomNumber = Math.floor(Math.random() * 9) + 1;

        try {
            // If randomNumber is 1, rename the channel
            if (randomNumber === 1) {
                const channel = await guild.channels.cache.get(targetChannelId);
                await channel.setName(newChannelName);
                await interaction.editReply(`The channel has been renamed to **${newChannelName}** by ${interaction.user.toString()}!`);
            } else {
                // Otherwise, send the user to Brazil
                const user = interaction.member;
                const isSpecialUser = user.roles.cache.has('1008903943511883786');
                const brazilRole = isSpecialUser ? '1091177439134228552' : '1084357826262085694';
                await user.roles.add(brazilRole);
                await user.roles.remove('1008898695355449394');
                if (isSpecialUser) {
                    await user.roles.remove('1008903943511883786');
                }
                await interaction.editReply(`${user.toString()} will be sent to Brazil!`);

                // Wait for a few seconds before actually sending the user to Brazil
                await new Promise(resolve => setTimeout(resolve, 3000));
                await interaction.editReply(`${user.toString()} has been sent to Brazil!`);

                // Send a message to the Brazil channel
                const brazilChannel = await guild.channels.cache.get(brazilChannelId);
                await brazilChannel.send(`🚨 ${user.toString()} has just been sent to Brazil! 😱`);

                // Retrieve the user from Brazil after a variable duration
                const retrievalDelay = getRandomRetrievalDelay();
                // const retrievalUnixTime = Math.floor(Date.now() / 1000) + Math.floor(retrievalDelay / 1000);
                // Update the message to show the estimated retrieval time
                await interaction.editReply(`${user.toString()} has been sent to Brazil!`);
                setTimeout(async () => {
                    await user.roles.remove(brazilRole);
                    await user.roles.add('1008898695355449394');
                    if (isSpecialUser) {
                        await user.roles.add('1008903943511883786');
                    }
                    await interaction.channel.send(`${user.toString()} has been retrieved from Brazil!`);

                    // Send a message to the Brazil channel
                    await brazilChannel.send(`🎉 ${user.toString()} has miraculously escaped Brazil! 🥳`);
                }, retrievalDelay);


            }
        } catch (error) {
            console.error(error);
            return await interaction.reply({
                content:
                    'There was an error processing your request. Please try again.',
                ephemeral: true,
            });
        }
    },
};

