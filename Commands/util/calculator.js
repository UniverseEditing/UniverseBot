const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { Calculator } = require('slash-calculator');


module.exports = {
    name: 'calculator',
    description: 'Use a calculator and find your answer!',
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction,err) {
        await Calculator({
            interaction: interaction,
            embed: {
                title: '<a:animated_crown:943871318607134810> UNI Discord // Universe - Calculator <a:animated_crown:943871318607134810>',
                color: '#ffffff',
                footer: 'UNI Discord',
                timestamp: true
            },
            disabledQuery: '> ❗️ Calculator is disabled!',
            invalidQuery: '> ❗️ The provided equation is invalid!',
            othersMessage: '> ❗️ Only <@{{author}}> can use the buttons!'
        });

    }
}