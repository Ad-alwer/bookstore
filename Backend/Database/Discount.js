const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const config = require("../config/default");

mongoose.connect(config.info.db.address).then(() => console.log("conect"));

const bookstoreschema = new mongoose.Schema({
  code: String,
  value: { type: mongoose.Schema.Types.Mixed },
  count:{type: mongoose.Schema.Types.Mixed },
  minprice: { type: mongoose.Schema.Types.Mixed},
  maxdiscount: { type: mongoose.Schema.Types.Mixed},
  active: { type: Boolean, default: true },
});
bookstoreschema.plugin(timestamp);

const Discount = mongoose.model("discount", bookstoreschema);

async function adddiscount(code, value, count, minprice, maxdiscount) {
  let discountcheck = await Discount.findOne({ code: code });
  if (discountcheck) {
    return {
      status: false,
      msg: "کد تخفیف تکراری است",
    };
  } else {
    let discount = new Discount({
      code,
      value,
      count,
      minprice,
      maxdiscount,
    });
    await discount.save();
    discountcheck = await Discount.findOne({ code: code });
    if (discountcheck) {
      return {
        status: true,
      };
    } else {
      return {
        status: false,
        msg: "دوباره تلاش کنید",
      };
    }
  }
}
async function getdiscount() {
  let discounts = await Discount.find();
  if (discounts) {
    return {
      status: true,
      data: discounts,
    };
  } else {
    return {
      status: false,
    };
  }
}

async function changeactive(id) {
  let discount = await Discount.findOne({ _id: id });
  let activeval = discount.active;
  await Discount.findByIdAndUpdate(id, {
    $set: {
      active: !activeval,
    },
  });
  
  discount = await Discount.findOne({ _id: id });
  if (discount.active === !activeval) {
    return {
      status: true,
    };
  } else {
    return {
      status: false,
    };
  }
}
async function deletdiscount (id){
  await Discount.findOneAndDelete(id)
  let discount =await Discount.find({_id:id})
  if(!discount){
    return{
      status:true
    }
  }else{
    return{
      status:true
    }
  }
}

async function checkcode(code){
  let codeckecker = await Discount.findOne({code})
  if(codeckecker){
    return{
      data:codeckecker

    }
    
  }else{
    return{
      status:false
    }
  }
}
module.exports = {
  adddiscount,
  getdiscount,
  changeactive,
  deletdiscount,
  checkcode
};
