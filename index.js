const client = require("./client");

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  client.getUsers(null, (err, data) => {
    if (!err) {
      res.json({
        results: data.users,
      });
    }
  });
});

app.post("/", (req, res) => {
  let user = {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  };

  client.addUser(user, (err, data) => {
    if (err) throw err;

    console.log("Customer created successfully", data);
    res.json({
      status: "OK",
      msg: "User created successfully",
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running at port %d", PORT);
});
