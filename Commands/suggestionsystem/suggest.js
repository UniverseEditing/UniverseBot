const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const suggestDB = require("../../structures/schemas/suggestDB");
const suggestSetupDB = require("../../structures/schemas/suggestSetupDB");

module.exports = {
  name: "suggest",
  description: "Create a suggestion.",
  usage: "/suggest",
  options: [
    {
      name: "type",
      description: "Select a type.",
      required: true,
      type: "STRING",
      choices: [
        {
          name: "Command",
          value: "Command",
        },
        {
          name: "Event",
          value: "Event",
        },
        {
          name: "System",
          value: "System",
        },
        {
          name: "Other",
          value: "Other",
        },
      ],
    },
    {
      name: "suggestion",
      description: "Describe your suggestion.",
      type: "STRING",
      required: true,
    },
    {
      name: "dm",
      description: "Set whether the bot will DM you, once your suggestion has been declined or accepted.",
      type: "BOOLEAN",
      required: true,
    }
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { options, guildId, member, user } = interaction;

    const suggestionsSetup = await suggestSetupDB.findOne({ GuildID: guildId });
    var suggestionsChannel;

    if(!suggestionsSetup) {
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`> ❌ This server has not setup the suggestion system.`)]})
    } else {
      suggestionsChannel = interaction.guild.channels.cache.get(suggestionsSetup.ChannelID)
    }

    if(suggestionsSetup.Disabled)
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`> ❌ Suggestions are currently disabled.`)]})

    if(suggestionsSetup.ChannelID === "None")
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`> ❌ The suggestion channel hasn't been set.`)]})

    const type = options.getString("type");
    const suggestion = options.getString("suggestion");
    const DM = options.getBoolean("dm")
    
    const Embed = new MessageEmbed()
      .setColor("#ffffff")
      .setAuthor({name: `${user.tag}`, iconURL: `${user.displayAvatarURL({dynamic: true})}`}, )
      .setDescription(`**Suggestion:**\n${suggestion}`)
      .addFields(
        {name: "Type", value: `> type`, inline: false},
        {name: "Status", value: "> 🕐 Pending", inline: false},
        {name: "Reason", value: "> 🕐 Pending", inline: false},
      )
      .addFields(
        {name: "Upvotes", value: "> 0", inline: false},
        {name: "Downvotes", value: "> 0", inline: false},
        {name: "Overall votes", value: "> 0", inline: false},
      )
    
    const buttons = new MessageActionRow()
    buttons.addComponents(
      new MessageButton().setCustomId("suggestion-upvote").setLabel(`Upvote`).setStyle("PRIMARY").setEmoji(`❤️`),
      new MessageButton().setCustomId("suggestion-downvote").setLabel(`Downvote`).setStyle("PRIMARY").setEmoji(`💔`)
    )

    try {
      const M = await suggestionsChannel.send({embeds: [Embed], components: [buttons]});

      await suggestDB.create({GuildID: guildId, MessageID: M.id, Details: [
        {
          MemberID: member.id,
          Type: type,
          Suggestion: suggestion,
        }],
        MemberID: member.id,
        DM: DM,
        UpvotesMembers: [],
        DownvotesMembers: [],
        InUse: false,
      })
      interaction.reply({embeds: [new MessageEmbed().setColor("#ffffff").setDescription(`> ✅ Your [suggestion](${M.url}) was successfully created and sent to ${suggestionsChannel}`)], ephemeral:true})
    } catch (err) {
      console.log(err);
      return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`> ❌ An error occured.`)]})     
    }
  }
}
