const fs = require("fs");
const express = require("express");
const app = express();




const getAge = birthDate => new Date(
  (Date.now() - Date.parse(birthDate))
).getFullYear() - 1970

const readUsers = () => JSON.parse(fs.readFileSync("./user.json").toString()).map(user => ({
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

  if(users.filter((user) => user.email === body.email)){
    return res.json({messageError: 'cet email est déja utilisé'})
  } else {
  
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
  if (users.filter((user) => user.id !== newUser.id), users.some((user) => user.email === newUser.email) ) {
    return res.json({messageError: "Email déjà utilisé"});
  } else {
    // Ajoute le nouveau user dans le tableau d'users
    const newUsers = [...users.filter((user) => user.id !== id), newUser];
    // Ecris dans le fichier pour insérer la liste des users
    fs.writeFileSync("./user.json", JSON.stringify(newUsers, null, 4));
    res.json(newUser);
  }
}});

app.put("/users/:id", (req, res) => {
  const body = req.body;

  // Récupère la liste des users
  const users = readUsers();

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

  if (users.filter((user) => user.id !== newUser.id), users.some((user) => user.email === newUser.email) ) {
    return res.json({messageError: "Email déjà utilisé"});
  } else {
    // Ajoute le nouveau user dans le tableau d'users
    const newUsers = [...users.filter((user) => user.id !== id), newUser];
    // Ecris dans le fichier pour insérer la liste des users
    fs.writeFileSync("./user.json", JSON.stringify(newUsers, null, 4));
    res.json(newUser);
  }
});

app.get("/users/:id", (req, res) => {
  const body = req.body;

  // Récupère la liste des users
  const users = readUsers();
  const user = users.find((user) => user.id === Number(req.params.id));

  res.json(user);
});

app.delete("/users/:id", (req, res) => {

  // Récupère la liste des users
  const users = readUsers();

  // Création du nouveau user

  const id = Number(req.params.id);

  // supprime le user dans le tableau d'users
  const deleteUser = users.filter((user) => user.id !== id);
  // Ecris dans le fichier pour insérer la liste des users
  fs.writeFileSync("./user.json", JSON.stringify(deleteUser, null, 4));
  res.json(deleteUser);
});

app.post("/users/:id/photo", (req, res) => {
  const photoLocation = req.files.photo.mv('./public/fff.png');

  // reutiliser le put pour modifier le user et mettre le path de la photo dans avatarUrl
})

app.listen(8081, () => console.log("server is running"));