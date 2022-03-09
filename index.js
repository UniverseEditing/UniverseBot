const { Client, Collection, MessageEmbed } = require("discord.js");
const { Token } = require("./config.json");
const { Database } = require("./config.json");
const { memberrole } = require("./data/memberrole.json");
const Levels = require("discord-xp");
const client = new Client({ intents: 32767 });

//Setup Music Player
const { Player } = require('discord-player');
global.player = new Player(client);

//Setup Discord-Together
const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);

//Setup VoiceGen
client.voiceGenerator = new Collection();

Levels.setURL(Database);
client.commands = new Collection()

module.exports = client;

client.on('guildMemberAdd', (guildMember) => {
  let role = interaction.guild.roles.cache.find(r => r.id === memberrole);
  guildMember.roles.add(role);
  const channelwelcome = guildMember.guild.channels.cache.get(welcome)
  var memberCount = guild.memberCount;

  //const WelcomeEmbed = new MessageEmbed()
    //.setTitle("<a:bluecross:942516557412704256> UNI Discord // New MEMBER <a:bluecross:942516557412704256>")
    //.setDescription(`> <:discord:943808005168836609> Welcome, ${guildMember} to the **Universe Editing** Community discord.\n\n\`-\` **You are Member:** ${memberCount}\n\`-\` **Enjoy your stay!**`)
    //.setThumbnail(`https://cdn.discordapp.com/avatars/${guildMember.id}/${guildMember.avatar}.png?size=256`)
    //.setColor("#ffffff")


  //channelwelcome.send({ embeds: [WelcomeEmbed] })
});


client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guildId) return;

  const xp = Math.floor(Math.random() * 7) + 1;
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guildId, xp)
  if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guildId);
    message.channel.send(`> :tada: ${message.author}, congratulations! You have leveled up to **${user.level}**.`)
  }
});

client.once("ready", () => {
  console.log("Nodemon started.")
})

require("./Handlers/Events.js")(client);
require("./Handlers/Commands.js")(client);


client.login(Token);