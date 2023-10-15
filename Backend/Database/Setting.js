const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const config = require("../config/default");

mongoose.connect(config.info.db.address).then(() => console.log("conect"));

const bookstoreschema = new mongoose.Schema({
  banner: [],
  genre: [],
  mostbuy: Boolean,
  newbooks: Boolean,
  discounted: Boolean,
});
bookstoreschema.plugin(timestamp);

const BASE = mongoose.model("base", bookstoreschema);

async function start() {
  let data = await BASE.find();
  if (data.length < 1) {
    let base = new BASE({
      mostbuy: false,
      newbooks: false,
      discounted: true,
    });
    await base.save();
  }
}

async function getbasesdata() {
  let data = await BASE.findOne();
  return {
    data,
  };
}

async function changebanner(banners, reset) {
  let data = await BASE.findOne();
  let id = data._id;
  let banner = data.banner;
  if (banner.length === 0 || banner.length === 3) {
    await BASE.findByIdAndUpdate(id, {
      $set: {
        banner: banners,
      },
    });
    return {
      status: true,
    };
  } else if (banner.lenght === 1 || banner.length === 2) {
    if (reset) {
      await BASE.findByIdAndUpdate(id, {
        $set: {
          banner: banners,
        },
      });
      return {
        status: true,
      };
    } else {
      banners.forEach((e) => {
        banner.push(e);
      });
      await BASE.findByIdAndUpdate(id, {
        $set: {
          banner: banners,
        },
      });
      return {
        status: true,
      };
    }
  }
}

async function changegenre(genre) {
  let data = await BASE.findOne();
  let id = data._id;

  await BASE.findByIdAndUpdate(id, {
    $set: {
      genre,
    },
  });
  return{
    status:true
  }
}

async function changedata(which){
  let data = await BASE.findOne();
  let id = data._id;
  if(which == 'newbooks'){
    let value = data.newbooks
    await BASE.findByIdAndUpdate(id, {
      $set: {
        newbooks:!value
      },
    });
    return{
      status:true
    }
  }else if(which == 'discounted'){
    let value = data.discounted
    await BASE.findByIdAndUpdate(id, {
      $set: {
        discounted:!value
      },
    });
    return{
      status:true
    }
  }else{
    let value = data.mostbuy
    await BASE.findByIdAndUpdate(id, {
      $set: {
        mostbuy:!value
      },
    });
    return{
      status:true
    }
  }

}

start();
module.exports = {
  getbasesdata,
  changebanner,
  changegenre,
  changedata
};
