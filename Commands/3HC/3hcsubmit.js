const { CommandInteraction, MessageEmbed, MessageAttachment, Client } = require('discord.js');
const fs = require("fs")
const { CaptchaGenerator } = require("captcha-canvas");

module.exports = {
    name: '3hcsubmit',
    description: "Submit your 3HC edit.",
    options: [
        {
            name: "editlink",
            description: "Mention your edit's link.",
            type: 'STRING',
            required: true
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const Link = interaction.options.getString('editlink') || 'No reason'
        try {
            const { submitchannel } = require("../../data/3hc/3hcdata.json")
            if (!Link.includes("https://")) {
                const Embed = new MessageEmbed()
                interaction.reply({ embeds: [Embed.setDescription(`> ⭕️ Please use a valid link!`).setColor("#ffffff")], ephemeral: true });
            } else {
                if (submitchannel == interaction.channelId) {

                    const captcha = new CaptchaGenerator()
                        .setDimension(150, 400)
                        .setCaptcha({ font: "Sans", size: 60, color: "#ffc733" })
                        .setDecoy({ opacity: 0.5 })
                        .setTrace({ color: "#ffc733" });

                    const captchaAttachment = new MessageAttachment(

                        await captcha.generate(),
                        "captcha.png"
                    );

                    const captchaEmbed = new MessageEmbed()

                        .setAuthor({ name: `Solve the capatcha to submit!`, iconURL: `${interaction.guild.iconURL({ dynamic: true, size: 512 })}` })

                        .setDescription(
                            `${interaction.user}, \`please solve this capatcha to submit your edit in order to prevent the submittions from Spam!\`\n\n` +
                            "__**Additional Notes:**__\n\n" +
                            "> Type out the traced colored characters from left to right.\n" +
                            "> Ignore the decoy characters spread-around.")
                        .setImage("attachment://captcha.png")
                        .setColor('#ffffff')
                        .setFooter({ text: 'Verification Period: 3 minutes' });

                    const msg = await interaction.reply({
                        files: [captchaAttachment],
                        embeds: [captchaEmbed],
                        ephemeral: true
                    });
                    const filter = (message) => {
                        if (message.author.id !== interaction.member.id) return;
                        if (message.content === captcha.text) return true;
                        else {
                            interaction.member.send({content: "> ⭕️ Wrong Captcha"});
                            interaction.channel.messages.fetch({
                                limit: 10
                            }).then((messages) => { 
                                const botMessages = [];
                                messages.filter(m => m.author.id === interaction.member.id).forEach(msg => botMessages.push(msg))
                                interaction.channel.bulkDelete(botMessages)
                            })
                        }
                    };

                    try {
                        const response = await interaction.channel.awaitMessages({
                            filter,
                            max: 1,
                            time: 180000,
                            errors: ["time"],
                        });

                        if (response) {
                            const Embed = new MessageEmbed()
                            interaction.member.send({ embeds: [Embed.setDescription(`> ♻️ Your Edit was sucessfully submitted / updated!`).setColor("#ffffff")]});
                            interaction.channel.messages.fetch({
                                limit: 10
                            }).then((messages) => { 
                                const botMessages = [];
                                messages.filter(m => m.author.id === interaction.member.id).forEach(msg => botMessages.push(msg))
                                interaction.channel.bulkDelete(botMessages)
                            })
                        }
                    } catch (err) {
                        const Embed = new MessageEmbed()
                        interaction.member.send({ embeds: [Embed.setDescription(`> ⭕️ You failed to solve the capatcha!`).setColor("#ffffff")]});
                        interaction.channel.messages.fetch({
                            limit: 10
                        }).then((messages) => { 
                            const botMessages = [];
                            messages.filter(m => m.author.id === interaction.member.id).forEach(msg => botMessages.push(msg))
                            interaction.channel.bulkDelete(botMessages)
                        })
                    }

                    const datajson = {
                        userid: interaction.member.id,
                        submitlink: Link
                    }

                    fs.writeFileSync(`./data/3hc/submits/${interaction.member.id}.json`, JSON.stringify(datajson), err => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Link submitted.")
                        }

                    })
                } else {
                    const Embed = new MessageEmbed()
                    interaction.reply({ embeds: [Embed.setDescription(`> ⭕️ Only use that command in the 3HC Submit Channel!`).setColor("#ffffff")], ephemeral: true });
                }
            }
        } catch {
            const Embed = new MessageEmbed()
            interaction.reply({ embeds: [Embed.setDescription(`> ⭕️ There's no HC currently running!`).setColor("#ffffff")], ephemeral: true });
        }
    }
}