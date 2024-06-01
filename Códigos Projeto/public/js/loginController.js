const Login = require("../../Class/Login");
const Database = require("../../Class/ConnectionDatabase");
const DadosFuncionario = require("../../Class/DadosFuncionario");
const HistoricoJustificativa = require("../../Class/HistoricoJustificativa");

async function realizarLogin(cpf, senha) {
  const login = new Login();
  try {
    const idFuncionario = await login.fazerLogin(cpf, senha);
    if (idFuncionario !== false) {
      const dadosFuncionario = await obterDadosFuncionario(idFuncionario);
      return { success: true, idFuncionario, dadosFuncionario };
    } else {
      return { success: false, message: "Credenciais inválidas" };
    }
  } catch (error) {
    throw error;
  }
}

async function obterDadosFuncionario(id_funcionario) {
  const database = new Database();
  try {
    database.connect();
    const dadosFuncionario = new DadosFuncionario(id_funcionario, database);
    const dados = await dadosFuncionario.obterDadosFuncionario();
    return dados;
  } catch (error) {
    console.error("Erro ao obter dados do funcionário:", error);
    database.close();
    throw error;
  }
}

async function processarLogin(req, res) {
  const { cpf, senha } = req.body;

  try {
    const resultadoLogin = await realizarLogin(cpf, senha);

    if (resultadoLogin.success) {
      req.session.loggedin = true;
      req.session.userId = resultadoLogin.idFuncionario;
      req.session.dadosFuncionario = resultadoLogin.dadosFuncionario;
      res.render("TelaPrincipal", resultadoLogin.dadosFuncionario);
    } else {
      res.status(401).json({ success: false, message: "Credenciais inválidas" });
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ success: false, message: "Erro ao fazer login. Por favor, tente novamente mais tarde." });
  }
}

async function alterarDadosLogin(cpf, senhaAtual, novaSenha) {
  const login = new Login();
  try {
    const idFuncionario = await login.fazerLogin(cpf, senhaAtual);
    if (idFuncionario !== false) {
      const dadosFuncionario = new DadosFuncionario(
        idFuncionario,
        new Database()
      );
      const result = await dadosFuncionario.alterarDados(
        cpf,
        senhaAtual,
        novaSenha
      );
      if (result) {
        return { success: true };
      } else {
        return { success: false, message: "Falha ao alterar os dados" };
      }
    } else {
      return { success: false, message: "Credenciais inválidas" };
    }
  } catch (error) {
    console.error("Erro ao alterar dados:", error);
    throw error;
  }
}

async function registrarHoras(req, res) {
  const { dataHoraEntrada } = req.body;
  const idFuncionario = req.session.userId;

  const database = new Database();
  try {
    console.log(`ID do funcionário: ${idFuncionario} Data Hora: ${dataHoraEntrada}`);
    database.connect();
    //função para registrar as horas no banco de dados (implementar posteriormente)
    res.status(200).json({ message: 'Ponto registrado com sucesso!' });
  } catch (error) {
    console.error("Erro ao registrar horas:", error);
    database.close();
    res.status(500).json({ message: 'Erro ao registrar ponto' });
  } finally {
    database.close()
  }
}

async function registrarJustificativa(req, res) {
  const { dataHoraJustificativa, descricaoJustificativa, documentoApoio } = req.body;
  const idFuncionario = req.session.userId;

  const database = new Database();
  try {
    database.connect();
    const historicoJustificativa = new HistoricoJustificativa(idFuncionario, database);
    await historicoJustificativa.registroDadosJustificativa(dataHoraJustificativa, descricaoJustificativa, documentoApoio);
    res.status(200).json({ message: 'Justificativa registrada com sucesso!' });
  } catch (error) {
    console.error("Erro ao registrar justificativa:", error);
    res.status(500).json({ message: 'Erro ao registrar justificativa' });
  } finally {
    database.close();
  }
}

module.exports = { processarLogin, alterarDadosLogin, registrarHoras, registrarJustificativa };
