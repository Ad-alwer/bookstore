const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const config = require("../config/default");

mongoose.connect(config.info.db.address).then(() => console.log("conect"));

const bookstoreschema = new mongoose.Schema({
  month: String,
  year: Number,
  number: Number,
});
bookstoreschema.plugin(timestamp);

const Orderdate = mongoose.model("orderdate", bookstoreschema);

async function adddata(month, year) {
  const yearcheck = await Orderdate.find({ year });
  console.log(yearcheck);
  if (yearcheck.length > 0) {
    let monthscheck = yearcheck.find((e) => {
      return e.month == month;
    });
    if (monthscheck) {
      let val = monthscheck.number + 1;

      await Orderdate.findByIdAndUpdate(monthscheck._id, {
        $set: {
          number: val,
        },
      });
    } else {
      const data = new Orderdate({
        month,
        year,
        number: 1,
      });
      await data.save();
    }
  } else {
    const data = new Orderdate({
      month,
      year,
      number: 1,
    });
    await data.save();
  }
}
async function getorderstimes() {
  let orders = await Orderdate.find();
  console.log(orders);
  return {
    data: orders,
  };
}

module.exports = {
  adddata,
  getorderstimes,
};
