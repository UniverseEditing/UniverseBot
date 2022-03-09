const { CommandInteraction, MessageEmbed, Message } = require('discord.js');
const { Player, Queue } = require("discord-player");

module.exports = {
    name: 'play',
    description: 'Play a song.',
    options: [
        {
            name: 'link',
            description: 'Youtube or Spotify Link.',
            type: 'STRING',
            required: true
        }
    ], 
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Message} message 
     */
    async execute(interaction, message) {
        const query = interaction.options.getString('link') || 'No reason'
        
        if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
        const queue = player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        });
        
        // verify vc connection
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
        }

        await interaction.deferReply();
        const track = await player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** not found!` });

        queue.play(track);
        console.log(queue)

        return await interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` });

    }
}