const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with hello'),
    async execute(interaction) {
        await interaction.reply('CorgiBot says henlo!')
    }
}