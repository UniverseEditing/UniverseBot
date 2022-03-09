const { CommandInteraction, MessageEmbed, Client, Message } = require('discord.js');
const fs = require('fs')

module.exports = {
    name: 'update',
    description: 'Update your YouTube Profile.',
    options: [
        {
            name: 'link',
            description: 'Channel Link.',
            type: 'STRING',
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Message} message 
     * @param {Client} client 
     */
    async execute(interaction, message, client) {
        const youtubelink = interaction.options.getString('link') || 'No Link';

        if (!youtubelink.includes("https://")) {
            interaction.reply({content: "> ❌ Please use only valid links", ephemeral: true })
        } else {
            var fs = require('fs')
            var path = "./data/youtube/"
            var files = []

            var getFiles = function (path, files) {
                fs.readdirSync(path).forEach(function (file) {
                    var subpath = path + '/' + file;
                    if (fs.lstatSync(subpath).isDirectory()) {
                        getFiles(subpath, files);
                    } else {
                        files.push(file);
                    }
                });
            }

            getFiles(path, files)
            var stringfiles = files.toString()

            if (stringfiles.includes(interaction.member.id)) {
                const storejson = {
                    link: youtubelink,
                }
                interaction.reply({ content: "> ♻️ Your YouTube channel has been updated.", ephemeral: true })

                fs.writeFileSync(`./data/youtube/${interaction.member.id}.json`, JSON.stringify(storejson), err => {
                    if (err) {
                        console.log(err);
                    } else {
                        interaction.reply({ content: "> ♻️ Your YouTube channel has been updated.", ephemeral: true })
                    }
                })
            } else {
                interaction.reply({ content: "> ❌ Theres no Link to update. Add your YouTube link with \`/youtube\`", ephemeral: true })
            }
        }


    }
}