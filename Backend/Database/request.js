const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const config = require("../config/default");

mongoose.connect(config.info.db.address).then(() => console.log("conect"));

const bookstoreschema = new mongoose.Schema({
  bookname: String,
  description: String,
});
bookstoreschema.plugin(timestamp);

const Request = mongoose.model("request", bookstoreschema);

async function getrequest() {
  const data = await Request.find({});
  return {
    data,
  };
}

async function addrequest(bookname, description) {
  const request = new Request({
    bookname,
    description,
  });
  const result = await request.save();
  return {
  status:true,
    data: result,
  };
}


async function deleterequest(id){
await Request.findByIdAndDelete(id)
return{
    status:true
}
}
module.exports = {
  addrequest,
  getrequest,
  deleterequest
};
