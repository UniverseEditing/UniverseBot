const { CommandInteraction, MessageEmbed, Invite } = require("discord.js");

module.exports = {
    name: "voice",
    description: "Control your own Voice Channel.",
    options: [
        {
            name: "invite",
            type: "SUB_COMMAND",
            description: "Invite a friend to your channel.",
            options: [
                {
                    name: "member",
                    type: "USER",
                    required: true,
                    description: "Select the Member."
                }
            ]
        },
        {
            name: "disallow",
            type: "SUB_COMMAND",
            description: "Remove someone's acces to the channel.",
            options: [
                {
                    name: "member",
                    type: "USER",
                    required: true,
                    description: "Select the Member."
                }
            ]
        },
        {
            name: "name",
            type: "SUB_COMMAND",
            description: "Change the name of your channel.",
            options: [
                {
                    name: "text",
                    type: "STRING",
                    required: true,
                    description: "Provide the name."
                }
            ]
        },
        {
            name: "public",
            type: "SUB_COMMAND",
            description: "Make your channel public.",
            options: [
                {
                    name: "turn",
                    type: "STRING",
                    required: true,
                    description: "Turn on or off.",
                    choices: [
                        { name: "on", value: "on" },
                        { name: "off", value: "off" },
                    ]
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {*} client 
     */
    async execute(interaction, client) {
        const { options, member, guild } = interaction;

        const subCommand = options.getSubcommand();
        const voiceChannel = member.voice.channel;
        const Embed = new MessageEmbed().setColor("#ffffff");
        const ownedChannel = client.voiceGenerator.get(member.id);

        if (!voiceChannel)
            return interaction.reply({ embeds: [Embed.setDescription("> ⭕️ You're not in a Voicechannel.").setColor("#ffffff")], ephemeral: true });

        if (!ownedChannel || voiceChannel.id !== ownedChannel)
            return interaction.reply({ embeds: [Embed.setDescription("> ⭕️ You do not own this, or any channel.").setColor("#ffffff")], ephemeral: true });

        switch (subCommand) {
            case "name": {
                const newName = options.getString("text");
                if (newName.length > 19 || newName.length < 1)
                    return interaction.reply({ embeds: [Embed.setDescription("> ⭕️ Name cannot exceed the 19 character limit.").setColor("#ffffff")], ephemeral: true });

                voiceChannel.edit({ name: `┊🌱﹒${newName}` })
                interaction.reply({ embeds: [Embed.setDescription("> ♻️ Channel name has been set.").setColor("#ffffff")], ephemeral: true });
            }
                break;
            case "invite": {
                try {
                    const targetMember = options.getMember("member");
                    voiceChannel.permissionOverwrites.edit(targetMember, { CONNECT: true });

                    targetMember.send({ embeds: [Embed.setDescription(`> ♻️ ${member} has invited you to <#${voiceChannel.id}>`).setColor("#ffffff")] });
                    interaction.reply({ embeds: [Embed.setDescription(`> ♻️ ${targetMember} has been invited.`).setColor("#ffffff")], ephemeral: true });
                } catch { }
            }
                break;
            case "disallow": {
                const targetMember = options.getMember("member");
                voiceChannel.permissionOverwrites.edit(targetMember, { CONNECT: false });

                if (targetMember.voice.channel && targetMember.voice.channel.id == voiceChannel.id) targetMember.voice.setChannel(null);
                interaction.reply({ embeds: [Embed.setDescription(`> ⭕️ ${targetMember} has been removed from this channel.`).setColor("#ffffff")], ephemeral: true });
            }
                break;
            case "public": {
                const turnChoice = options.getString("turn");
                switch (turnChoice) {
                    case "on": {
                        voiceChannel.permissionOverwrites.edit(guild.id, { CONNECT: null });
                        interaction.reply({ embeds: [Embed.setDescription(`> 🔓 The Channel is now public.`).setColor("#ffffff")], ephemeral: true });
                    }
                        break;
                    case "off": {
                        interaction.reply({ embeds: [Embed.setDescription(`> 🔐 The Channel is now closed.`).setColor("#ffffff")], ephemeral: true });
                        voiceChannel.permissionOverwrites.edit(guild.id, { CONNECT: false });
                    }
                        break;
                }
            }
                break;
        }
    }
}