const { Client } = require("discord.js");
const fs = require("fs")
require("../../Events/Client/ready");
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'welcomechannel',
    description: 'Set the welcome Channel.',
    permission: "ADMINISTRATOR",
    options: [
        {
            name: 'channel',
            description: 'Select the Channel',
            type: "CHANNEL",
            required: true
        },

    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const options = interaction.options

        const appslogchannelvar = options.getChannel("channel");
        const applogsjson = {
        welcome: appslogchannelvar.id
        }

    
        fs.writeFileSync('./data/welcomechannel.json', JSON.stringify(applogsjson), err =>{
        if (err) {
            console.log(err);
        } else {
            console.log("Logchannel successfully written to ./data/welcomechannel.")
        }
        
        })

        interaction.reply({content: `> ♻️ Successfully setup the welcome channel.`, ephemeral: true})
            
    }
}