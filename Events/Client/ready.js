const { Client } = require("discord.js")
const mongoose = require("mongoose");
const { Database } = require("../../config.json")

module.exports = {
  name: "ready", 
  once: "true",
  /**
  * @param {Client} client
  */
  
  execute(client) {
    console.log("Client is now ready.")
    client.user.setActivity("UNI DISCORD", {type: "PLAYING"})
    
    if(!Database) return;
    mongoose.connect(Database, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log("Client connected to database.")
    }).catch((err) => {
      console.log(err)
    });
  }
}