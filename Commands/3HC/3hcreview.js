const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const fs = require("fs")

module.exports = {
    name: '3hcreview',
    description: "Review a 3HC edit.",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "messageid",
            description: "The Embeds Message ID.",
            type: 'STRING',
            required: true
        },
        {
            name: "firstvote",
            description: "Please enter your vote (1-10).",
            type: 'STRING',
            required: true
        },
        {
            name: "secondvote",
            description: "Please enter your vote (1-10).",
            type: 'STRING',
            required: false
        },
        {
            name: "thirdvote",
            description: "Please enter your vote (1-10).",
            type: 'STRING',
            required: false
        },
        {
            name: "fourthvote",
            description: "Please enter your vote (1-10).",
            type: 'STRING',
            required: false
        },
        {
            name: "fifthvote",
            description: "Please enter your vote (1-10).",
            type: 'STRING',
            required: false
        },
        {
            name: "sixthvote",
            description: "Please enter your vote (1-10).",
            type: 'STRING',
            required: false
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {

        const Link = interaction.options.getString('messageid') || 'No reason'

        const firstv = interaction.options.getString('firstvote') || '0'
        const secondv = interaction.options.getString('secondvote') || '0'
        const thirdv = interaction.options.getString('thirdvote') || '0'
        const fourthv = interaction.options.getString('fourthvote') || '0'
        const fifthv = interaction.options.getString('fifthvote') || '0'
        const sixthv = interaction.options.getString('sixthvote') || '0'

        try {
            const { review } = require("../../data/3hc/3hcdata.json")


            if (review == interaction.channelId) {

                interaction.channel.messages.fetch(Link)
                    .then(message => {
                        const descriptionstr = message.embeds[0].description
                        const submittionuservar = descriptionstr.substr(15, 18)

                        rawpoints = +firstv + +secondv + +thirdv + +fourthv + +fifthv + +sixthv
                        const randomint = Math.random()
                        points = +rawpoints + +randomint

                        const datareviewjson = {
                            userid: submittionuservar
                        }
                        fs.writeFileSync(`./data/3hc/points/${points}.json`, JSON.stringify(datareviewjson), err => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("3hc started.")
                            }

                        })

                        const Embed = new MessageEmbed()
                        interaction.reply({ embeds: [Embed.setDescription(`> ♻️ <@${submittionuservar}>\'s edit was successfully reviewed with ${rawpoints} points!`).setColor("#ffffff")], ephemeral: true });
                    })
                    .catch(console.error);

            } else {
                const Embed = new MessageEmbed()
                interaction.reply({ embeds: [Embed.setDescription(`> ⭕️ Only use that command in the 3HC review Channel!`).setColor("#ffffff")], ephemeral: true });
            }
        } catch {
            const Embed = new MessageEmbed()
            interaction.reply({ embeds: [Embed.setDescription(`> ⭕️ There's no HC currently running!`).setColor("#ffffff")], ephemeral: true });
        }
    }
}