const bodyParser = require("body-parser");

const port = 3000;

let user = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/user", (req, res) => {
  const user = req.body;

  console.log(user);
  users.push(user);

  res.send("user is added to the database");
});

app.listen(port);
