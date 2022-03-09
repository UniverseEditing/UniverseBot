const { CommandInteraction, Client } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: 'botrestart',
  description: 'Restart the Bot.',
  permission: "ADMINISTRATOR",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { guild, member } = interaction;
    if (!config.ownerIDS.includes(member.id)) {
      return interaction.reply({
        content: "> ❗️ You do not have permission to restart this bot",
      });
    }
    try{
        await interaction
        .reply({ content: "> ❗️ Restarting..." })
        .then(() => {
          client.destroy();
          console.log(
            `[Client] Restarting by ${member.user.username} in ${guild.name}`
          );
        })
        .then(() => {
          client.login(config.Token);
          console.log("[Client] Ready");
        });
        
    }catch{
        console.log("an error occured while restarting the bot.")
    }

  },
};
