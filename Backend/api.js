const express = require("express");
const cors = require("cors");
const app = express();

const PersianDate = require("persian-date");

const upload = require("./uploadfile");
const userDB = require("./Database/Users");
const bookDB = require("./Database/Book");
const discountDB = require("./Database/discount");
const orderDB = require("./Database/Orders");
const ordertimeDB = require("./Database/OrdersTime");
const requestDB = require("./Database/request");
const BaseDB = require("./Database/Setting");


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

    bookDB
      .updatebook(
        req.body.bookid,
        req.body.name,
        req.body.author,
        req.body.price,
        req.body.discount,
        req.body.year,
        req.body.genre,
        req.body.discription,
        imgs
      )
      .then((data) => res.send(data));
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
app.post("/favourite", (req, res) => {
  userDB.favourite(req.body.user, req.body.book).then((data) => res.send(data));
});
//

//ADD to card
app.post("/addtocard", (req, res) => {
  userDB
    .addtocard(req.body.userid, req.body.book)
    .then((data) => res.send(data));
});
//

// Plusnumber basket
app.post("/plusnumber", (req, res) => {
  userDB
    .plusnubmer(req.body.id, req.body.bookid)
    .then((data) => res.send(data));
});
//

// Minusnumber basket
app.post("/minusnumber", (req, res) => {
  userDB
    .minusnubmer(req.body.id, req.body.bookid)
    .then((data) => res.send(data));
});
//

// Delet basket
app.post("/deletbasket", (req, res) => {
  userDB
    .deletbasket(req.body.id, req.body.bookid)
    .then((data) => res.send(data));
});
//

//Code checker
app.get("/codechecker/:code", (req, res) => {
  discountDB.checkcode(req.params.code).then((data) => res.send(data));
});
//

//Add order
app.post("/order/add", (req, res) => {
  const currentDate = new PersianDate();
  const persianMonth = currentDate.format("MMMM");
  const persianYear = currentDate.year();

  let monthorders = `${persianYear} - ${persianMonth} `;
  let ordersdate = [{ year: persianYear, month: persianMonth }];

  ordertimeDB.adddata(persianMonth, persianYear);
  bookDB.bookaddorder(req.body.productdata[0].id, monthorders);

  orderDB
    .addorder(
      req.body.personaldata,
      req.body.paydata,
      req.body.productdata,
      ordersdate
    )
    .then((data) => res.send(data.data));
});
//

//Get orders
app.get("/orders", (req, res) => {
  orderDB.getorders().then((data) => res.send(data.data));
});
//

//Change stats
app.post(`/orders/changestatus`, (req, res) => {
  orderDB
    .changestatus(req.body.id, req.body.value, req.body.postcode)
    .then((data) => res.send(data));
});
//

//Get ordersdate
app.get("/orderstime", (req, res) => {
  ordertimeDB.getorderstimes().then((data) => res.send(data.data));
});
//

//Get book and orders
app.get("/bookorders", (req, res) => {
  bookDB.getbookandorder().then((data) => res.send(data.data));
});
//

//Get most orders book
app.get("/mostbookorders", (req, res) => {
  bookDB.getmostbookorder().then((data) => res.send(data.data));
});
//

//Get base data
app.get("/getbase", (req, res) => {
  BaseDB.getbasesdata().then((data) => res.send(data.data));
});
//

//change banner
app.post(
  "/changebanner",
  upload.fields([
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
    { name: "file3", maxCount: 1 },
    { name: "link1", maxCount: 1 },
    { name: "link2", maxCount: 1 },
    { name: "link3", maxCount: 1 },
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

    let banners = [];
    let counter = 1;
    console.log(req.body.link3);
    arrayfiles.forEach((e) => {
      let link;
      counter === 1
        ? (link = req.body.link1)
        : counter === 2
        ? (link = req.body.link2)
        : (link = req.body.link3);
      console.log(link);
      let path = req.files[e][0]["path"].replace(/\\/g, "/");
      path = path.split("assets/")[1];
      let orginalname = req.files[e][0]["originalname"];
      let banner = { name: orginalname, adress: path, link };
      banners.push(banner);
      counter++;
      console.log(counter);
    });
    BaseDB.changebanner(banners, req.body.reset).then((data) => res.send(data));
  }
);
//

//Change genre
app.post("/changegenre", (req, res) => {
  BaseDB.changegenre(req.body.genre).then((data) => res.send(data));
});
//

//Change base data
app.get("/changebase/:wich", (req, res) => {
  BaseDB.changedata(req.params.wich).then((data) => res.send(data));
});
//


//Get requests
app.get("/getrequests", (req, res) => {
  requestDB.getrequest().then((data) => res.send(data));
});
//

//Delet requests
app.get("/deleterequest/:id", (req, res) => {
  requestDB.deleterequest(req.params.id).then((data) => res.send(data));
});
//


app.listen(3000, () => console.log("listen"));
