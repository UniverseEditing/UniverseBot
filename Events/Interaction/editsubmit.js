const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { apps } = require("../../data/appsubmits.json")
const { EVERYONEID } = require("../../config.json")
const fs = require("fs")

module.exports = {
  name: "interactionCreate",
  /**
  *
  * @param {CommandInteraction} interaction
  * @param {Client} client
  */
  async execute(interaction, client) {
    const button = interaction.customId;
    const { guild, member, customId } = interaction;

    if (!interaction.isButton()) return;
    if (button === 'editsubmit') {
      interaction.reply({ content: `> ♻️ A channel was created for you submit.`, ephemeral: true });

      const ID = Math.floor(Math.random() * 90000) + 10000;
      console.log(`Submit created. ID ${ID}`)

      guild.channels.create(`📯﹒review ${interaction.user.username}`, {
        type: 'text',
        permissionOverwrites: [
          {
            id: EVERYONEID,
            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
          },
          {
            id: member,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
          }
        ],
      })
        .then((channel) => {

          const e1 = new MessageEmbed()
            .setTitle("<a:bluecross:942516557412704256>  UNI Discord // EDIT SUBMIT <a:bluecross:942516557412704256> ")
            .setDescription("**------------** \n> Enter \`exit\` to exit promt. \n> **Please enter your Name:** \n**------------** ")
            .setColor("#ffffff")
            .setTimestamp()

          channel.send({ content: `<@${member.id}>`, embeds: [e1] })

          const filter = (m) => m.author.id === member.id;
          const message = channel.awaitMessages({ filter: filter, max: 1 });

          channel.awaitMessages({ filter: filter, max: 1 })
            .then((message) => {
              message = message.first()
              const submitname = message.content

              if (submitname.includes("exit")) {
                channel.delete();

              } else {
                channel.bulkDelete("3", true)

                const e2 = new MessageEmbed()
                  .setTitle("<a:bluecross:942516557412704256>  UNI Discord // EDIT SUBMIT <a:bluecross:942516557412704256> ")
                  .setDescription("**------------** \n> Enter \`exit\` to exit promt. \n> **Please enter your edit`s link:** \n**------------** ")
                  .setColor("#ffffff")
                  .setTimestamp()

                channel.send({ embeds: [e2] })

                const filter = (m) => m.author.id === member.id;
                const link = channel.awaitMessages({ filter: filter, max: 1 });

                channel.awaitMessages({ filter: filter, max: 1 })
                  .then((link) => {
                    link = link.first()
                    const submitlink = link.content

                    if (submitlink.includes("exit")) {
                      channel.delete();

                    } else {
                      channel.bulkDelete("3", true)

                      const e3 = new MessageEmbed()
                        .setTitle("<a:bluecross:942516557412704256>  UNI Discord // EDIT SUBMITTED <a:bluecross:942516557412704256> ")
                        .setDescription("**------------** \n> Thank you for submitting your app! \n> **You will recieve Feedback soon.** \n**------------** ")
                        .setColor("#ffffff")
                        .setTimestamp()
                        .setFooter({ text: 'This channel will close in 10 seconds.' });

                      channel.send({ embeds: [e3] });
                      setTimeout(() => {
                        channel.delete();
                        const logs = new MessageEmbed()
                          .setTitle("<a:bluecross:942516557412704256>  UNI Discord // EDIT SUBMITTED <a:bluecross:942516557412704256> ")
                          .setDescription(`**------------** \n> **Submit by:** ${submitname} \n> **Submit Link:**  [click here](${submitlink}) \n**------------** `)
                          .setColor("#ffffff")
                          .setTimestamp()
                          .setFooter({ text: `ID: ${ID}` });

                        const ButtonID = ID.toString();

                        const reviewbutton = new MessageActionRow();
                        reviewbutton.addComponents(
                          new MessageButton()
                            .setCustomId(ButtonID)
                            .setLabel("Click review")
                            .setStyle("PRIMARY")
                            .setEmoji("<a:animated_crown:943871318607134810>")
                        );

                        client.channels.fetch(apps).then(channel => channel.send({ embeds: [logs], components: [reviewbutton] }));


                        const submitjson = {
                          submitID: ID,
                          submitName: submitname,
                          submitLink: submitlink,
                          submitMember: member.id,
                        }

                        fs.writeFileSync(`./data/submits/${ID}.json`, JSON.stringify(submitjson), err => {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log("Submit successfully written to ./data/submits/.")
                          }

                        })

                      }, 10000)


                    }
                  });
              }
            });

        })
    }
  }

}
