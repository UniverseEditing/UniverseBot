const { model, Schema } = require('mongoose');

module.exports = model("ThankSetupDB", new Schema({
    GuildID: String,
    ChannelID: String
}))