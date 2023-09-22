const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const config = require("../config/default");

mongoose.connect(config.info.db.address).then(() => console.log("conect"));

const bookstoreschema = new mongoose.Schema({
    address: { type: String, lowercase: true },
    type: { type: String },
});
bookstoreschema.plugin(timestamp);

const User = mongoose.model("book", bookstoreschema);
