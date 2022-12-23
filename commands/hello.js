const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('CorgiBot says hello!'),
	async execute(interaction) {
		await interaction.reply("૮ฅ・ﻌ・აฅ hello ૮ฅ・ﻌ・აฅ"); //replace with other emojis
	},
};