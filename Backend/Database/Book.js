const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const config = require("../config/default");

mongoose.connect(config.info.db.address).then(() => console.log("conect"));

const bookstoreschema = new mongoose.Schema({
  name: String,
  imgs: [],
  author: String,
  year: Number,
  price: Number,
  genre: String,
  description: String,
  discount: { type: String, default: null },
  likes: { type: Number, default: 0 },
  orders: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  monthsorders: [],
});
bookstoreschema.plugin(timestamp);

const Book = mongoose.model("book", bookstoreschema);

async function addbook(
  name,
  author,
  year,
  price,
  genre,
  description,
  monthsorders,
  imgs
) {
  let bookcheck = await Book.findOne({ name: name });
  if (bookcheck) {
    return {
      status: false,
      msg: "نام کتاب تکراری است",
    };
  } else {
    let book = new Book({
      name,
      author,
      year,
      price,
      genre,
      description,
      monthsorders,
      imgs,
    });
    await book.save();
    bookcheck = await Book.findOne({ name: name });
    if (bookcheck) {
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

async function getallbooks() {
  let books = await Book.find();
  return {
    books,
  };
}

async function getbookbyid(id) {
  let book = await Book.find({ _id: id });
  return {
    book,
  };
}

async function updatebook(
  id,
  name,
  author,
  price,
  discount,
  year,
  genre,
  description,
  imgs
) {
  await Book.findByIdAndUpdate(id, {
    $set: {
      name,
      author,
      price,
      year,
      genre,
      description,
      imgs,
      discount,
    },
  });
  return {
    status: true,
  };
}

async function changeavaible(id) {
  let book = await Book.findOne({ _id: id });
  let availableval = book.available;
  await Book.findByIdAndUpdate(id, {
    $set: {
      available: !availableval,
    },
  });
  book = await Book.findOne({ _id: id });
  if (book.available === availableval) {
    return {
      status: false,
    };
  } else {
    return {
      status: true,
    };
  }
}

async function deletbook(id) {
  await Book.findByIdAndDelete(id);
  let book =await Book.findOne({ _id: id });
  if (book) {
    return {
      status: false,
    };
  } else {
    return {
      status: true,
    };
  }
}

module.exports = {
  addbook,
  getallbooks,
  getbookbyid,
  updatebook,
  changeavaible,
  deletbook,
};
