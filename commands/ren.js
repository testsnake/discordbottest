const { SlashCommandBuilder, Discord } = require('discord.js');

let consecutiveFailedRolls = 0;

function getRandomRetrievalDelay() {
    const minMinutes = 3;
    const maxMinutes = 60;
    const range = maxMinutes - minMinutes;

    const randomValue = Math.random();
    const skewedValue = Math.pow(randomValue, 6);
    const delayMinutes = skewedValue * range + minMinutes;

    return delayMinutes * 60 * 1000;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ren')
        .setDescription('1 in 15 chance to rename a specific channel, otherwise send user to Brazil.')
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
        const randomNumber = Math.floor(Math.random() * 15) + 1;

        try {
            // If randomNumber is 1, rename the channel
            if (randomNumber === 1) {

                const previousStreak = consecutiveFailedRolls;
                consecutiveFailedRolls = 0;
                const channel = await guild.channels.cache.get(targetChannelId);
                await channel.setName(newChannelName);

                let streakMessage = '';
                if (previousStreak > 10 && previousStreak <= 15) {
                    streakMessage = `, breaking a ${previousStreak} roll streak!`;
                } else if (previousStreak > 15 && previousStreak <= 20) {
                    streakMessage = `, shattering a ${previousStreak} roll streak!`;
                } else if (previousStreak > 20 && previousStreak <= 38) {
                    streakMessage = `, obliterating a colossal ${previousStreak} roll streak!`;
                } else if (previousStreak === 39) {
                    streakMessage = `, breaking an exactly 39 roll streak! Wow!`;
                } else if (previousStreak >= 40) {
                    streakMessage = `, destroying a nut busting ${previousStreak} roll streak!`;
                }

                await interaction.editReply(`The channel has been renamed to **${newChannelName}** by ${interaction.user.toString()}! They rolled a ${randomNumber}${streakMessage}`);

            } else {
                consecutiveFailedRolls++;
                if (consecutiveFailedRolls === 11) {
                    await interaction.editReply(`${user.toString()} will be sent to Brazil! They rolled an ${randomNumber}${consecutiveFailedRolls > 8 ? `\n${consecutiveFailedRolls} failed rolls in a row!` : ''}`);
                } else {
                    await interaction.editReply(`${user.toString()} will be sent to Brazil! They rolled a ${randomNumber}${consecutiveFailedRolls > 8 ? `\n${consecutiveFailedRolls} failed rolls in a row!` : ''}`);
                }

                // Wait for a few seconds before actually sending the user to Brazil
                await new Promise(resolve => setTimeout(resolve, 3000));
                // Otherwise, send the user to Brazil
                const user = interaction.member;
                const isSpecialUser = user.roles.cache.has('1008903943511883786');
                const brazilRole = isSpecialUser ? '1091177439134228552' : '1084357826262085694';
                await user.roles.add(brazilRole);
                await user.roles.remove('1008898695355449394');
                if (isSpecialUser) {
                    await user.roles.remove('1008903943511883786');
                }


                if (consecutiveFailedRolls === 11) {
                    await interaction.editReply(`${user.toString()} has been sent to Brazil! They rolled an ${randomNumber}${consecutiveFailedRolls > 8 ? `\n${consecutiveFailedRolls} failed rolls in a row!` : ''}`);
                } else {
                    await interaction.editReply(`${user.toString()} has been sent to Brazil! They rolled a ${randomNumber}${consecutiveFailedRolls > 8 ? `\n${consecutiveFailedRolls} failed rolls in a row!` : ''}`);
                }



                // Retrieve the user from Brazil after a variable duration
                const retrievalDelay = getRandomRetrievalDelay();
                console.log(retrievalDelay);
                // const retrievalUnixTime = Math.floor(Date.now() / 1000) + Math.floor(retrievalDelay / 1000);
                // Update the message to show the estimated retrieval time
                // await interaction.editReply(`${user.toString()} has been sent to Brazil! They rolled a ${randomNumber}${consecutiveFailedRolls > 8 ? `\n${consecutiveFailedRolls} failed rolls in a row!` : ''}`);
                setTimeout(async () => {
                    await user.roles.remove(brazilRole);
                    await user.roles.add('1008898695355449394');
                    if (isSpecialUser) {
                        await user.roles.add('1008903943511883786');
                    }

                    // Array of possible messages
                    const messages = [
                        `${user.toString()} has been retrieved from Brazil after ${Math.floor(retrievalDelay / 1000 / 60)} minutes of incarceration!`,
                        `${user.toString()} has escaped Brazil after serving ${Math.floor(retrievalDelay / 1000 / 60)} minutes!`,
                        `${user.toString()} is finally free from Brazil after ${Math.floor(retrievalDelay / 1000 / 60)} minutes! Welcome back!`,
                        `After ${Math.floor(retrievalDelay / 1000 / 60)} minutes, ${user.toString()} has returned from their Brazilian adventure!`,
                        `${user.toString()} has completed their ${Math.floor(retrievalDelay / 1000 / 60)}-minute Brazilian "vacation" and is back!`,
                        `The great escape! ${user.toString()} has returned from Brazil after ${Math.floor(retrievalDelay / 1000 / 60)} minutes!`,
                        `${user.toString()} has been released from Brazil after ${Math.floor(retrievalDelay / 1000 / 60)} minutes of tropical punishment.`,
                        `A warm welcome back to ${user.toString()} after surviving ${Math.floor(retrievalDelay / 1000 / 60)} minutes in Brazil!`,
                        `${user.toString()} has emerged from Brazil after ${Math.floor(retrievalDelay / 1000 / 60)} minutes.`,
                        `After a ${Math.floor(retrievalDelay / 1000 / 60)}-minute sabbatical in Brazil, ${user.toString()} is finally back!`,
                        `${user.toString()} has triumphantly returned from their ${Math.floor(retrievalDelay / 1000 / 60)}-minute Brazilian expedition!`,
                        `After ${Math.floor(retrievalDelay / 1000 / 60)} minutes, Brazil has finally released ${user.toString()} back into the wild!`,
                        `The prodigal ${user.toString()} returns after ${Math.floor(retrievalDelay / 1000 / 60)} minutes in Brazil!`,
                        `${user.toString()} has safely returned from a ${Math.floor(retrievalDelay / 1000 / 60)}-minute Brazilian excursion!`,
                        `Welcome back, ${user.toString()}! Brazil couldn't hold you for more than ${Math.floor(retrievalDelay / 1000 / 60)} minutes!`,
                        `${user.toString()} has broken free from Brazil's grasp after ${Math.floor(retrievalDelay / 1000 / 60)} minutes!`,
                        `A triumphant return! ${user.toString()} is back after ${Math.floor(retrievalDelay / 1000 / 60)} minutes in Brazil!`,
                        `After ${Math.floor(retrievalDelay / 1000 / 60)} minutes, ${user.toString()} has left Brazil and rejoined us!`,
                        `Back from Brazil! ${user.toString()} has served their ${Math.floor(retrievalDelay / 1000 / 60)}-minute sentence!`,
                        `Rejoice! ${user.toString()} has made it back from their ${Math.floor(retrievalDelay / 1000 / 60)}-minute Brazilian journey!`,
                        `Bem-vindo novamente, ${user.toString()}! Depois de passar ${Math.floor(retrievalDelay / 1000 / 60)} minutos no Brasil, você está de volta conosco!`,
                        `Heureux de te revoir, ${user.toString()} ! Après ${Math.floor(retrievalDelay / 1000 / 60)} minutes passées au Brésil, te voilà enfin de retour parmi nous !`,
                        `¡${user.toString()}, te damos la bienvenida de nuevo! Tras pasar ${Math.floor(retrievalDelay / 1000 / 60)} minutos en Brasil, ¡ya estás de vuelta con nosotros!`,
                        `おかえり、${user.toString()}さん！ブラジルで${Math.floor(retrievalDelay / 1000 / 60)}分間過ごした後、無事に戻ってきましたね！`,
                        `OMG ${user.toString().toUpperCase()}! WELCOME BACK UWU! AFTER ${Math.floor(retrievalDelay / 1000 / 60)} MINUTES IN BRAZIL, YOU'VE RETURNED! HAZ CHEEZBURGER TO CELEBRATE! XD`,
                    ];


                    // Choose a random message
                    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

                    // Send the chosen message
                    await interaction.channel.send(randomMessage);

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

