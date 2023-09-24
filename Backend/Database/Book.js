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
  if(bookcheck){
    return{
        status:false,
        msg:'نام کتاب تکراری است'
    }
  }else{
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
  if(bookcheck){
    return{
        status:true,
      
    }
  }else{
    return{
        status:false,
        msg:"دوباره تلاش کنید"
    }
  }
  }


}

module.exports = {
  addbook,
};
