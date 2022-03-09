const { model, Schema } = require('mongoose');

module.exports = model("ThankDB", new Schema({
    GuildID: String,
    MemberID: String,
    Thanks: Number,
    UserID: String, //The One Who Thanks @user
}))

