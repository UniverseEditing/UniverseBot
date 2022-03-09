const { Client } = require("discord.js");
const fs = require("fs")
require("../../Events/Client/ready");
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'approles',
    description: 'Set the app roles.',
    permission: "ADMINISTRATOR",
    options: [
        {
            name: 'memberrole',
            description: 'Select the Memberrole.',
            type: "ROLE",
            required: true
        },
        {
            name: 'trialrole',
            description: 'Select the Trialrole.',
            type: "ROLE",
            required: true
        },

    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const options = interaction.options

        const approlesmember = options.getRole("memberrole");
        const approlestrial = options.getRole("trialrole");

        const approlesjson = {
            trial: approlestrial.id,
            member: approlesmember.id
        }


        fs.writeFileSync('./data/approles.json', JSON.stringify(approlesjson), err => {
            if (err) {
                console.log(err);
            } else {
                console.log("Logchannel successfully written to ./data/approles.")
            }

        })

        interaction.reply({ content: `> ♻️ Successfully setup the app roles.`, ephemeral: true })

    }
}