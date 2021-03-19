const fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
const { body, validationResult } = require('express-validator');
const fileUpload = require("express-fileupload");
app.use(cors());

app.use(express.static('images'));

app.use(express.json());

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  createParentPath: true
}));

const getAge = birthDate => new Date((Date.now() - Date.parse(birthDate))).getFullYear() - 1970


const readUsers = () => JSON.parse(fs.readFileSync("./user.json").toString()).map(
  user => ({
  ...user,
  age: getAge(user.birthDate)
}));

app.get("/users", (req, res) => {
  res.json(readUsers());
});

app.post("/users", (req, res) => { 
  const body = req.body;
  // Récupère la liste des users
  const users = readUsers();

  if(!req.files) {
    res.send( {
      status: false,
      message: 'no file uploaded'
    });
  } else {
    let avatar = req.files.avatarUrl;
    avatar.mv('./images/' + avatar.name);
    res.json(req.files.avatarUrl);
    console.log(avatar.name)

  // Création du nouveau user
  const alreadyEmail = users.find(user => user.email === req.body.email);
  const newUser = {
    id: Math.max(...users.map((user) => user.id)) + 1,
    lastName: body.lastName.toUpperCase(),
    firstName: body.firstName,
    email: body.email,
    birthDate: body.birthDate,
    avatarUrl: 'http/localhost:8010/'+avatar.name,
    gender: body.gender,
  };
  
  if (alreadyEmail == null) {
    // Ajoute le nouveau user dans le tableau d'users
     users.push(newUser);
    // Ecris dans le fichier pour insérer la liste des users
  fs.writeFileSync("./user.json", JSON.stringify(users, null, 4));
  } else {
    return res.json({errmessage: 'Email déjà utilisé'})
  }
 }
  res.json(users);
});

app.put("/users/:id", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;
  // Récupère la liste des users
  const users = readUsers();
  // Création du nouveau user
  const id = Number(req.params.id);
  const alreadyEmail = users.filter(user => user.id !== id).find(user => user.email === req.body.email);
  
  const newUser = {
    id: id,
    lastName: body.lastName.toUpperCase(),
    firstName: body.firstName,
    email: body.email,
    birthDate: body.birthDate,
    gender: body.gender,
    avatarUrl: body.avatarUrl
  };
  if (alreadyEmail == null) {
    // Ajoute le nouveau user dans le tableau d'users
  const newUsers = [...users.filter((user) => user.id !== id), newUser];
  // Ecris dans le fichier pour insérer la liste des users
  fs.writeFileSync("./user.json", JSON.stringify(newUsers, null, 4));

  } else {
  
    return res.json({errmessage: 'Email déjà utilisé'})
  }
  res.json(newUser);
  }
);

app.delete("/users/:id", (req) => {
  const users = readUsers();
  const id = Number(req.params.id);
  const newUsers = [...users.filter((user) => user.id !== id), ];
  fs.writeFileSync("./user.json", JSON.stringify(newUsers, null, 4));

});

app.get("/users/:id", (req, res) => {
  const body = req.body;

  // Récupère la liste des users
  const users = readUsers();
  const user = users.find((user) => user.id === Number(req.params.id));

  res.json(user);
});

app.listen(8081, () => console.log("server is running"));