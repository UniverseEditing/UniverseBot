
const { MessageEmbed, Client, Presence } = require("discord.js");
const LogsSetupData = require("../../Structures/Schemas/LogsSetupDB");

module.exports = {
  name: "presenceUpdate",
  /**
   * @param {Presence} oldPresence
   * @param {Presence} newPresence
   * @param {Client} client
   */
  async execute(oldPresence, newPresence, client) {
    if (!oldPresence || !newPresence) return
    const Data = await LogsSetupData.findOne({
      GuildID: oldPresence.guild.id,
    });
    if (!Data) return;
    
    const logChannel = oldPresence.guild.channels.cache.get(Data.LogsChannel); 

    const userUpdateEmbed = new MessageEmbed()
      .setColor("ORANGE")
      .setTitle(`:warning: A Member Presence Has Been Updated`)
      .setTimestamp()

    if (oldPresence.status !== newPresence.status) { // If status has changed execute code
      userUpdateEmbed.setDescription(`> The status of ${oldPresence.member} has ben updated`)
        .addFields(
          {
            name: "Old status",
            value: `\`${oldPresence.status}\``
          },
          {
            name: "New status",
            value: `\`${newPresence.status}\``
          }
        )

      await createAndDeleteWebhook(userUpdateEmbed) //executes the function bellow with as parameter the embed name
    }


    async function createAndDeleteWebhook(embedName) {
      await logChannel.createWebhook(oldPresence.guild.name, { // Creates a webhook in the logging channel specified before
        avatar: oldPresence.guild.iconURL({ format: "png" })
      }).then(webhook => {
        webhook.send({ // Sends the embed and transcript file through the webhook
          embeds: [embedName]
        }).then(() => webhook.delete().catch(() => { })) // Deletes the webhook and catches the error if any
      });
    }
  }
}


