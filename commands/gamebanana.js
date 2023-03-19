const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('gamebanana')
    .setDescription('Searches for a mod in the MegaMix+ section of Gamebanana')
    .addStringOption(option =>
        option.setName('query')
        .setDescription('The mod name or submission ID to search for')
        .setRequired(true)),
    async execute(interaction) {
        const query = interaction.options.getString('query');
        // const apiPassword = fs.readFileSync('api_password.txt', 'utf8').trim();
        // const appID = fs.readFileSync('app_id.txt', 'utf8').trim();
        // const userID = fs.readFileSync('user_id.txt', 'utf8').trim();
        //
        // const authenticateRes = await fetch(`https://api.gamebanana.com/Core/App/Authenticate?api_password=${apiPassword}&app_id=${appID}&userid=${userID}`)
        // .then(res => res.json());
        //
        // console.log(`Logged into the GameBanana API as ${authenticateRes[0]}`)
        // // if (!authenticateRes.success) {
        //
        // //     return interaction.reply({ content: 'Failed to authenticate with Gamebanana API.', ephemeral: true });
        //
        // // }
        // const aat = await fetch(`https://api.gamebanana.com/Core/List/Section/AllowedFilters?itemtype=Mod `, {
        //     headers: {
        //         Authorization: `Token ${authenticateRes[0]}`,
        //     },
        // }).then(res => res.json());
        // console.log("test")
        // console.log(aat);

        const searchRes = await fetch(`https://gamebanana.com/apiv8/Util/Game/Submissions?_idGameRow=16522&_nPage=1&_sName=${query}`, {
            headers: {
                Authorization: /*`Token ${authenticateRes[0]}`*/`none`,
            },
        }).then(res => res.json());

        //console.log(searchRes);
        // if (!searchRes.success) {
        //     return interaction.reply('Failed to search for mods on Gamebanana');
        // }


        const results = searchRes.slice(0, 9);

        var embeds = [];

        results.forEach(mod => {
            if (!mod._bIsNsfw) {
                embeds.push(new EmbedBuilder()
                    .setColor(0x86cecb)
                    .setAuthor({name: "GameBanana Search", iconURL: `${mod._aRootCategory._sIconUrl}`})
                    .setTitle(`${mod._sName}`)
                    .setURL(`https://gamebanana.com/mods/${mod._idRow}`)
                    .setThumbnail(`${mod._aPreviewMedia._aImages[0]._sBaseUrl}/${mod._aPreviewMedia._aImages[0]._sFile}`)
                    .setTimestamp(new Date(mod._tsDateAdded * 1000))
                    .setFields(
                        {name: 'Submitter', value: `${mod._aSubmitter._sName}`, inline: true},
                        {name: 'Likes', value: `${mod._nLikeCount !== undefined ? mod._nLikeCount : 0}`, inline: true},
                        {name: 'Views', value: `${mod._nViewCount !== undefined ? mod._nViewCount : 0}`, inline: true},
                    )
                )
            } else {
                embeds.push(new EmbedBuilder()
                    .setColor(0xcc9f9d)
                    .setAuthor({name: "GameBanana Search", iconURL: `${mod._aRootCategory._sIconUrl}`})
                    .setTitle(`${mod._sName}`)
                    .setURL(`https://gamebanana.com/mods/${mod._idRow}`)
                    .setTimestamp(new Date(mod._tsDateAdded * 1000))
                    .setDescription("This mod is marked as NSFW.\nPlease use caution when viewing it.")
                    .setFields(
                        {name: 'Submitter', value: `${mod._aSubmitter._sName}`, inline: true},
                        {name: 'Likes', value: `${mod._nLikeCount !== undefined ? mod._nLikeCount : 0}`, inline: true},
                        {name: 'Views', value: `${mod._nViewCount !== undefined ? mod._nViewCount : 0}`, inline: true},
                    )
                )
            }
        });

        if (embeds.length === 0) {
            embeds.push(new EmbedBuilder()
                .setColor(0x86cecb)
                .setAuthor({name: "GameBanana Search", iconURL: "https://images.gamebanana.com/static/img/mascots/detective.png"})
                .setTitle("No results found.")
            )
        }
        await interaction.reply({ embeds: embeds });

        // if (results.length === 0) {
        //     resultEmbed.setDescription('No results found.');
        // } else {
        //     for (let i = 0; i < results.length; i++) {
        //         const modRes = await fetch(`https://api.gamebanana.com/Core/Item/Data/?itemtype=Mod&itemid=${results[i]}&fields=creator,date,description,downloads,likes,name,studioid`, {
        //             headers: {
        //                 Authorization: `Token ${authenticateRes[0]}`,
        //             },
        //         }).then(res => res.json());
        //
        //         // if (!modRes.success) {
        //         //     return interaction.reply(`Failed to get data for mod with ID ${results[i]}`);
        //         // }
        //
        //         console.log(modRes)
        //
        //
        //     }
        // }

        //interaction.reply(`command not finished, check console for more details`);


    },
};
