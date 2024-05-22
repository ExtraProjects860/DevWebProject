const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const {
  processarLogin,
  alterarDadosLogin,
  registrarHoras,
} = require("./public/js/loginController");

app.use(bodyParser.json());
router.use(bodyParser.json());

// Rota para o formulário de login
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Rota para a página principal após login
router.get("/telaPrincipal", (req, res) => {
  if (req.session.loggedin) {
    res.render("TelaPrincipal", req.session.dadosFuncionario);
  } else {
    res.redirect("/");
  }
});

// Rota de logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.error(err);
    }
  });
  res.redirect("/");
});

// Rota de login
router.post("/login", (req, res) => processarLogin(req, res));

// Rota para Alterar Dados
router.post("/alterarDados", (req, res) => {
  const { cpf, senhaAtual, novaSenha } = req.body;
  console.log("Recebendo solicitação para alterar dados:", {
    cpf,
    senhaAtual,
    novaSenha,
  });
  alterarDadosLogin(cpf, senhaAtual, novaSenha)
    .then(result => {
      if (result.success) {
        console.log("Dados alterados com sucesso");
        req.session.dadosFuncionario = { ...req.session.dadosFuncionario };
        res.status(200).json({ message: "Dados alterados com sucesso" });
      } else {
        console.error("Falha ao alterar os dados:", result.message);
        res.status(400).json({ message: result.message });
      }
    })
    .catch(error => {
      console.error("Erro ao alterar dados:", error);
      res.status(500).json({ message: "Erro ao alterar dados" });
    });
});

router.post("/registrar", (req, res) => registrarHoras(req, res));

module.exports = router;
