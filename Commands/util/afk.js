const { CommandInteraction, MessageEmbed, Message } = require('discord.js');
const afkSchema = require('../../Structures/Schemas/AfkSystem.js');

module.exports = {
    name: 'afk',
    description: 'Set your self afk.',
    options: [
        {
            name: 'reason',
            description: 'AFK reason.',
            type: 'STRING',
            required: false
        }
    ], 
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Message} message 
     */
    async execute(interaction, message) {
        const reason = interaction.options.getString('reason') || 'No reason'
        
        const params = {
            Guild: interaction.guild.id,
            User: interaction.user.id
        }

        afkSchema.findOne({params}, async(err, data) => {
            if(err)
            throw err;
            if(data) {
                data.delete()
                interaction.reply({content: `> :grey_exclamation: ${interaction.user} you are no longer afk`, ephemeral: true})
            } else {
                new afkSchema({
                    Guild: interaction.guild.id,
                    User: interaction.user.id,
                    Reason: reason,
                    Date: Date.now()
                }).save();
                interaction.reply({content: `> :grey_exclamation: You are now afk for \`${reason}\``, ephemeral: true})
            }
        })
    }
}