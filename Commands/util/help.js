const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Feeling lost ?',
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async execute(interaction, client) {
		const help = new MessageEmbed()
			.setTitle('<a:bluecross:942516557412704256> UNI BOT // Help Menu \<a:bluecross:942516557412704256>')
			.setColor('#ffffff')
			.setDescription('> To see all my commands press the buttons below the message embed!\n')
			.setFields(
				{
					name: '♨️ Developer',
					value: `\`22 Developer commands\``,
					inline: false
				}, {
				name: '🔱 Utility',
				value: `\`28 Utility commands\``,
				inline: false
			}, {
				name: '🔊 Moderation',
				value: `\`9 Moderation commands\``,
				inline: false
			}
			)
			.setTimestamp()
			.setFooter({ text: 'Universe Bot - contact Jonas#1713 for help' })

		const embed1 = new MessageEmbed()
			.setTitle('<a:bluecross:942516557412704256> UNI BOT // Dev Commands \<a:bluecross:942516557412704256>')
			.setDescription(`\`\`\`• /botinfo\n• /staff \n• /suggest-setup help \n• /suggest-setup config\n• /suggest-setup create\n• /suggest-setup set-channel\n• /suggest-setup reset\n• /suggest-setup enable\n• /suggest-setup disable\n• /suggest-setup suggestion-managers\n• /suggest-setup allow-own-suggestion-delete\n• /thanklogchannel \n• /botrestart \n• /botsetup info \n• /botsetup rules  \n• /botsetup user \n• /botsetup appsubmits \n• /botsetup member  \n• /botsetup logsetup \n• /botsetup logreset \n• /approles \n• /applogchannel\`\`\` `)
			.setColor('#ffffff')
			.setTimestamp()

		const embed2 = new MessageEmbed()
			.setColor('#ffffff')
			.setTitle('<a:bluecross:942516557412704256> UNI BOT // Utility Commands \<a:bluecross:942516557412704256>')
			.setDescription(`\`\`\`• /afk \n• /calculator\n• /ascii \n• /play \n• /voice invite \n• /rockpapersiccors\n• /minecraft  \n• /voice name \n• /voice disallow \n• /voice public \n• /suggest \n• /youtube \n• /update \n• /embedbuilder \n• /discord-together \n• /thanks \n• /translate \n• /rank  \n• /leaderboard \n• /editinghelp depth \n• /editinghelp ffmpeg \n• /editinghelp plugins \n• /editinghelp ratiotoresolutions \n• /editinghelp unilogos \n• /editinghelp lumatte \n• /editinghelp replay \n• /editinghelp soundeffects \n• /editinghelp smoothvssharp \n• /editinghelp velocity\`\`\``)
			.setTimestamp()

		const embed3 = new MessageEmbed()
			.setColor('#ffffff')
			.setTitle('<a:bluecross:942516557412704256> UNI BOT // Moderation Commands \<a:bluecross:942516557412704256>')
			.setDescription(`\`\`\`• /clear\n• /poll\n• /userinfo\n• /3hc\n• /3hcend\n• /3hcreview\n• /3hcsubmit\n• /announcement \n• /timeout mute \n• /timeout unmute\`\`\``)
			.setTimestamp()

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('PRIMARY')
                    .setLabel("Dev")
					.setEmoji('♨️')
					.setCustomId('dev'),

				new MessageButton()
					.setStyle('PRIMARY')
                    .setLabel("Utility")
					.setEmoji('🔱')
					.setCustomId('utility'),

				new MessageButton()
					.setStyle('PRIMARY')
                    .setLabel("Moderation")
					.setEmoji('🔊')
					.setCustomId('moderation'),


			)

		const row4 = new MessageActionRow()
			.addComponents(
                new MessageButton()
                .setStyle('PRIMARY')
                .setLabel("Dev")
                .setEmoji('♨️')
                .setCustomId('dev'),

            new MessageButton()
                .setStyle('PRIMARY')
                .setLabel("Utility")
                .setEmoji('🔱')
                .setCustomId('utility'),

            new MessageButton()
                .setStyle('PRIMARY')
                .setLabel("Moderation")
                .setEmoji('🔊')
                .setCustomId('moderation'),

			)

		const msg = interaction.reply({ embeds: [help], components: [row] })

		const collector = interaction.channel.createMessageComponentCollector({
			time: 1000 * 60
		});

		collector.on('collect', async interaction => {
			if (interaction.customId === 'dev') {
				await interaction.reply({ embeds: [embed1], ephemeral: true })
			} else if (interaction.customId === 'utility') {
				await interaction.reply({ embeds: [embed2], ephemeral: true })
			} else if (interaction.customId === 'moderation') {
				await interaction.reply({ embeds: [embed3], ephemeral: true })
			}
		})

		collector.on('end', async () => {
			interaction.editReply({
				embeds: [help],
				components: [row4]
			})
		})
	}
}