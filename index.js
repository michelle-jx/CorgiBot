// Require the necessary discord.js classes
const fs = require('node:fs') //native file system, reads commands directory
const path = require('node:path') //path utility, creates paths to access files/directories
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection(); //stores & retrieves commands for execution elsewhere

const commandsPath = path.join(_dirname, 'commands'); //makes path to commands directory
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')) //reads above path, returns array of filenames, only processes those ending in .js

// prevents empty/incorrect command files from running if 'data' and 'execute' exist
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file); 
	const command = require(filePath);
	//new item where key = command name, value = exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

//
client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;
	
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
	}
})