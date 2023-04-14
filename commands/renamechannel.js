const { SlashCommandBuilder, Discord } = require('discord.js');

let consecutiveFailedRolls = 0;

function getRandomRetrievalDelay() {
    const minMinutes = 3;
    const maxMinutes = 60;
    const range = maxMinutes - minMinutes;

    const randomValue = Math.random();
    const skewedValue = Math.pow(randomValue, 3);
    const delayMinutes = skewedValue * range + minMinutes;

    return delayMinutes * 60 * 1000;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('renamechannel')
        .setDescription('1 in 50 chance to rename a specific channel, otherwise send user to Brazil.')
        .addStringOption(option =>
            option
                .setName('newname')
                .setDescription('New channel name if successful.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const loadingRole = '1096502071655669800';
        await interaction.member.roles.add(loadingRole);
        await interaction.channel.sendTyping();
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

        if (interaction.member.roles.cache.has(loadingRole)) {
            return await interaction.reply({ content: 'You are already rolling', ephemeral: true });
        }
        const diceEmoji = '🎲';
        await interaction.reply({ content: `${diceEmoji} Rolling a random number.`, fetchReply: true });
        await interaction.channel.sendTyping();

        // Wait for 3 seconds before revealing the result
        await new Promise(resolve => setTimeout(resolve, 1000));
        await interaction.editReply({ content: `${diceEmoji} Rolling a random number..`, fetchReply: true });
        await interaction.channel.sendTyping();

        await new Promise(resolve => setTimeout(resolve, 1000));
        await interaction.editReply({ content: `${diceEmoji} Rolling a random number...`, fetchReply: true });

        await interaction.channel.sendTyping();
        await new Promise(resolve => setTimeout(resolve, 1000));


        // Generate a random number between 1 and 10
        let randomNumber = Math.floor(Math.random() * 50) + 1;

        try {
            // If randomNumber is 1, rename the channel
            if (randomNumber === 39 && /troubleshooting/i.test(newChannelName)) {
                randomNumber++;
            }
            if (randomNumber === 39) {


                const previousStreak = consecutiveFailedRolls;
                consecutiveFailedRolls = 0;
                const channel = await guild.channels.cache.get(targetChannelId);
                await channel.setName(newChannelName);

                let streakMessage = '';
                if (previousStreak > 10 && previousStreak <= 20) {
                    streakMessage = `, breaking a ${previousStreak} roll streak!`;
                } else if (previousStreak > 21 && previousStreak <= 31) {
                    streakMessage = `, shattering a ${previousStreak} roll streak!`;
                } else if (previousStreak === 39) {
                    streakMessage = `, breaking an exactly 39 roll streak! Wow! Miku Would be Proud!`;
                } else if (previousStreak > 31 && previousStreak <= 40) {
                    streakMessage = `, obliterating a colossal ${previousStreak} roll streak!`;
                } else if (previousStreak >= 41 && previousStreak <= 50) {
                    streakMessage = `, destroying a nut busting ${previousStreak} roll streak!`;
                } else if (previousStreak > 50 && previousStreak <= 60) {
                    streakMessage = `, tearing apart a fantastic ${previousStreak} roll streak!`;
                } else if (previousStreak > 60 && previousStreak < 69) {
                    streakMessage = `, dismantling a magnificent ${previousStreak} roll streak!`;
                } else if (previousStreak === 69) {
                    streakMessage = `, ending a ***nice*** ${previousStreak} roll streak!`;
                } else if (previousStreak > 69 && previousStreak <= 80) {
                    streakMessage = `, crushing a glorious ${previousStreak} roll streak!`;
                } else if (previousStreak > 80 && previousStreak <= 90) {
                    streakMessage = `, decimating a superb ${previousStreak} roll streak!`;
                } else if (previousStreak > 90 && previousStreak <= 100) {
                    streakMessage = `, annihilating an outstanding ${previousStreak} roll streak!`;
                } else if (previousStreak > 100 && previousStreak <= 200) {
                    streakMessage = `, ending an unbelievable ${previousStreak} roll streak!`;
                } else if (previousStreak > 200 && previousStreak < 420) {
                    streakMessage = `, snapping a monumental ${previousStreak} roll streak!`;
                } else if (previousStreak === 420) {
                    streakMessage = `, blazing away a dank ${previousStreak} roll streak!`;
                } else if (previousStreak > 420 && previousStreak <= 500) {
                    streakMessage = `, terminating a legendary ${previousStreak} roll streak!`;
                } else if (previousStreak > 500) {
                    streakMessage = `, bringing down an epic ${previousStreak} roll streak!`;
                }


            await interaction.editReply(`The channel has been renamed to **${newChannelName}** by ${interaction.user.toString()}! They rolled a ${randomNumber}${streakMessage}`);

            } else {
                consecutiveFailedRolls++;

                // Otherwise, send the user to Brazil
                const user = interaction.member;
                const isSpecialUser = user.roles.cache.has('1008903943511883786');
                const brazilRole = isSpecialUser ? '1091177439134228552' : '1084357826262085694';
                await interaction.editReply(`${user.toString()} will be sent to Brazil! They rolled a(n) ${randomNumber}${consecutiveFailedRolls > 8 ? `\n${consecutiveFailedRolls} failed rolls in a row!` : ''}`);


                // Wait for a few seconds before actually sending the user to Brazil
                await new Promise(resolve => setTimeout(resolve, 3000));
                await user.roles.add(brazilRole);
                await user.roles.remove('1008898695355449394');
                if (isSpecialUser) {
                    await user.roles.remove('1008903943511883786');
                }


                await interaction.editReply(`${user.toString()} has been sent to Brazil! They rolled a(n) ${randomNumber}${consecutiveFailedRolls > 8 ? `\n${consecutiveFailedRolls} failed rolls in a row!` : ''}`);

                //remove loading role
                await user.roles.remove(loadingRole);



                // Retrieve the user from Brazil after a variable duration
                const retrievalDelay = getRandomRetrievalDelay();
                console.log(retrievalDelay);
                // const retrievalUnixTime = Math.floor(Date.now() / 1000) + Math.floor(retrievalDelay / 1000);
                // Update the message to show the estimated retrieval time
                // await interaction.editReply(`${user.toString()} has been sent to Brazil! They rolled a ${randomNumber}${consecutiveFailedRolls > 8 ? `\n${consecutiveFailedRolls} failed rolls in a row!` : ''}`);
                setTimeout(async () => {
                    await interaction.channel.sendTyping();
                    await new Promise(resolve => setTimeout(resolve, 3000));
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
                        `OMG ${user.toString()}! WELCOME BACK UWU! AFTER ${Math.floor(retrievalDelay / 1000 / 60)} MINUTES IN BRAZIL, YOU'VE RETURNED! HAZ CHEEZBURGER TO CELEBRATE! XD`,
                        `Welkom terug, ${user.toString()}! Na ${Math.floor(retrievalDelay / 1000 / 60)} minuten in Brazilië te zijn geweest, ben je eindelijk terug! We hopen dat je je beter hebt vermaakt dan de Nederlanders die tegen de oceaan vechten!`,
                        `${user.toString()}，欢迎回来！在巴西度过了${Math.floor(retrievalDelay / 1000 / 60)}分钟后，你终于回来了！感谢伟大的毛主席和光辉无比的中国共产党，他们的强大力量穿越了大洋，让你成功回归！赞美无尽！🇨🇳🇨🇳🇨🇳🇨🇳🇨🇳`,
                        `${user.toString()}, you've escaped the clutches of Brazil after ${Math.floor(retrievalDelay / 1000 / 60)} minutes! Welcome back, adventurer!`,
                        `${user.toString()}, after ${Math.floor(retrievalDelay / 1000 / 60)} minutes in Brazil, you've made it back! We missed you like a cat misses catnip!`,
                        `${user.toString()}, your ${Math.floor(retrievalDelay / 1000 / 60)} minutes in Brazil have come to an end! It's a bird, it's a plane, no—it's your triumphant return!`,
                        `${user.toString()}, the Brazilian sun has set on your ${Math.floor(retrievalDelay / 1000 / 60)} minutes of exile. Let's give a warm welcome to our prodigal member!`,
                        `Hear ye, hear ye! ${user.toString()} has completed their ${Math.floor(retrievalDelay / 1000 / 60)} minute journey through the wilds of Brazil! Welcome back, brave traveler!`,
                        `${user.toString()} is back after ${Math.floor(retrievalDelay / 1000 / 60)} minutes in Brazil, and I'm as mad as when I found pickles on my McDouble when I asked for no pickles! 😡`,
                        `Just like Hatsune Miku singing her way into our hearts, ${user.toString()} has returned after ${Math.floor(retrievalDelay / 1000 / 60)} minutes in Brazil! Welcome back!`,
                        `Vocaloid superstar Hatsune Miku welcomes ${user.toString()} back to the stage after ${Math.floor(retrievalDelay / 1000 / 60)} minutes in Brazil! 🎤`,
                        `${user.toString()}, after ${Math.floor(retrievalDelay / 1000 / 60)} minutes in Brazil, your encore has arrived, and Hatsune Miku is ready to celebrate your return! 🌟`,
                        `${user.toString()}, you've escaped Brazil after ${Math.floor(retrievalDelay / 1000 / 60)} minutes?! This is an outrage!`,
                        `${user.toString()}, you've survived ${Math.floor(retrievalDelay / 1000 / 60)} minutes in Brazil?!`,
                        `After ${Math.floor(retrievalDelay / 1000 / 60)} minutes, ${user.toString()} has returned from Brazil, against all odds!`,
                        `${user.toString()}, we can't believe you made it through ${Math.floor(retrievalDelay / 1000 / 60)} minutes in Brazil and lived to tell the tale! Welcome back, survivor!`,
                        `In an astonishing turn of events, ${user.toString()} has survived ${Math.floor(retrievalDelay / 1000 / 60)} minutes in Brazil! Welcome back, you brave soul!`,
                        `${user.toString()}, your incredible escape from ${Math.floor(retrievalDelay / 1000 / 60)} minutes in Brazil has left us all in awe! Welcome back, champion! 🥳`,
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

