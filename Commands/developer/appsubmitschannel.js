const { Client } = require("discord.js");
const fs = require("fs")
require("../../Events/Client/ready");
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'appsubmitschannel',
    description: 'Set the app logs.',
    permission: "ADMINISTRATOR",
    options: [
        {
            name: 'applogs',
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

        const appslogchannelvar = options.getChannel("applogs");
        const applogsjson = {
        apps: appslogchannelvar.id
        }

    
        fs.writeFileSync('./data/appsubmits.json', JSON.stringify(applogsjson), err =>{
        if (err) {
            console.log(err);
        } else {
            console.log("Logchannel successfully written to ./data/applogs.")
        }
        
        })

        interaction.reply({content: `> ♻️ Successfully setup the app logs.`, ephemeral: true})
            
    }
}