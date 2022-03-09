const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const { button } = require("../../Commands/Developer/botsetup");
const { userrole } = require("../../data/userrole.json");

module.exports = {
  name: "interactionCreate",
  /**
  *
  * @param {CommandInteraction} interaction
  * @param {Client} client
  */
  async execute(interaction, client) {
    const button = interaction.customId;
    const { guild, member } = interaction;

    if (!interaction.isButton()) return;
      if(button === 'verify') {
        interaction.reply({content: `> ♻️ Successfully verifyed.`, ephemeral: true});
        console.log(`User verifyed.`)
        const guild = interaction.guild
        let role = guild.roles.cache.find(r => r.id === userrole);
        member.roles.add(role);

      } 
  }
}
