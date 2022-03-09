// Logs whenever an emoji is created, uses audit logs and client basic event

const { Client, MessageEmbed, Emoji } = require("discord.js");
const LogsSetupData = require("../../Structures/Schemas/LogsSetupDB");

module.exports = {
  name: "emojiCreate",
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
      type: "EMOJI_CREATE"
    })
    const log = logs.entries.first(); // Fetches the logs and takes the last entry of the type "EMOJI_CREATE"

    if (log) { // If there is a corresponding entry creates the embed
      const emojiCreateEmbed = new MessageEmbed()
        .setTitle(":recycle: An Emoji Has Been Created")
        .setColor("GREEN")
        .setDescription(`> The emoji \`${emoji.name}\` has been created by \`${log.executor.tag}\``)
        .setImage(emoji.url)
        .setTimestamp()


      await logChannel.createWebhook(emoji.guild.name, {// Creates a webhook in the logging channel specified before
        avatar: emoji.guild.iconURL({ format: "png" })
      }).then(webhook => {
        webhook.send({ // Sends the embed through the webhook
          embeds: [emojiCreateEmbed]
        }).then(() => webhook.delete().catch(() => { })) // Deletes the webhook and catches the error if any
      });
    }
  },
};

