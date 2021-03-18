const fs = require("fs");
const express = require("express");
const app = express();


app.use(express.json());

const readUsers = () => JSON.parse(fs.readFileSync("./user.json").toString());

app.get("/users", (req, res) => {
  res.json(readUsers());
});

app.post("/users", (req, res) => {
  const body = req.body;
  // Récupère la liste des users
  const users = readUsers();

  const emailUsers = users;
  let isEmailUsed = 0;
  emailUsers
    .filter((user) => user.id != id)
    .forEach((user) => {
      if (user.email === body.email) {
        console.log("Cet email est déjà utilisé.");
        isEmailUsed = -1;
      }
    });
  if (isEmailUsed === -1)
    return res.json({ errorMail: "Cet email est déjà utilisé" });
  // Création du nouveau user
  const newUser = {
    id: Math.max(...users.map((user) => user.id)) + 1,
    lastName: body.lastName.toUpperCase(),
    firstName: body.firstName,
    email: body.email,
    birthDate: body.birthDate,
    avatarUrl: body.avatarUrl,
    gender: body.gender,
  };
  // Ajoute le nouveau user dans le tableau d'users
  users.push(newUser);
  // Ecris dans le fichier pour insérer la liste des users
  fs.writeFileSync("./user.json", JSON.stringify(users, null, 4));
  res.json(users);
});

app.put("/users/:id", (req, res) => {
  const body = req.body;

  // Récupère la liste des users
  const users = readUsers();

  const emailUsers = users;
  let isEmailUsed = 0;
  emailUsers
    .filter((user) => user.id != id)
    .forEach((user) => {
      if (user.email === body.email) {
        console.log("Cet email est déjà utilisé.");
        isEmailUsed = -1;
      }
    });
  if (isEmailUsed === -1)
    return res.json({ errorMail: "Cet email est déjà utilisé" });

  // Création du nouveau user

  const id = Number(req.params.id);
  const newUser = {
    id: id,
    lastName: body.lastName.toUpperCase(),
    firstName: body.firstName,
    email: body.email,
    birthDate: body.birthDate,
    avatarUrl: body.avatarUrl,
    gender: body.gender,
  };
  // Ajoute le nouveau user dans le tableau d'users
  const newUsers = [...users.filter((user) => user.id !== id), newUser];
  // Ecris dans le fichier pour insérer la liste des users
  fs.writeFileSync("./user.json", JSON.stringify(newUsers, null, 4));
  res.json(newUser);
});

app.get("/users/:id", (req, res) => {
  const body = req.body;

  // Récupère la liste des users
  const users = readUsers();
  const user = users.find((user) => user.id === Number(req.params.id));

  res.json(user);
});

app.delete("/user/:id", (req, res) => {
  //on récupère l'id du user a supprimer et la liste des users
  const id = req.params.id;
  const users = readUsers();

  const NewUsers = users.filter((user) => user.id != id);
  fs.writeFileSync("./user.json", JSON.stringify(NewUsers, null, 4));
  res.json(NewUsers);
});

//fonction pour l'upload d'image
app.post("/upload/:id", (req, res) => {
  const id = req.params.id;
  let path = "";
});

app.listen(8081, () => console.log("server is running"));
