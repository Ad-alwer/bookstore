const express = require("express");
const cors = require("cors");
const app = express();

const userDB = require("./Database/Users");

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

app.get("/users/:jwt", async (req, res) => {
  let users = await userDB.getusers();
  let thisuser = await userDB.getbyjwt(req.params.jwt);

  let index = users.findIndex((e) => {
    return e.username == thisuser.data.username;
  });
  users.splice(index, 1);

  res.send(users);
});

app.listen(3000, () => console.log("listen"));
