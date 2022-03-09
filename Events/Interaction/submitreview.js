const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const { button } = require("../../Commands/Developer/botsetup");
const { userrole } = require("../../data/userrole.json");
const fs = require('fs');


module.exports = {
  name: "interactionCreate",
  /**
  *
  * @param {CommandInteraction} interaction
  * @param {Client} client
  */
  
  async execute(interaction, client) {
    try{
      const button = interaction.customId;
    const Buttoninteractionvar = interaction;
    const { guild, member } = interaction;

    if (!interaction.isButton()) return;

    var fs = require('fs')
    var path = "./data/submits/"
    var files = []

    var getFiles = function(path, files){
    fs.readdirSync(path).forEach(function(file){
        var subpath = path + '/' + file;
        if(fs.lstatSync(subpath).isDirectory()){
            getFiles(subpath, files);
        } else {
            files.push(file);
        }
    });     
    }

    getFiles(path, files)
    var stringfiles = files.toString()

      if(stringfiles.includes(button)) {

        interaction.reply({content: `> ♻️ Review form created!`, ephemeral: true});
        const { submitID } = require(`../../data/submits/${button}.json`);
        const { submitName } = require(`../../data/submits/${button}.json`);
        const { submitLink } = require(`../../data/submits/${button}.json`);
        const { submitMember } = require(`../../data/submits/${button}.json`);


        guild.channels.create(`review - ${submitName}`, {
          type: 'text',
          permissionOverwrites: [
            {
              id: "839904132583522376", 
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
            .setTitle("<a:bluecross:942516557412704256>  UNI Discord // REVIEW SUBMIT <a:bluecross:942516557412704256> ")
            .setDescription("**------------** \n> Enter \`exit\` to exit promt. \n> **Please enter Status:** \n \`\`\`[TRIAL // MEMBER // REAPP]\`\`\` \n**------------** ")
            .setColor("#ffffff")
            .setTimestamp()

          const createdchannel = channel
          channel.send({ content: `<@${member.id}>`,embeds: [e1]})

          const filter = (m) => m.author.id === member.id;
          const message = channel.awaitMessages({ filter: filter, max: 1 });
          
          channel.awaitMessages({ filter: filter, max: 1 })
            .then((message) => {
              message = message.first()

              const Status = message.content

              if(Status.includes("exit")){
                channel.delete();
              } else {
              channel.bulkDelete("3", true)

              const e2 = new MessageEmbed() 
                .setTitle("<a:bluecross:942516557412704256>  UNI Discord // REVIEW SUBMIT <a:bluecross:942516557412704256> ")
                .setDescription("**------------** \n> Enter \`exit\` to exit promt. \n> **Please enter OPS:**\n \`\`\`➤...\n➤...\n➤...\`\`\` \n**------------** ")
                .setColor("#ffffff")
                .setTimestamp()

                channel.send({ embeds: [e2]})

                const filter = (m) => m.author.id === member.id;
                const link = channel.awaitMessages({ filter: filter, max: 1 });
                
                channel.awaitMessages({ filter: filter, max: 1 })
                  .then((link) => {
                    link = link.first()

                    const reviewOps = link.content


                    if(reviewOps.includes("exit")){
                      channel.delete();
                  
                    } else {
                    channel.bulkDelete("3", true)

                    const e3 = new MessageEmbed() 
                    .setTitle("<a:bluecross:942516557412704256>  UNI Discord // EDIT SUBMITTED <a:bluecross:942516557412704256> ")
                    .setDescription(`**------------** \n> Successfully reviewed ${submitName}\'s submit! \n> **Review was send to APP-RESULTS channel.** \n**------------** `)
                    .setColor("#ffffff")
                    .setTimestamp()
                    .setFooter({ text: 'This channel will close in 10 seconds.'});
                  
                  const reviewchannelid = channel.id
                  client.channels.fetch(reviewchannelid).then(channel => channel.send({ embeds: [e3]}));

                  const { appsresultschannel }  = require("../../data/appresultschannel.json")
                  client.channels.fetch(appsresultschannel).then(channel => channel.send({ content: `**--------------**\nAPP BY: <@${submitMember}>\n\n> ${submitLink} \n> **STATUS:** \`${Status}\` \n\n**OPS:**\n\`\`\`${reviewOps}\`\`\`\n**--------------**`}));

                  if(Status.includes("MEMBER")){
                    const { member } = require("../../data/approles.json")
                    const guild = interaction.guild
                    let user = guild.members.cache.get(submitMember);
                    let role = guild.roles.cache.find(r => r.id === member);
                    user.roles.add(role);
                    console.log("Added Member role.")
                    fs.unlink(`./data/submits/${button}.json`, function (err) {
                      if (err) {
                          console.error(err);
                      } else {
                          console.log("File removed!");
                      }
                  });
                  }

                  
                  if(Status.includes("TRIAL")){
                    const { trial } = require("../../data/approles.json")
                    const guild = interaction.guild
                    let user = guild.members.cache.get(submitMember);
                    let role = guild.roles.cache.find(r => r.id === trial);
                    user.roles.add(role);
                    console.log("Added Member role.")
                    fs.unlink(`./data/submits/${button}.json`, function (err) {
                      if (err) {
                          console.error(err);
                      } else {
                          console.log("File removed!");
                      }
                  });
                  }

                  setTimeout(function() {
                    channel.delete(); 
                    Buttoninteractionvar.message.edit({ components: []})
                  }, 10000) 

              }
                  })
                }
            })
          

        })
      } 
  } catch{
    console.log("exit.")
  }
}
    
}
