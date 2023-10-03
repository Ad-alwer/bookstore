const express = require("express");
const cors = require("cors");
const app = express();

const PersianDate = require("persian-date");

const upload = require("./uploadfile");
const userDB = require("./Database/Users");
const bookDB = require("./Database/Book");
const discountDB = require("./Database/discount");
const { application } = require("express");

app.use(express.json());
app.use(cors());

//Signup
app.post("/signup", (req, res) => {
  userDB
    .signup(req.body.email, req.body.username, req.body.password)
    .then((data) => res.send(data));
});
//

//Login
app.post("/login", (req, res) => {
  userDB
    .login(req.body.username, req.body.password)
    .then((data) => res.send(data));
});
//

//User info
app.get("/find/:jwt", (req, res) => {
  userDB.getbyjwt(req.params.jwt).then((data) => {
    res.send(data);
  });
});
//

//Get Users
app.get("/users/:jwt", async (req, res) => {
  let users = await userDB.getusers();
  let thisuser = await userDB.getbyjwt(req.params.jwt);

  let index = users.findIndex((e) => {
    return e.username == thisuser.data.username;
  });
  users.splice(index, 1);

  res.send(users);
});
//

//Change admin
app.get("/users/admin/:id", (req, res) => {
  userDB.changeadmin(req.params.id).then((data) => res.send(data));
});
//

//Add Book
app.post(
  "/addbook",
  upload.fields([
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
    { name: "file3", maxCount: 1 },
    { name: "file4", maxCount: 1 },
    { name: "name", maxCount: 1 },
  ]),
  async (req, res) => {
    let arrayfiles = [];
    if (req.files["file1"]) {
      arrayfiles.push("file1");
    }
    if (req.files["file2"]) {
      arrayfiles.push("file2");
    }
    if (req.files["file3"]) {
      arrayfiles.push("file3");
    }
    if (req.files["file4"]) {
      arrayfiles.push("file4");
    }

    let imgs = [];
    arrayfiles.forEach((e) => {
      let path = req.files[e][0]["path"].replace(/\\/g, "/");
      path = path.split("assets/")[1];
      let orginalname = req.files[e][0]["originalname"];
      let newimg = { name: orginalname, adress: path };
      imgs.push(newimg);
    });

    const currentDate = new PersianDate();
    const persianMonth = currentDate.format("MMMM");
    const persianYear = currentDate.year();

    let monthorders = [
      {
        data: `${persianYear} - ${persianMonth} `,
        orders: 0,
      },
    ];

    bookDB
      .addbook(
        req.body.name,
        req.body.author,
        req.body.year,
        req.body.price,
        req.body.genre,
        req.body.discription,
        monthorders,
        imgs
      )
      .then((data) => res.send(data));
  }
);
//

//Add discount
app.post("/adddiscount", (req, res) => {
  discountDB
    .adddiscount(
      req.body.discountcode,
      req.body.value,
      req.body.countlimit,
      req.body.minprice,
      req.body.maxdiscount
    )
    .then((data) => res.send(data));
});
//

//GET discounts
app.get("/getdiscount", (req, res) => {
  discountDB.getdiscount().then((data) => res.send(data));
});
//

//GET active status
app.get("/getdiscount/active/:id", (req, res) => {
  discountDB.changeactive(req.params.id).then((data) => res.send(data));
});
//

//Delet discount
app.get("/getdiscount/delet/:id", (req, res) => {
  discountDB.deletdiscount(req.params.id).then((data) => res.send(data));
});
//

//Get books
app.get("/books", (req, res) => {
  bookDB.getallbooks().then((data) => res.send(data.books));
});
//

//Get book by id
app.get("/book/:id", (req, res) => {
  bookDB.getbookbyid(req.params.id).then((data) => res.send(data.book));
  // console.log(req.params.id);
});
//

//Updatebook
app.post(
  "/updatebook",
  upload.fields([
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
    { name: "file3", maxCount: 1 },
    { name: "file4", maxCount: 1 },
    { name: "name", maxCount: 1 },
  ]),
  async (req, res) => {
    let arrayfiles = [];
    if (req.files["file1"]) {
      arrayfiles.push("file1");
    }
    if (req.files["file2"]) {
      arrayfiles.push("file2");
    }
    if (req.files["file3"]) {
      arrayfiles.push("file3");
    }
    if (req.files["file4"]) {
      arrayfiles.push("file4");
    }

    let imgs = [];
    arrayfiles.forEach((e) => {
      let path = req.files[e][0]["path"].replace(/\\/g, "/");
      path = path.split("assets/")[1];
      let orginalname = req.files[e][0]["originalname"];
      let newimg = { name: orginalname, adress: path };
      imgs.push(newimg);
    });
  

    bookDB.updatebook(
      req.body.bookid,
      req.body.name,
      req.body.author,
      req.body.price,
      req.body.discount,
      req.body.year,
      req.body.genre,
      req.body.discription,
      imgs
    ).then(data=>res.send(data))
  }
);
//

//Change active
app.get("/changeavailable/:id", (req, res) => {
  // console.log(req.params.id);
  bookDB.changeavaible(req.params.id).then((data) => res.send(data.status));
});
//

//Delet book
app.get("/deletbook/:id", (req, res) => {
  // console.log(req.params.id);
  bookDB.deletbook(req.params.id).then((data) => res.send(data.status));
});
//

//Favourite change
app.post("/favourite",(req,res)=>{
  userDB.favourite(req.body.user,req.body.book).then(data=>res.send(data))
})
//

app.listen(3000, () => console.log("listen"));
