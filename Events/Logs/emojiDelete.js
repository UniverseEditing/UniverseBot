// Logs whenever an emoji is deleted, uses audit logs and client basic event

const { Client, MessageEmbed, Emoji } = require("discord.js");
const LogsSetupData = require("../../Structures/Schemas/LogsSetupDB");

module.exports = {
  name: "emojiDelete",
  /**
   * @param {Emoji} emoji
   */
  async execute(emoji, client) {
    const Data = await LogsSetupData.findOne({
      GuildID: emoji.guild.id,
    });
    if (!Data) return;
    
    const logChannel = emoji.guild.channels.cache.get(Data.LogsChannel); 
    const logs = await emoji.guild.fetchAuditLogs({
      limit: 1,
      type: "EMOJI_DELETE"
    })
    const log = logs.entries.first(); // Fetches the logs and takes the last entry of the type "EMOJI_DELETE"

    if (log) { // If there is a corresponding entry creates the embed
      const emojiDeleteEmbed = new MessageEmbed()
        .setTitle(":hotsprings: An Emoji Has Been Deleted")
        .setColor("RED")
        .setDescription(`> The emoji \`${emoji.name}\` has been deleted by \`${log.executor.tag}\``)
        .setTimestamp()

      await logChannel.createWebhook(emoji.guild.name, { // Creates a webhook in the logging channel specified before
        avatar: emoji.guild.iconURL({ format: "png" })
      }).then(webhook => {
        webhook.send({ // Sends the embed through the webhook
          embeds: [emojiDeleteEmbed]
        }).then(() => webhook.delete().catch(() => { })) // Deletes the webhook and catches the error if any
      });
    }
  },
};


