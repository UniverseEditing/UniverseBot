const { CommandInteraction, Client, MessageAttachment } = require("discord.js");
const Levels = require("discord-xp");
const canvacord = require('canvacord');

module.exports = {
    name: 'rank',
    description: 'Get the rank of a user.',
    options: [
        {
            name: 'target',
            description: 'Mention a user to see their rank.',
            type: "USER",
            required: false
      }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const Target = interaction.options.getMember("target") || interaction.member;
        const users = await Levels.fetch(Target.id, interaction.guildId);
        
        if(!users) return interaction.reply({content: "The mentioned user has no XP."})

        const neededXp = Levels.xpFor(parseInt(users.level) + 1);

        const rank = new canvacord.Rank()
        .setAvatar(Target.displayAvatarURL({format: 'png', size: 512}))
        .setCurrentXP(users.xp) 
        .setRequiredXP(neededXp)
        .setLevel(users.level)
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(Target.user.username)
        .setDiscriminator(Target.user.discriminator);
        rank.setBackground(
            'IMAGE',
            `https://cdn.discordapp.com/attachments/942507882094686330/945706816543805490/Card.png`
          );
    
    rank.build()
        .then(data => {
        const attachment = new MessageAttachment(data, "RankCard.png");
        interaction.reply({files: [attachment]});
    });
    }
}