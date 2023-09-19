const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const config = require("../config/default");
const jwt = require("jsonwebtoken");

mongoose.connect(config.info.db.address).then(() => console.log("conect"));

const bookstoreschema = new mongoose.Schema({
  username: { type: String, required: true, uniqe: true, lowercase: true },
  email: { type: String, required: true, uniqe: true, lowercase: true },
  password: { type: String, required: true },
  address: { type: String, default: null },
  isadmin: { type: Boolean, default: false },
  ismaster: { type: Boolean, default: false },
  basket: [],
  oreders: [],
  hmorders: { type: Number, default: 0 },
  favourite: [],
  img: { type: mongoose.Schema.ObjectId, default: null },
});
bookstoreschema.plugin(timestamp);

const User = mongoose.model("user", bookstoreschema);

async function checkmail(mail) {
  let user = await User.findOne({ email: mail });
  if (user) {
    return true;
  } else {
    return false;
  }
}
async function checkusername(username) {
  let user = await User.findOne({ username: username });
  if (user) {
    return true;
  } else {
    return false;
  }
}

async function signup(mail, name, pass) {
  const emailchek = await checkmail(mail);
  const usernamechek = await checkusername(name);
  if (emailchek) {
    return {
      Problem: "email",
      message: "ایمیل تکراری است",
    };
  } else if (usernamechek) {
    return {
      Problem: "username",
      message: "نام کاربری تکراری است",
    };
  } else {
    let token;
    const user = new User({
      username: `${name}`,
      email: `${mail}`,
      password: `${pass}`,
    });
    const resault = await user.save();
    token = jwt.sign({ _id: user.id }, config.info.jwt_key);
    return {
      message: "ok",
      token: token,
    };
  }
}

async function login(username, password) {
  let token;
  let user = await User.findOne({ username: username });
  if (user) {
    if (user.password == password) {
      token = jwt.sign({ _id: user.id }, config.info.jwt_key);
      return {
        token,
        user,
      };
    } else {
      return {
        message: "کاربر یافت نشد",
      };
    }
  } else {
    return {
      message: "کاربر یافت نشد",
    };
  }
}

async function getbyjwt(userjwt) {
  const decode = jwt.verify(userjwt, config.info.jwt_key);
  let user = await User.findOne({ _id: decode });
  if (user) {
    return {
      status: "ok",
      data: user,
    };
  } else {
    return {
      status: false,
    };
  }
}

async function getusers() {
  let users = await User.find({});
  return users
  }


module.exports = {
  signup,
  login,
  getbyjwt,
  getusers,
};
