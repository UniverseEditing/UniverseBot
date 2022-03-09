const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { connection } = require("mongoose");
require("../../Events/Client/ready");

module.exports = {
  name: 'announce',
  description: 'Announce something.',
  permission: "MANAGE_MESSAGES",
  options:[
    {
        name: 'channel',
        description: 'The announce Channel.',
        type: 'CHANNEL',
        required: true
    }
  ],
  /**
   *
   *  @param {CommandInteraction} interaction
   *  @param {Client} client
   */
  

  async execute(interaction, client) {
    const options = interaction.options
    interaction.reply({content: "> ♻️ Please enter your announcement:"})

    const mentionedchannel = options.getChannel("channel");

    const filter = (m) => m.author.id === interaction.user.id;
    const message = interaction.channel.awaitMessages({ filter: filter, max: 1 });
          
    interaction.channel.awaitMessages({ filter: filter, max: 1 })
        .then((message) => {
            contentannounce = message.first()
            mentionedchannel.send({content: contentannounce.content})
        })
  }
}