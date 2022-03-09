const { MessageEmbed } = require('discord.js');
const {
    blacklistedWords,
} = require('../../Validation/BlacklistWords.js');

module.exports = {
    name: 'messageCreate',

    async execute(message) {
        if (!message.guild) return;
        if (message.author.bot) return;
        const member = await message.guild.members.fetch(message.author.id);
        if (member.permissions.has('ADMINISTRATOR')) return;    // THIS LINE DISABLES THE FILTER FOR ADMINS, REMOVE OR COMMENT IT OUT TO MAKE IT WORK FOR ADMINS
    
        let check = false;
        const words = [];
        const checkWords = message.content.split(' ');

        for (let checkIndex = 0; checkIndex < checkWords.length; checkIndex++) {
            const checkWord = checkWords[checkIndex];
            
            for (let blacklistIndex = 0; blacklistIndex < blacklistedWords.length; blacklistIndex++) {
                const blacklistedWord = blacklistedWords[blacklistIndex];
                
                if (checkWord === blacklistedWord) {
                    words.push(`${checkWord}`);
                    check = true;
                }
            }
        }

        if (check) {
            message.delete();
            const msg = await message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle('⚠ WARNING ⚠')
                        .setDescription(`${message.author}, your message was removed.`)
                        .addFields(
                            {name: "Reason:", value: `\`\`\`Blacklisted Word(s)\`\`\``},
                            {name: "Word(s)", value: `\`\`\`${words.join(", ")}\`\`\``}
                        )
                ],
                fetchReply: true })
            
            setTimeout(() => {
                msg.delete().catch(err => {
                    // Do nothing
                    })
                }, 3000)
            }
                
        
    },
};