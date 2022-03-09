const { CommandInteraction, MessageEmbed } = require('discord.js');

const DB = require('../../Structures/Schemas/ThankSetupDB.js')

module.exports = {
    name: 'thanklogchannel',
    description: "Which Channel To Send Thank Logs",
    permission: 'ADMINISTRATOR',
    options: [
        {
            name: "channel",
            description: "Channel To Send Thank Logs",
            type: 'CHANNEL',
            channelTypes: ['GUILD_TEXT'],
            required: true
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const channel = interaction.options.getChannel("channel")

        DB.findOneAndUpdate({ GuildID: interaction.guild.id }, { GuildID: interaction.guild.id, ChannelID: channel.id }, async (err, data) => {
            if (!data) data = await DB.create({ GuildID: interaction.guild.id, ChannelID: channel.id })
        })

        interaction.reply({ embeds: [new MessageEmbed().setColor("RANDOM").setDescription(`Successfully Set ${channel} as Thank Logs`)] })
    }
}