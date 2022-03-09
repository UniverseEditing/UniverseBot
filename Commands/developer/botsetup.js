const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const DB = require("../../Structures/Schemas/LogsSetupDB");
const fs = require("fs")

module.exports = {
  name: "botsetup",
  description: "Setup Bot.",
  permission: "ADMINISTRATOR",
  options: [
    {
      name: "logchannel",
      description: "Setup the server logs channel.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "channel",
          description: "Select the channel to send the server logs to.",
          required: true,
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
        },
      ],    
    },
    {
      name: "member",
      description: "Choose Member Role.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "memberrole",
          description: "Select the Member Role.",
          required: true,
          type: "ROLE",
        },
      ],    
    },
    {
      name: "appsubmits",
      description: "Create app Panel.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "channel",
          description: "Select the Channel to send panel to.",
          required: true,
          type: "CHANNEL",
        },
        {
          name: "appresults",
          description: "Select the App results Channel.",
          required: true,
          type: "CHANNEL",
        },
      ],    
    },
    {
      name: "appsresults",
      description: "Channel for app results to be send to.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "appsresultchannel",
          description: "Select the Channel for app results to be send to.",
          required: true,
          type: "CHANNEL",
        }
      ],    
    },
    {
      name: "user",
      description: "Choose User Role.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "userrole",
          description: "Select the User Role.",
          required: true,
          type: "ROLE",
        },
      ],    
    },
    {
      name: "rules",
      description: "Setup the server rules",
      type: "SUB_COMMAND",
      options: [
        {
          name: "channel",
          description: "Select the channel to send the rules to.",
          required: true,
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
        },
      ],    
    },
    {
      name: "info",
      description: "Setup the server info",
      type: "SUB_COMMAND",
      options: [
        {
          name: "infochannel",
          description: "Select the channel to send the info to.",
          required: true,
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
        },
        {
          name: "chat",
          description: "Select the chat Channel.",
          required: true,
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
        },
        {
          name: "ops",
          description: "Select the channel to send ops to.",
          required: true,
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
        },
        {
          name: "rules",
          description: "Select the Rules Channel.",
          required: true,
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
        },
        {
          name: "editinghelp",
          description: "Select the editing-help Channel.",
          required: true,
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
        },
        {
          name: "appinformation",
          description: "Select the App info Channel.",
          required: true,
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
        },
        {
          name: "appresults",
          description: "Select the App results Channel.",
          required: true,
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
        },
        {
          name: "media",
          description: "Select the Media Channel.",
          required: true,
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
        },
        {
          name: "announcements",
          description: "Select the Announcements Channel.",
          required: true,
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
        },
      ],    
    },
    {
      name: "resetlog",
      description: "Reset the log channel.",
      type: "SUB_COMMAND",
    },
  ],
  /**
   * @param {GuildMember} member
   * @param {CommandInteraction} interaction
   */ 
  async execute(interaction) {
    try {
      const options = interaction.options;
      const { guild } = interaction;

      switch (options.getSubcommand()) {
        case "appsubmits": {
          const RulesChannel = options.getChannel("channel");
          const AppResults = options.getChannel("appresults");
          const RuleEmbed = new MessageEmbed()
            .setTitle("<a:Nitro:943805407787356200> UNI DISCORD // App Submits <a:Nitro:943805407787356200>")
            .setColor("#ffffff")
            .setDescription('**FAQ** ~ *You maybe are asking your self now: "how do i create an app?"* \n\n' +
                            '> Its easy! **Create an edit** (or Design) from game // anime you want, use our Universe Editing intro in your Edit and upload it on your YouTube channel.\n' +
                            '> When you have done this, you can submit your edit **by clicking the Panel below**. \n' +
                            `> After we review your application the results will be announced in: \n> ------------------ \n> *${AppResults}*  \n\n` +
                            '`-` Pre Recs. or free clips to use are not allowed! \n' +
                            '`-` Apps must be longer than 20 Seconds not including logos to be considered! \n' +
                            '`-` You can download **Intro and Logo** files [by clicking here.](https://drive.google.com/drive/folders/1_wtStjgu_dSh4gpZ2NrhfX-tAIdeddxk?usp=sharing)\n\n' +
                            '** Have fun at Editing and Designing & good Luck to you!**\n\n')

          const appbutton = new MessageActionRow();
          appbutton.addComponents(
            new MessageButton()
              .setCustomId("editsubmit")
              .setLabel("Submit EDIT")
              .setStyle("PRIMARY")
              .setEmoji("🎥"),
            new MessageButton()
              .setCustomId("designsubmit")
              .setLabel("Submit DESIGN")
              .setStyle("PRIMARY")
              .setEmoji("✏️")
          );
          
          await guild.channels.cache
            .get(RulesChannel.id)
            .send({ embeds: [RuleEmbed], components: [appbutton]})

          interaction.reply({content: `> ♻️ Successfully setup the rules.`, ephemeral: true})
          break;
        }
        case "appsresults": {
          const appsresultchannelvar = options.getChannel("appsresultchannel");
          const appresultschannelidvar = appsresultchannelvar.id
          const appresultsjson = {
            appsresultschannel: appresultschannelidvar
          }
        
          fs.writeFileSync('./data/appresultschannel.json', JSON.stringify(appresultsjson), err =>{
            if (err) {
                console.log(err);
            } else {
                console.log("Memberrole successfully written to ./data/appreviewchannel.")
            }
          
        })
        interaction.reply({content: `> ♻️ Successfully setup the app review channel.`, ephemeral: true})
        break;
        }
        case "rules": {
          const RulesChannel = options.getChannel("channel");
          const RuleEmbed = new MessageEmbed()
            .setTitle("<a:Nitro:943805407787356200> UNI DISCORD // Discord Server Rules <a:Nitro:943805407787356200>")
            .setColor("#ffffff")
            .setDescription('`-` Respect all users on the server \n' +
                            '`-` Avoid sending spam/messages repeatedly \n' +
                            '`-` NSFW / Adult content is undesirable in any way \n' +
                            '`-` Keep languages apart from English to a minimum \n' +
                            '`-` Try not to force your opinions onto other people \n' +
                            '`-` Legally protected content may not be distributed \n\n<:discord:943808005168836609> Discord ToS: https://discord.com/terms \n<:discord:943808005168836609> Discord Guidelines: https://discord.com/guidelines \n\n' +
                            '> Please keep an eye on news, channel descriptions and generally pinned messages, as we usually set temporary rules there. \n\n' +
                            '**Any violation of the above may result in a (temporary) ban from the server without warning or further justification.**')

          const VerifyButton = new MessageActionRow();
          VerifyButton.addComponents(
            new MessageButton()
              .setCustomId("verify")
              .setLabel("Click to verify")
              .setStyle("PRIMARY")
              .setEmoji("<a:tick_green:943812963012325407>")
          );
          
          await guild.channels.cache
            .get(RulesChannel.id)
            .send({ embeds: [RuleEmbed], components: [VerifyButton]})

          interaction.reply({content: `> ♻️ Successfully setup the rules.`, ephemeral: true})
          break;
        }
        case "info": {
        const InfoChannel = options.getChannel("infochannel");
        const rules = options.getChannel("rules");
        const chat = options.getChannel("chat");
        const ops = options.getChannel("ops");
        const editinghelp = options.getChannel("editinghelp");
        const appinformation = options.getChannel("appinformation");
        const appresults = options.getChannel("appresults");
        const media = options.getChannel("media");
        const announcements = options.getChannel("announcements");

        const InfoEmbed = new MessageEmbed()
            .setTitle("<a:bluecross:942516557412704256> UNI DISCORD // Discord Server Information <a:bluecross:942516557412704256>")
            .setColor("#ffffff")
            .setDescription('**Welcome to UNIS\'s official discord server** \n' +
                            'Stay up to date, exchange ideas with the community, join it and take part in events \n\n' +
                            `> ${rules}\n> By interacting on this server you accept our rules\n\n` +
                            `> ${InfoChannel}\n> Information about this server\n\n` +
                            `> ${announcements}\n> Stay up to date\n\n` +
                            `> ${chat}\n> Write with other users\n\n` +
                            `> ${ops}\n> Channel used for posting your edits you wanna share with us, or get ops on\n\n` +
                            `> ${media}\n> Channel used for posting normal videos, tutorials, photos, art or music\n\n` +
                            `> ${editinghelp}\n> If you have a problem with editing or want tips with your editing program, you can use this channel to ask for help!\n\n` +
                            `> ${appinformation}\n> Instructions for submitting an app\n\n` +
                            `> ${appresults}\n> Results of the apps will be announced here\n\n` +
                            '> **Create your own text and voice channel where you can talk publicly or privately. To do this, enter the lowest language channel.**\n\n' +
                            'If you have any questions or problems, open a ticket in the ticket channel. ')

        interaction.reply({content: `> ♻️ Successfully setup the infochannel.`, ephemeral: true})

        await guild.channels.cache
        .get(InfoChannel.id)
        .send({ embeds: [InfoEmbed]})
        break;
        }
        case "member": {
          const MemberRole = options.getRole("memberrole");
          const memberstr = {
            memberrole: MemberRole.id
          }
        
          fs.writeFileSync('./data/memberrole.json', JSON.stringify(memberstr), err =>{
            if (err) {
                console.log(err);
            } else {
                console.log("Memberrole successfully written to ./data/Memberrole.")
            }
          
        })
        interaction.reply({content: `> ♻️ Successfully setup the memberrole.`, ephemeral: true})
        break;
        
        }
        
        case "user": {
          const UserRole = options.getRole("userrole");
          const userstr = {
            userrole: UserRole.id
          }
        
          fs.writeFileSync('./data/userrole.json', JSON.stringify(userstr), err =>{
            if (err) {
                console.log(err);
            } else {
                console.log("Userrolle successfully written to ./data/Userrole.")
            }
          
        })
        interaction.reply({content: `> ♻️ Successfully setup the userrole.`, ephemeral: true})
        break;
        }
        case "logchannel":
          {
            const LogsChannel = options.getChannel("channel");
            const logstr = {
              logs: LogsChannel.id
            }
          
            fs.writeFileSync('./data/logchannel.json', JSON.stringify(logstr))
            
            await DB.findOneAndUpdate(
              { GuildID: guild.id },
              {
                LogsChannel: LogsChannel.id,
              },
              {
                new: true,
                upsert: true,
              }
            ).catch((err) => console.log(err));

            const LogsSetup = new MessageEmbed()
              .setDescription(
                "♻️ // Successfully setup the server logs"
              )
              .setColor("#43b581");

            await guild.channels.cache
              .get(LogsChannel.id)
              .send({ embeds: [LogsSetup] })
              .then((m) => {
                setTimeout(() => {
                  m.delete().catch(() => {});
                }, 1 * 7500);
              });

            await interaction.reply({
              content: "> ❗️ Log channel set.",
              ephemeral: true,
            });
          }

          
          break;
        case "resetlog":
          {
            const LogsReset = new MessageEmbed()
              .setDescription(
                "♻️ // Successfully resetted the server logs"
              )
              .setColor("#43b581");
            DB.deleteMany({ GuildID: guild.id }, async (err, data) => {
              if (err) throw err;
              if (!data)
                return interaction.reply({
                  content: "> ❗️ There is no data to delete",
                });
              interaction.reply({ embeds: [LogsReset] });
            });
          }
          return;
      }
    } catch (e) {
      const errorEmbed = new MessageEmbed()
        .setColor("#f04947")
        .setDescription(`> ❗️ Error: ${e}`);
      return interaction.reply({
        embeds: [errorEmbed],
        ephemeral: false,
      });
    }
  },
};