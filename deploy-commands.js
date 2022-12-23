const { REST, Routes } = require('discord.js')
const { clientId, guildId, token } = require('./config.json')
const fs = require('node:fs')

const commands = [];

//grabs command files from command directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

//grab slashcommandbuilder#tojson output for deployment
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON())
}

//make & prepare instance of REST module
const rest = new REST({ version: '10' }).setToken(token);

//DEPLOY TIME BB
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`)

        //update current commands w/ current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        )
        console.log(`Successfully reloaded ${data.length} application (/) commands.`)
    } catch (error) {
        console.error(errors);
    }
})();