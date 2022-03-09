const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "minecraft",
    description: "To view information for a Minecraft account",
    options: [
        {
            name: "username",
            description: "Username",
            type: "STRING",
            required: true
        }
    ],
    async execute(interaction, client) {
        const embed = new Discord.MessageEmbed().setColor(client.gris)
        const username = interaction.options.getString("username");

        axios.get(`https://some-random-api.ml/mc/?username=${username}`).then(Response => {
            const { data } = Response;
            embed.setTitle("UNI BOT // MINECRAFT").addField(`Player Name:`, `> ${data.name_history.map((a => `${a.name} (${a.changedToAt})`)).join(", ")}`)
                .addField("UUID:", `> ${data.uuid}`)
            interaction.reply({ embeds: [embed] })
        }).catch(() => interaction.reply({ content: `> ❌ Please provide a valid username!`, ephemeral: true }));
    }
}