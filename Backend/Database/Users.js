const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const config = require("../config/default");
const jwt = require("jsonwebtoken");

mongoose.connect(config.info.db.address).then(() => console.log("conect"));

const bookstoreschema = new mongoose.Schema({
  username: { type: String, required: true, uniqe: true, lowercase: true },
  email: { type: String, required: true, uniqe: true, lowercase: true },
  password: { type: String, required: true },
  isadmin: { type: Boolean, default: false },
  ismaster: { type: Boolean, default: false },
  basket: [],
  oreders: [],
  hmorders: { type: Number, default: 0 },
  favourite: [],
  personaldata: [],
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
  let users = await User.find().sort({ isadmin: -1 });
  return users;
}

async function changeadmin(id) {
  let user = await User.findOne({ _id: id });
  const adminval = user.isadmin;
  await User.findByIdAndUpdate(id, {
    $set: {
      isadmin: !adminval,
    },
  });
  user = await User.findOne({ _id: id });
  if (user.isadmin === !adminval) {
    return {
      status: true,
    };
  } else {
    return {
      status: false,
    };
  }
}

async function favourite(id, book) {
  let user = await User.findById(id);
  let favourite = user.favourite;
  let index = favourite.findIndex((e) => e.id === book.id);
  if (index >= 0) {
    favourite.splice(index, 1);
    await User.findByIdAndUpdate(id, {
      $set: {
        favourite,
      },
    });
    return {
      status: true,
    };
  } else {
    favourite.push(book);
    await User.findByIdAndUpdate(id, {
      $set: {
        favourite,
      },
    });
    return {
      status: true,
    };
  }
}

async function addtocard(id, book) {
  let user = await User.findById(id);
  let basket = user.basket;
  let index = basket.findIndex((e) => e.id === book.id);
  if (index < 0) {
    basket.push(book);
    await User.findByIdAndUpdate(id, {
      $set: {
        basket,
      },
    });
    return {
      status: true,
    };
  }
}
async function addorders( productdata,personaldata, id,orderid) {
  let user = await User.findById(id)
  let userorders = user.oreders;
  let neworder = {
    productdata,
    personaldata,
    orderid
  };
  

  userorders.push(neworder);
 await User.findByIdAndUpdate(id, {
    $set: {
      oreders: userorders,
    },
  });
  return {
    status:true
  }
 

}

async function plusnubmer(id, bookid) {
  let user = await User.findById(id);
  let basket = user.basket;
  let index = basket.findIndex((e) => e.id === bookid);
  basket[index].number++;
  await User.findByIdAndUpdate(id, {
    $set: {
      basket,
    },
  });
  return {
    status: true,
  };
}
async function minusnubmer(id, bookid) {
  let user = await User.findById(id);
  let basket = user.basket;
  let index = basket.findIndex((e) => e.id === bookid);
  basket[index].number--;
  await User.findByIdAndUpdate(id, {
    $set: {
      basket,
    },
  });
  return {
    status: true,
  };
}

async function deletbasket(id, bookid) {
  let user = await User.findById(id);
  let basket = user.basket;
  let index = basket.findIndex((e) => e.id === bookid);
  basket.splice(index, 1);
  await User.findByIdAndUpdate(id, {
    $set: {
      basket,
    },
  });
  return {
    status: true,
  };
}

async function getuser(jwt) {
  const user = await getbyjwt(jwt);
  return {
    data: user.data,
  };
}
module.exports = {
  signup,
  login,
  getbyjwt,
  getusers,
  changeadmin,
  favourite,
  addtocard,
  plusnubmer,
  minusnubmer,
  deletbasket,
  getuser,
  addorders,
};
