const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require('path');
const fsExtra = require('fs-extra')

module.exports = {
    name: '3hcend',
    description: 'End the 3hc.',
    permission: "ADMINISTRATOR",
    options: [
        {
            name: 'resultschannel',
            description: 'Select the Channel to send results to.',
            type: 'CHANNEL',
            required: true
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        try {
            const { category, review } = require("../../data/3hc/3hcdata.json")
            if (review == interaction.channelId) {
                const resultsch = interaction.options.getChannel('resultschannel') || 'No channel'
                const Embed = new MessageEmbed()

                var path = "./data/3hc/points"
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
                console.log(files)
                let pointsarray = ['0'];
                files.forEach((filename) => {
                    point = filename.substr(0, 17)
                    pointsarray.push(point);
                })

                var scoreByPattern = pointsarray;
                var maxPoints = new Array();
                var numberone = []
                var numbertwo = []
                var numberthree = []

                findLargest3();

                function findLargest3() {
                    scoreByPattern.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);

                    numberone = scoreByPattern[0]
                    numbertwo = scoreByPattern[1]
                    numberthree = scoreByPattern[2]

                }
                try {
                    var { userid } = require(`../../data/3hc/points/${numberone}.json`)
                    const firstplace = client.users.cache.find(user => user.id === userid)
                    var Embedss = new MessageEmbed()
                    try {
                        firstplace.send({ embeds: [Embedss.setDescription(`> 🥇 You won the UNIVERSE 3HC, congratulations!`).setColor("#ffffff")] });
                    } catch {
                        console.log("I cant DM that User")
                    }

                    var { userid } = require(`../../data/3hc/points/${numbertwo}.json`)
                    const secondplace = client.users.cache.find(user => user.id === userid)
                    var Embedss = new MessageEmbed()
                    try {
                        secondplace.send({ embeds: [Embedss.setDescription(`> 🥈 You recieved the 2nd place of HC, congratulations!`).setColor("#ffffff")] });
                    } catch {
                        console.log("I cant DM that User")
                    }

                    var { userid } = require(`../../data/3hc/points/${numberthree}.json`)
                    const thirdplace = client.users.cache.find(user => user.id === userid)
                    var Embedss = new MessageEmbed()
                    try {
                        thirdplace.send({ embeds: [Embedss.setDescription(`> 🥉 You recieved the 3rd place of HC, congratulations!`).setColor("#ffffff")] });
                    } catch {
                        console.log("I cant DM that User")
                    }

                    const resultsembed = new MessageEmbed()
                        .setTitle(`<a:bluecross:942516557412704256> UNIVERSE 3HC // RESULTS <a:bluecross:942516557412704256>`)
                        .setColor("#ffffff")
                        .setDescription(`\n--------------------------------\n\n> 🥇 **FIRST PLACE:** ${firstplace}\n\`-\` You recieved **${Math.round(numberone)}** Points! \n\n> 🥈 **SECOND PLACE:** ${secondplace}\n\`-\` You recieved **${Math.round(numbertwo)}** Points! \n\n> 🥉 **THIRD PLACE:** ${thirdplace}\n\`-\` You recieved **${Math.round(numberthree)}** Points! \n\n**Congratulations winning the UNI 3HC!**`)
                        .setTimestamp()
                    resultsch.send({ embeds: [resultsembed] })

                    fs.unlink(`./data/3hc/3hcdata.json`, function (err) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("File removed:");
                        }
                    });

                    fsExtra.emptyDirSync("./data/3hc/points")
                    fsExtra.emptyDirSync("./data/3hc/submits")

                    client.channels.fetch(review)
                        .then(channel => channel.delete());

                    client.channels.fetch(category)
                        .then(channel => channel.delete());
                } catch {
                    fs.unlink(`./data/3hc/3hcdata.json`, function (err) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("File removed:");
                        }
                    });

                    fsExtra.emptyDirSync("./data/3hc/points")
                    fsExtra.emptyDirSync("./data/3hc/submits")

                    client.channels.fetch(review)
                        .then(channel => channel.delete());

                    client.channels.fetch(category)
                        .then(channel => channel.delete());
                }

            } else {
                const Embed = new MessageEmbed()
                interaction.reply({ embeds: [Embed.setDescription(`> ⭕️ Only use that command in the 3HC review Channel!`).setColor("#ffffff")], ephemeral: true });
            }
        } catch {
            const Embed = new MessageEmbed()

            interaction.reply({ embeds: [Embed.setDescription(`> ⭕️ There's no HC currently running!`).setColor("#ffffff")], ephemeral: true });
        }
    }

};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}