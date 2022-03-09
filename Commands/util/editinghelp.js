const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fs = require("fs")

module.exports = {
    name: 'editinghelp',
    description: 'Get editing help.',
    options: [
        {
            name: "depth",
            description: "Get DOF help.",
            type: "SUB_COMMAND",  
          },
        {
            name: 'ffmpeg',
            description: 'Get FFMPEG help.',
            type: 'SUB_COMMAND',
        },
        {
          name: 'plugins',
          description: 'Get Plugins help.',
          type: 'SUB_COMMAND',
        },
        {
          name: 'ratiotoresolutions',
          description: 'Get Ratiotoresolutions help.',
          type: 'SUB_COMMAND',
        },
        {
          name: 'unilogos',
          description: 'Get Uni Logo resources.',
          type: 'SUB_COMMAND',
        },
        {
          name: 'lumamatte',
          description: 'Get lumamatte help.',
          type: 'SUB_COMMAND',
        },
        {
          name: 'replay',
          description: 'Get Replay Mod help.',
          type: 'SUB_COMMAND',
        },
        {
          name: 'soundeffects',
          description: 'Get Sound effects resources.',
          type: 'SUB_COMMAND',
        },
        {
          name: 'smoothvsharp',
          description: 'Smooth vs. Sharp Velo curve.',
          type: 'SUB_COMMAND',
        },
        {
          name: 'velocity',
          description: 'Get velocity help.',
          type: 'SUB_COMMAND',
        }
    ], 
    /**
    * @param {GuildMember} member
    * @param {CommandInteraction} interaction
    */ 
    async execute(interaction) {
            const options = interaction.options;
            const { guild, channelId } = interaction;

            switch (options.getSubcommand()) {
              case "depth": {
                    const depthEmbed = new MessageEmbed()
                        .setTitle("<a:animated_crown:943871318607134810> UNI Discord // Depth Help <a:animated_crown:943871318607134810>")
                        .setColor("#ffffff")
                        .setDescription("> **Here some Tutorials:** \n\n `-` https://youtu.be/YXaAXfaLaHs \n `-` https://youtu.be/tqbtDHLIjbc")
                        .setImage("https://i.ytimg.com/vi/YXaAXfaLaHs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDSKwq9yWFSlUAxdufshzQC0_LN3g")
                        .setTimestamp()

                    interaction.reply({ embeds: [depthEmbed]})
                break;
                }
              case "velocity": {
                  const depthEmbed = new MessageEmbed()
                      .setTitle("<a:animated_crown:943871318607134810> UNI Discord // Velocity Help <a:animated_crown:943871318607134810>")
                      .setColor("#ffffff")
                      .setDescription("> **Here some Tutorials:** \n\n `-` https://www.youtube.com/watch?v=sqyFfIeSIH0")
                      .setImage("https://i.ytimg.com/vi/sqyFfIeSIH0/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCxj0J0upJhp494Wowao2B_34TisA")
                      .setTimestamp()

                  interaction.reply({ embeds: [depthEmbed]})
              break;
              }
              case "soundeffects": {
                  const depthEmbed = new MessageEmbed()
                      .setTitle("<a:animated_crown:943871318607134810> UNI Discord // Sound effects <a:animated_crown:943871318607134810>")
                      .setColor("#ffffff")
                      .setDescription("> **Here some Sound effects:** \n\n `-` CS 1.6: https://bit.ly/2MrFJQm \n `-` CSS: http://bit.ly/2I0m6gX \n `-` CSGO: http://bit.ly/2Fk3zxz \n `-` FORTNITE: http://bit.ly/SFX_fortnite \n `-` PUBG: http://bit.ly/2trVu5m \n `-` COD 4: http://bit.ly/2CUQp52 \n `-` MW2: http://bit.ly/2F8J6Zy \n `-` MW3: http://bit.ly/2I1TL9Z \n `-` BO1: http://bit.ly/2FOoKpv \n `-` BO2: http://bit.ly/2DqMFMc \n `-` BO3: http://bit.ly/2I2QEyH \n `-` BO4: https://goo.gl/TSBHV3 \n `-` LoL: http://bit.ly/2tfL3BK \n `-` Minecraft: https://goo.gl/rC2qN2 \n `-` Whooshes: https://drive.google.com/open?id=1F6fzyUOrffDgH-KCp3KJJpBY4mjjWxKp")
                      .setTimestamp()

                  interaction.reply({ embeds: [depthEmbed]})
              break;
              }
              case "replay": {
                  const replayEmbed = new MessageEmbed()
                      .setTitle("<a:animated_crown:943871318607134810> UNI Discord // Replay Mod Help <a:animated_crown:943871318607134810>")
                      .setColor("#ffffff")
                      .setDescription("> **Here some Tutorials:** \n\n `-` https://www.youtube.com/watch?v=8QcqgWa7kOU \n `-` https://www.youtube.com/watch?v=mTIRr-zyKIE")
                      .setImage("https://i.ytimg.com/vi/8QcqgWa7kOU/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCaPqCU5SF1DVZ6kgVBbmbYuGWXhA")
                      .setTimestamp()

                  interaction.reply({ embeds: [replayEmbed]})
              break;
              }
              case "plugins": {
                  const pluginEmbed = new MessageEmbed()
                      .setTitle("<a:animated_crown:943871318607134810> UNI Discord // PLUGIN Help <a:animated_crown:943871318607134810>")
                      .setColor("#ffffff")
                      .setDescription("> **Resources:** \n\n `-` [click here to download Plugins](https://drive.google.com/drive/folders/13nEvkHm6leyhULBx8lGYThUOgs06zZ_S?usp=sharing)")
                      .setTimestamp()
                  await interaction.reply({ embeds: [pluginEmbed] })
                break;
                }
              case "lumamatte": {
                  const lumamatteEmbed = new MessageEmbed()
                      .setTitle("<a:animated_crown:943871318607134810> UNI Discord // Lumamatte Help <a:animated_crown:943871318607134810>")
                      .setColor("#ffffff")
                      .setDescription("> **Resources:** \n\n `-` [click here to download Lumamatte Shader](https://drive.google.com/file/d/1k9RLqfY1s-Y_LaUphLu7eGbZDOXWd_yV/view) \n `-` [click here to watch Tutorial Video](https://cdn.discordapp.com/attachments/754027452757704876/790472565965586442/How_to_use_a_luma_matte.mp4)")
                      .setTimestamp()

                  await interaction.reply({ embeds: [lumamatteEmbed] })
                  guild.channels.cache.get(channelId).send('https://cdn.discordapp.com/attachments/754027452757704876/790472565965586442/How_to_use_a_luma_matte.mp4')
                break;
                }
              case "smoothvsharp": {
                try{
                  const smoothvsharpeEmbed = new MessageEmbed()
                      .setTitle("<a:animated_crown:943871318607134810> UNI Discord // Smooth vs. Sharp Velo curve <a:animated_crown:943871318607134810>")
                      .setColor("#ffffff")
                      .setDescription("> **Resources:** \n\n `-` [click here to watch Tutorial Video](https://cdn.discordapp.com/attachments/754027452757704876/776347188245692426/Smooth_vs_Sharp_Velo.mp4)")
                      .setTimestamp()

                  await interaction.reply({ embeds: [smoothvsharpeEmbed] })
                  guild.channels.cache.get(channelId).send('https://cdn.discordapp.com/attachments/754027452757704876/776347188245692426/Smooth_vs_Sharp_Velo.mp4')
                }catch{
                  console.log("An error occured.")
                }
                  
                break;
                }
              case "ratiotoresolutions": {
                  const ratiotoresolutionsEmbed = new MessageEmbed()
                      .setTitle("<a:animated_crown:943871318607134810> UNI Discord // Lumamatte Help <a:animated_crown:943871318607134810>")
                      .setColor("#ffffff")
                      .setDescription("> **Resolutions in 16:9:** \n\n `-` 1280x720 \n `-` 1920x1080 \n `-` 2560x1440 \n `-` 3840x2160 \n `-` 7680x4320")
                      .setTimestamp()

                  await interaction.reply({ embeds: [ratiotoresolutionsEmbed] })
                break;
                }
              case "unilogos": {
                  const logoembed = new MessageEmbed()
                      .setTitle("<a:animated_crown:943871318607134810> UNI Discord // UNI Logos <a:animated_crown:943871318607134810>")
                      .setColor("#ffffff")
                      .setDescription("> **Resources:** \n\n `-` [click here to get resources](https://drive.google.com/drive/folders/1_wtStjgu_dSh4gpZ2NrhfX-tAIdeddxk)")
                      .setImage("https://pbs.twimg.com/profile_images/1407088911395049476/qeHiiv0P_400x400.jpg")
                      .setTimestamp()
                  interaction.reply({ embeds: [logoembed]})
                break;
                }
              case "ffmpeg":
                {
                const ffmpegEmbed = new MessageEmbed()
                    .setColor("#ffffff")
                    .setTitle("<a:animated_crown:943871318607134810> UNI Discord // FFMPEG Help <a:animated_crown:943871318607134810>")
                    .setImage("https://cdn.discordapp.com/attachments/760554084443881501/806535764728217640/Installing_FFMPEG_Correctly.png")
                    .setDescription("> **Here some Help:** \n\n `-` [click to view advanced installation](https://cdn.discordapp.com/attachments/760554084443881501/806535764728217640/Installing_FFMPEG_Correctly.png) \n `-` [click to view easy installation](https://cdn.discordapp.com/attachments/760554084443881501/806541250118418492/Easier_Way_to_install_FFMPEG.png)\n\n <a:bluecross:942516557412704256> [click here to download ffmpeg](https://drive.google.com/file/d/1KO-v3A5tPsCFxQopyGfP7F_2CROWIxjF/view?usp=sharing)")
                    .setTimestamp()
                interaction.reply({ embeds: [ffmpegEmbed]})
                }
                return;
            }

        },
      };
    
