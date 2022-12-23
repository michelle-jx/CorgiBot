const { channel } = require('diagnostics_channel')
const { request } = require('undici')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const UNSPLASH_API = 'https://source.unsplash.com/random?corgi'
//https://discordjs.guide/popular-topics/embeds.html#embed-preview eventually for embed
//https://discordjs.guide/additional-info/rest-api.html#retrieving-the-json-response-from-a-request 


//have to hotlink -- embed URL into response
module.exports = {
    data: new SlashCommandBuilder()
        .setName('corgibomb')
        .setDescription('CorgiBot perceives you and replies with corgis.'),
    async execute(interaction) {
        await interaction.reply("sigh it doesn't work")
    }
}