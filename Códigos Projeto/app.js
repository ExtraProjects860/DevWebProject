const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const routes = require("./routes");
const path = require("path");
const crypto = require("crypto");
const app = express();
const PORT = 4000;

app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.static("js"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: crypto.randomBytes(64).toString("hex"), // Substitua por uma chave secreta segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Altere para true se estiver usando HTTPS
  })
);

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando na porta ${PORT}`);
});
