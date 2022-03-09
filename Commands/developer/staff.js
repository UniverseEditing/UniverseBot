const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
var multiplyer = "100";

const Config = {
    "GuildID": "942507879682965507"
}

module.exports = {
    name: "stafflist",
    description: "Sends / updates the staff list automaticly.",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: 'channel',
            description: 'Select the Channel.',
            type: "CHANNEL",
            required: true
        },
        {
            name: 'team',
            description: 'Select the Teamrole.',
            type: "ROLE",
            required: true
        },
        {
            name: 'member',
            description: 'Select the Memberrole.',
            type: "ROLE",
            required: true
        },
        {
            name: 'trial',
            description: 'Select the Trialrole.',
            type: "ROLE",
            required: true
        },
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const options = interaction.options

        const cahnneltosend = options.getChannel("channel");
        const teamrolevar = options.getRole("team");
        const memberrolevar = options.getRole("member");
        const trialrolevar = options.getRole("trial");



        const List = new MessageEmbed()
            .setColor('#ffffff')
            .setTitle('<a:bluecross:942516557412704256> UNIVERSE EDITING // Staff list <a:bluecross:942516557412704256>')
            .setDescription("Please wait... Staff list is creating...")
            .setThumbnail(`${interaction.guild.iconURL({ size: 512, dynamic: true })}`)
            .setTimestamp()


        const reply = await interaction.guild.channels.cache.get(cahnneltosend.id).send({ embeds: [List] })

        const newList = new MessageEmbed()
                .setColor('#ffffff')
                .setTitle('<a:bluecross:942516557412704256> UNIVERSE EDITING // Staff list <a:bluecross:942516557412704256>')
                .setTimestamp()
            newList.addFields(
                { name: `----------------------`, value: `*Team* ↴`, inline: false },
            )
            reply.edit({ embeds: [newList] })

            const teamlist = teamrolevar.members.map(m => `${m.user}`)
            teamlist.forEach((staff) => {
                const fs = require('fs')
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
                const staffmemberid = staff.substr(2, 18)
                const membername = client.users.cache.find(user => user.id === staffmemberid)
                if (stringfiles.includes(staffmemberid)) {
                    const { link } = require(`../../data/youtube/${staffmemberid}.json`)
                    newList.addFields(
                        { name: `<a:Nitro:943805407787356200> Team / ${membername.username}`, value: `> ${link}`, inline: false },
                    )
                    reply.edit({ embeds: [newList] })
                } else {
                    newList.addFields(
                        { name: `<a:Nitro:943805407787356200> Team / ${membername.username}`, value: `> Add your YouTube Profile with \`/youtube\``, inline: false },
                    )
                    reply.edit({ embeds: [newList] })
                }
            });
            newList.addFields(
                { name: `----------------------`, value: `*Member* ↴`, inline: false },
            )
            reply.edit({ embeds: [newList] })
            const memberlist = memberrolevar.members.map(m => `${m.user}`)
            memberlist.forEach((staff) => {
                const fs = require('fs')
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
                const staffmemberid = staff.substr(2, 18)
                const membername = client.users.cache.find(user => user.id === staffmemberid)
                if (stringfiles.includes(staffmemberid)) {
                    const { link } = require(`../../data/youtube/${staffmemberid}.json`)
                    newList.addFields(
                        { name: `<a:Nitro:943805407787356200> Member / ${membername.username}`, value: `> ${link}`, inline: false },
                    )
                    reply.edit({ embeds: [newList] })
                } else {
                    newList.addFields(
                        { name: `<a:Nitro:943805407787356200> Member / ${membername.username}`, value: `> Add your YouTube Profile with \`/youtube\``, inline: false },
                    )
                    reply.edit({ embeds: [newList] })
                }
            });
            newList.addFields(
                { name: `----------------------`, value: `*Trails* ↴`, inline: false },
            )
            reply.edit({ embeds: [newList] })
            const triallist = trialrolevar.members.map(m => `${m.user}`)
            triallist.forEach((staff) => {
                const fs = require('fs')
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
                const staffmemberid = staff.substr(2, 18)
                const membername = client.users.cache.find(user => user.id === staffmemberid)
                if (stringfiles.includes(staffmemberid)) {
                    const { link } = require(`../../data/youtube/${staffmemberid}.json`)
                    newList.addFields(
                        { name: `<a:Nitro:943805407787356200> Trial / ${membername.username}`, value: `> ${link}`, inline: false },
                    )
                    reply.edit({ embeds: [newList] })
                } else {
                    newList.addFields(
                        { name: `<a:Nitro:943805407787356200> Trial / ${membername.username}`, value: `> Add your YouTube Profile with \`/youtube\``, inline: false },
                    )
                    reply.edit({ embeds: [newList] })
                }
            });


        setInterval(async function () {
            multiplyer = "7000";
            const newList = new MessageEmbed()
                .setColor('#ffffff')
                .setTitle('<a:bluecross:942516557412704256> UNIVERSE EDITING // Staff list <a:bluecross:942516557412704256>')
                .setTimestamp()
            newList.addFields(
                { name: `----------------------`, value: `*Team* ↴`, inline: false },
            )
            reply.edit({ embeds: [newList] })

            const teamlist = teamrolevar.members.map(m => `${m.user}`)
            teamlist.forEach((staff) => {
                const fs = require('fs')
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
                const staffmemberid = staff.substr(2, 18)
                const membername = client.users.cache.find(user => user.id === staffmemberid)
                if (stringfiles.includes(staffmemberid)) {
                    const { link } = require(`../../data/youtube/${staffmemberid}.json`)
                    newList.addFields(
                        { name: `<a:Nitro:943805407787356200> Team / ${membername.username}`, value: `> ${link}`, inline: false },
                    )
                    reply.edit({ embeds: [newList] })
                } else {
                    newList.addFields(
                        { name: `<a:Nitro:943805407787356200> Team / ${membername.username}`, value: `> Add your YouTube Profile with \`/youtube\``, inline: false },
                    )
                    reply.edit({ embeds: [newList] })
                }
            });
            newList.addFields(
                { name: `----------------------`, value: `*Member* ↴`, inline: false },
            )
            reply.edit({ embeds: [newList] })
            const memberlist = memberrolevar.members.map(m => `${m.user}`)
            memberlist.forEach((staff) => {
                const fs = require('fs')
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
                const staffmemberid = staff.substr(2, 18)
                const membername = client.users.cache.find(user => user.id === staffmemberid)
                if (stringfiles.includes(staffmemberid)) {
                    const { link } = require(`../../data/youtube/${staffmemberid}.json`)
                    newList.addFields(
                        { name: `<a:Nitro:943805407787356200> Member / ${membername.username}`, value: `> ${link}`, inline: false },
                    )
                    reply.edit({ embeds: [newList] })
                } else {
                    newList.addFields(
                        { name: `<a:Nitro:943805407787356200> Member / ${membername.username}`, value: `> Add your YouTube Profile with \`/youtube\``, inline: false },
                    )
                    reply.edit({ embeds: [newList] })
                }
            });
            newList.addFields(
                { name: `----------------------`, value: `*Trials* ↴`, inline: false },
            )
            reply.edit({ embeds: [newList] })
            const triallist = trialrolevar.members.map(m => `${m.user}`)
            triallist.forEach((staff) => {
                const fs = require('fs')
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
                const staffmemberid = staff.substr(2, 18)
                const membername = client.users.cache.find(user => user.id === staffmemberid)
                if (stringfiles.includes(staffmemberid)) {
                    const { link } = require(`../../data/youtube/${staffmemberid}.json`)
                    newList.addFields(
                        { name: `<a:Nitro:943805407787356200> Trial / ${membername.username}`, value: `> ${link}`, inline: false },
                    )
                    reply.edit({ embeds: [newList] })
                } else {
                    newList.addFields(
                        { name: `<a:Nitro:943805407787356200> Trial / ${membername.username}`, value: `> Add your YouTube Profile with \`/youtube\``, inline: false },
                    )
                    reply.edit({ embeds: [newList] })
                }
            });

        }, 10 * 5000)
    }
}