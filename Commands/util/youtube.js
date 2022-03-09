const { CommandInteraction, MessageEmbed, Client, Message } = require('discord.js');
const fs = require('fs')
const { member } = require("../../data/approles.json")
const { trial } = require("../../data/approles.json")

module.exports = {
    name: 'youtube',
    description: 'Add your YouTube Profile.',
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
        const guild = interaction.guildId;
        const youtubelink = interaction.options.getString('link') || 'No Link';

        if (!youtubelink.includes("https://")) {
            interaction.reply({ content: "> ❌ Please use only valid links", ephemeral: true })
        } else {
            if (interaction.member.roles.cache.has(member) || interaction.member.roles.cache.has(trial)) {

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

                if (!stringfiles.includes(interaction.member.id)) {
                    if (interaction.member.roles.cache.has(member)) {

                        const storejson = {
                            link: youtubelink,
                        }


                        fs.writeFileSync(`./data/youtube/${interaction.member.id}.json`, JSON.stringify(storejson), err => {
                            if (err) {
                                console.log(err);
                            } else {
                                interaction.reply({ content: "> ♻️ Your YouTube channel has been registered. To update your channel use \`/update\`!", ephemeral: true })
                            }

                        })



                    } else if (interaction.member.roles.cache.has(trial)) {

                        const storejson = {
                            link: youtubelink,
                        }


                        fs.writeFileSync(`./data/youtube/${interaction.member.id}.json`, JSON.stringify(storejson), err => {
                            if (err) {
                                console.log(err);
                            } else {
                                interaction.reply({ content: "> ♻️ Your YouTube channel has been registered. To update your channel use \`/update\`!", ephemeral: true })
                            }

                        })

                    }

                } else {
                    interaction.reply({ content: "> ♻️ Your YouTube channel has already been registered. To update your channel use \`/update\`!", ephemeral: true })
                }

            }

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

            if (!stringfiles.includes(interaction.member.id)) {
                if (interaction.member.permissions.has('ADMINISTRATOR') || interaction.member.permissions.has('MANAGE_MESSAGES')) {

                    const storejson = {
                        link: youtubelink,
                    }

                    fs.writeFileSync(`./data/youtube/${interaction.member.id}.json`, JSON.stringify(storejson), err => {
                        if (err) {
                            console.log(err);
                        } else {
                            interaction.reply({ content: "> ♻️ Your YouTube channel has been registered. To update your channel use \`/update\`!", ephemeral: true })
                        }

                    })


                } else {
                    interaction.reply({ content: "> ❌ You have no Permission to use this command!", ephemeral: true })

                }
            } else {
                interaction.reply({ content: "> ♻️ Your YouTube channel has already been registered. To update your channel use \`/update\`!", ephemeral: true })
            }
        }


    }
}