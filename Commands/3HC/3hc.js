const { Console } = require("console");
const { CommandInteraction, Client, MessageEmbed, Guild } = require("discord.js");
const fs = require("fs");
const Hcsubmit = require("./3hcsubmit");

module.exports = {
    name: '3hc',
    description: 'Start 3hc.',
    permission: "ADMINISTRATOR",
    options: [
        {
            name: 'clips',
            description: 'Clip sources link.',
            type: 'STRING',
            required: true
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const cliplink = interaction.options.getString('clips') || 'No reason'
        if (cliplink.includes("https://")) {
            const Embed = new MessageEmbed()
            const replymessage = interaction.reply({ embeds: [Embed.setDescription(`> ♻️ 3HC successfully created!`).setColor("#ffffff")], ephemeral: true });

            //Creating Channels
            const HCcategory = await interaction.guild.channels.create("ෆ ・꒰📌﹕UNI // 3HCꜝ ˚", { type: "GUILD_CATEGORY", position: 3 });
            const InformationChannel = await interaction.guild.channels.create(`╭🎀﹒120ᵐˡⁿ remaining`, {
                type: "GUILD_TEXT",
                parent: HCcategory,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    deny: ['SEND_MESSAGES'],
                }]
            });
            const HCChannel = await interaction.guild.channels.create(`┊📮﹒3HC-information`, {
                type: "GUILD_TEXT",
                parent: HCcategory,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    deny: ['SEND_MESSAGES'],
                }]
            });
            const SubmitChannel = await interaction.guild.channels.create(`╰📮﹒3HC-submit`, {
                type: "GUILD_TEXT",
                parent: HCcategory,
            });

            const remainingembed = new MessageEmbed()
                .setTitle("<a:bluecross:942516557412704256> 3HC // REMAINING TIME <a:bluecross:942516557412704256>")
                .setDescription("-----------------")
                .setColor("#ffffff")
                .setFooter("3HC running since: ")
                .setTimestamp()
            InformationChannel.send({ embeds: [remainingembed] })

            const infoembed = new MessageEmbed()
                .setTitle("<a:bluecross:942516557412704256> 3HC // INFORMATION <a:bluecross:942516557412704256>")
                .setColor("#ffffff")
                .setDescription('**HC submission rules:** \n' +
                    '`-` You must have some kind of mention of our name in the edit, so add ”Home of HC’s” in the intro or outro. Or alternatively just use our promo video. \n' +
                    '`-` Each submission has to be longer than 5 seconds. \n' +
                    '`-` You must have our discord invite to this server in the description of your submission. \n' +
                    '`-` Your discord @ must be in the description of the video for identification purposes. \n' +
                    '`-` Keep to the specified rules of the weeks HC.\n' +
                    `\`-\` You must use the clips provided! (${cliplink})\n\n` +
                    '**Dual HC rules:** \n' +
                    '`-` Both editors must edit (obviously), the one who edits the least must still edit at least 15% of the edit. \n' +
                    '`-` Each submission must have at least 5 seconds from each editor. \n' +
                    '`-` Both editors must have their discord # in the description for identification purposes.  \n' +
                    '`-` Try to include timestamps to show who edited which part. \n\n' +
                    `> **SUBMIT YOUR CLIP WITH \`/submit\` in ${SubmitChannel}**. \n\n` +
                    '> **Logo Intro:** https://drive.google.com/file/d/1NtlWQAbMjVyDkB9NOZVUmp1OJ0AgY9Pg/view \n' +
                    `> **Provided Clips:** ${cliplink} \n\n`)

                .setTimestamp()
            HCChannel.send({ embeds: [infoembed] })

            const submitembed = new MessageEmbed()
                .setTitle("<a:bluecross:942516557412704256> 3HC // SUBMITS <a:bluecross:942516557412704256>")
                .setColor("#ffffff")
                .setDescription(`> Use \`/3hcsubmit\` to submit your edit. Read Information in $${HCChannel} first.`)
                .setTimestamp()
            SubmitChannel.send({ embeds: [submitembed] })

            const datajson = {
                category: HCcategory.id,
                hcchannel: HCChannel.id,
                submitchannel: SubmitChannel.id,
                infochannel: InformationChannel.id
            }


            fs.writeFileSync(`./data/3hc/3hcdata.json`, JSON.stringify(datajson), err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("3hc started.")
                }

            })

            fs.writeFileSync(`./data/3hc/running.json`, JSON.stringify("running: online"), err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("3hc started.")
                }

            })

            var timer = 120
            let i = 1
            await sleep(i * 1000);
            for (let i = 1; i < 120; i++) {
                timer = timer - 5;
                InformationChannel.edit({ name: `╭🎀﹒${timer}ᵐˡⁿ remaining` })
                await sleep(i * 300000);
                if (timer < 5) {
                    break;
                }
            }

            fs.unlink(`./data/3hc/running.json`, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("File removed!");
                }
            });

            HCChannel.delete();
            SubmitChannel.delete();
            InformationChannel.delete();

            const HCreview = await interaction.guild.channels.create(`┊📮﹒3HC-review`, {
                type: "GUILD_TEXT",
                parent: HCcategory,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL'],
                }]

            });

            const datareviewjson = {
                category: HCcategory.id,
                review: HCreview.id
            }


            fs.writeFileSync(`./data/3hc/3hcdata.json`, JSON.stringify(datareviewjson), err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("3hc started.")
                }

            })

            var path = "./data/3hc/submits"
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
            var count = 0
            files.forEach((filename) => {
                count = +count + 1
                console.log(filename)
                var { submitlink } = require(`../../data/3hc/submits/${filename}`)
                const submittionuservar = filename.substr(0, 18)
                const membername = client.users.cache.find(user => user.id === submittionuservar)
                const submitembed = new MessageEmbed()
                    .setTitle(`<a:bluecross:942516557412704256> 3HC // REVIEW #${count} <a:bluecross:942516557412704256>`)
                    .setColor("#ffffff")
                    .setDescription(`> Submit by: ${membername}\n\n Edit's Link: ${submitlink}`)
                    .setTimestamp()
                HCreview.send({ embeds: [submitembed] })

            })
        } else {
            const Embed = new MessageEmbed()
            interaction.reply({ embeds: [Embed.setDescription(`> ⭕️ Please enter a valid Link!`).setColor("#ffffff")], ephemeral: true });

        }
    }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}