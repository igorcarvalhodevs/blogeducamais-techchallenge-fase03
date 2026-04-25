const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    username: "prof.ana",
    name: "Prof. Ana",
    role: "teacher",
    passwordHash: bcrypt.hashSync("123456", 10),
  },
  {
    id: 2,
    username: "prof.carlos",
    name: "Prof. Carlos",
    role: "teacher",
    passwordHash: bcrypt.hashSync("123456", 10),
  },
  {
    id: 3,
    username: "prof.maria",
    name: "Prof. Maria",
    role: "teacher",
    passwordHash: bcrypt.hashSync("123456", 10),
  },
  {
    id: 4,
    username: "aluno.joao",
    name: "João",
    role: "student",
    passwordHash: bcrypt.hashSync("123456", 10),
  },
  {
    id: 5,
    username: "aluno.luiza",
    name: "Luiza",
    role: "student",
    passwordHash: bcrypt.hashSync("123456", 10),
  },
  {
    id: 6,
    username: "aluno.pedro",
    name: "Pedro",
    role: "student",
    passwordHash: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;