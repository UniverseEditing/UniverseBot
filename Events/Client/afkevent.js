const { Message, MessageEmbed } = require('discord.js');
const Schema = require('../../Structures/Schemas/AfkSystem.js');

module.exports = {
    name: 'messageCreate',
    /**
     * 
     * @param {Message} message 
     */
    async execute(message) {
        if(message.author.bot) return;


        const checkafk = await Schema.findOne({Guild: message.guild.id, User: message.author.id})
    
        if(checkafk) {
            checkafk.delete()
    
            const dataDeletedEmbed = new MessageEmbed()
            .setDescription(`> :grey_exclamation: You are no longer AFK!`)
            .setColor('#ffffff')
    
    
            message.channel.send({embeds: [dataDeletedEmbed]})
        }
    
        const mentionedUser = message.mentions.users.first();
        if(mentionedUser) {

           const data = await Schema.findOne({Guild: message.guild.id, User: mentionedUser.id})
    
            if(data) {
                const embed = new MessageEmbed()
                .setTitle(`${mentionedUser.username} is currently AFK!`)
                .setColor('#ffffff')
                .setDescription(`> Reason: ${data.Reason} \n > Since: <t:${Math.round(data.Date / 1000)}:R>`)
    
                message.channel.send({embeds: [embed]})
            }
        }
    }
}