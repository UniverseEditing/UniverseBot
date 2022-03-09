const { CommandInteraction, MessageEmbed } = require('discord.js')
const DB = require('../../Structures/Schemas/ThankSystemDB.js')
const SetupDB = require('../../Structures/Schemas/ThankSetupDB.js')
const Levels = require("discord-xp");

module.exports = {
    name: 'thanks',
    description: 'Thank A User.',
    cooldown: 3000,
    options: [
        {
            name: "user",
            description: "Whom to thank.",
            required: true,
            type: "USER"
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options, user, guild, channel } = interaction;
        const Target = options.getUser("user")
        const Embed = new MessageEmbed()

        if (Target.id === user.id)
            return interaction.reply({ embeds: [Embed.setColor("#ffffff").setDescription("> ❗️ You Cannot Thank Yourself")] })

        DB.findOne({ GuildID: guild.id, MemberID: Target.id }, async (err, data) => {
            SetupDB.findOne({ GuildID: guild.id }, async (err, docs) => {
                if (err) throw err
                if (!data) data = await DB.create({ GuildID: guild.id, MemberID: Target.id, Thanks: 0, ChannelID: channel.id, UserID: user.id })
                if (!docs) return interaction.reply({ embeds: [Embed.setDescription("> ❗️ SetUp the Thank Logs First \`/thank-setup\`").setColor("#ffffff")] })

                const LogEmbed = docs.ChannelID
                const EMbed = new MessageEmbed()
                    .setDescription(`> 🌟 <@${interaction.user.id}> Just Thanked <@${data.MemberID}>`)
                    .setColor("#ffffff")
                    .setTimestamp()
                await guild.channels.cache.get(LogEmbed).send({ embeds: [EMbed] })

                data.Thanks += 1
                data.save();
                const xp = Math.random() * (50 - 10) + 10;
                Embed.setColor("#ffffff")
                    .setTitle("<a:animated_crown:943871318607134810> UNI Discord // Thanked a User! <a:animated_crown:943871318607134810>")
                    .setDescription(`---\n> 🌟 <@${data.MemberID}> has now **${data.Thanks}** thank(s) **and recieved ${Math.round(xp)} XP!**\n\n**Thanked By <@${data.UserID}>** `)
                    .setTimestamp()
                const message = await interaction.reply({ embeds: [Embed], fetchReply: true })
                message.react("🌟")
                const hasLeveledUp = await Levels.appendXp(Target.id, interaction.guild.id, xp)
                console.log(xp)
                console.log(Target)
                if(hasLeveledUp) {
                  const user = await Levels.fetch(Target.id, interaction.guild.id);
                  interaction.channel.send(`> :tada: ${Target}, congratulations! You have leveled up to **${user.level}**.`)
                }
                
            })

        })
    }
}