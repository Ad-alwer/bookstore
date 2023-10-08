const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const config = require("../config/default");

mongoose.connect(config.info.db.address).then(() => console.log("conect"));

const bookstoreschema = new mongoose.Schema({
  personaldata: [],
  paydata: [],
  productdata: [],
  status: {
    type: String,
    enum: ["finished", "returned", "pending", "posting"],
  },
  postcode: { type: Number, default: null },
  ordersdate: [],
});
bookstoreschema.plugin(timestamp);

const Order = mongoose.model("order", bookstoreschema);

async function addorder(personaldata, paydata, productdata, orderdate) {

  const order = new Order({
    personaldata,
    paydata,
    status:'pending',
    orderdate,
    productdata
  });
  const result=await order.save()
  return{
    data:result
  }
}

module.exports={
    addorder
}
