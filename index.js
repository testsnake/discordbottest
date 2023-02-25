const fs = require('fs');
const path = require('path');
const { Client, Collection, Events, GatewayIntentBits, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ 
	intents: [GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		],
	});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	console.log(command);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	console.log(event);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


//shorthand regex test
function rxt(message, regExPattern) {
	return regExPattern.test(message.content);
}

// No Ping Reply
function nPR(message, text) {
	message.reply({content: text, allowedMentions: { repliedUser: false }})
		.catch(console.error);
}





// Event Triggers

client.on('messageCreate', (message) => {
	if(message.author.bot) return;
	console.log("Received a message: " + message.content);

	const regexPatternBG = /brogamer/i;
	const channelIdEmergancy = '1078537226226503750';
  	// Check if the message is in #emergency-meeting
  	if (message.channel.id === channelIdEmergancy) {
  		if (regexPatternBG.test(message.content)) {
  		

            message.reply(`Go to <#1033012124311617577> pls.`)
            	.then(msg => {
            		setTimeout(() => msg.delete(), 5000)
            	})
            	.catch(console.error);
	  	}
	}

	
	if (rxt(message, /ass/i)) {
		// Ass
		nPR(message, 'https://cdn.discordapp.com/attachments/421865513820618752/1071615776127201424/169F55F1-C038-41DD-9264-BD3D9E8C6D60.gif');
	} else if (rxt(message, /brazil/i)) {
		nPR(message, `<@276054611972849664> https://cdn.discordapp.com/attachments/1033012124311617577/1071113408281317416/image.png`);
	} else if (rxt(message, /communism/i)) {
		nPR(message, `https://images-ext-2.discordapp.net/external/qa4Sl-sOX5SfKTB_N5_RQIXeOFJYL14ZkIshPJqcEsY/https/media.tenor.com/YVq45h9PxJ4AAAPo/cat.mp4`);
	} else if (rxt(message, /sexe/i) || rxt(message, /sperme/i)) {
		nPR(message, ` https://cdn.discordapp.com/attachments/1008978799989362808/1075640066912833536/ezgif.com-add-text.gif`);
	} else if (rxt(message, /cum/i) || rxt(message, /sex/i)) {
		nPR(message, `https://tenor.com/view/my-true-reaction-cat-funny-gif-26404518`);
	} else if (rxt(message, /deez nuts/i)) {
		nPR(message, ` https://tenor.com/view/non-fa-niente-ritill-e-vabb%C3%A8-gif-26307508 `);
	} else if (rxt(message, /dragon/i)) {
		nPR(message, `https://tenor.com/view/dragon-tale-dragon-covered-fell-down-here-gif-5524123`);
	} else if (rxt(message, /honse/i)) {
		nPR(message, `https://i.kym-cdn.com/entries/icons/original/000/034/680/EWrC68tXkAE8ouz.jpeg `);
	} else if (rxt(message, /horse/i)) {
		nPR(message, `https://tenor.com/view/you-have-alerted-the-horse-horse-gt-when-the-gif-24722142`);
	} else if (rxt(message, /hp/i)) {
		nPR(message, `https://cdn.discordapp.com/attachments/1033012124311617577/1072738423787491408/image0.gif`);
	} else if (rxt(message, /in eden when/i)) {
		nPR(message, `https://tenor.com/view/cat-gif-25491298`);
	} else if (rxt(message, /\bl r\b/i)) {
		nPR(message, `https://i.redd.it/k8ve1kjctgw91.gif`);
	}


});






// Log in to Discord with your client's token
client.login(token);