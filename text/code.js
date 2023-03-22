const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('discord.js');
const { Capstone, ARCH_X86, MODE_64 } = require('@alexaltea/capstone-js');



const binaryFiles = ['1.00', '1.01', '1.02', '1.03'];
const fileExtension = '.exe';
const binaryFilesPath = path.join(__dirname, '..',  'binary_files');
const allowedRole = '1008903943511883786';

module.exports = {
    data: new SlashCommandBuilder()
    .setName('code')
    .setDescription('Display assembly code around a given address in MegaMix+.')
    .addStringOption(option => 
        option.setName('address')
        .setDescription('Memory address in the selected MegaMix+.')
        .setRequired(true)
        )
    .addStringOption(option => 
        option.setName('version')
        .setDescription('Select MegaMix+ version.')
        .setRequired(false)
        )
    .addBooleanOption(option =>
        option.setName('binary')
        .setDescription('Display as binary.')
        .setRequired(false)
        ),
    async execute(interaction) {



        const memberRoles = interaction.member.roles.cache.map(r => r.id);
        if (!memberRoles.includes(allowedRole)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }
        
        const version = interaction.options.getString('version') || binaryFiles[binaryFiles.length - 1];
        const address = interaction.options.getString('address');
        const isBinary = interaction.options.getBoolean('binary') || false;

        // Check if the specified version is valid
        if (!binaryFiles.includes(version)) {
            return interaction.reply({ content: 'Invalid MegaMix+ version.', ephemeral: true });
        }

        const filePath = path.join(path.join(binaryFilesPath, `${version}${fileExtension}`));

        // Check if the specified file exists
        if (!fs.existsSync(filePath)) {
            return interaction.reply({ content: `File ${filePath} does not exist.`, ephemeral: true });
        }

        const fileContents = fs.readFileSync(filePath);
        const addressValue = parseInt(address, 16);

        // Check if the specified address is valid
        if (isNaN(addressValue) || addressValue < 0 || addressValue > fileContents.length) {
            return interaction.reply({ content: 'Invalid address.', ephemeral: true });
        }

        const startIndex = Math.max(0, addressValue - 79);
        const endIndex = Math.min(fileContents.length, addressValue + 80);

        const selectedBytes = Buffer.alloc(160, ' ');
        const bytesToCopy = Math.min(endIndex - startIndex, 160);
        fileContents.copy(selectedBytes, Math.max(0, 79 - addressValue), startIndex, startIndex + bytesToCopy);


        if (!isBinary) {

            let capstone =  new Capstone(ARCH_X86, MODE_64)
            const assembly = capstone.disasm(selectedBytes, endIndex - startIndex).map(instr => `${instr.mnemonic} ${instr.op_str}`).join('\n');
            console.log(assembly);


            return interaction.reply({ content: '```' + assembly + '```' });

        } else {
            const selectedBytesHex = selectedBytes.toString('hex');

            const matrix = selectedBytesHex.match(/.{2}/g).reduce((result, byte, index) => {
                if (index % 16 === 0) {
                    result.push([]);
                }
                result[result.length - 1].push(byte);
                return result;
            }, []);

            const lines = matrix.map((row, rowIndex) => {
                const byteAddress = `0x${(startIndex + rowIndex * 16).toString(16).toUpperCase().padStart(8, '0')}`;
                const byteValues = row.map(byte => byte.toUpperCase()).join(' ');
                const byteUtf = row.map(byte => String.fromCharCode(parseInt(byte, 16))).join('');

                return `${byteAddress}: ${byteValues}   ${byteUtf}`;
            });

            return interaction.reply({ content: '```\n' + lines.join('\n') + '```' });
        }
    },

};

