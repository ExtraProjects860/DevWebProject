const Login = require("../../Class/Login");
const Database = require("../../Class/ConnectionDatabase");
const DadosFuncionario = require("../../Class/DadosFuncionario");

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
    database.connect(); // Conecta ao banco de dados
    const dadosFuncionario = new DadosFuncionario(id_funcionario, database); // Passa a instância de database como parâmetro
    const dados = await dadosFuncionario.obterDadosFuncionario();
    //database.close(); // Fecha a conexão com o banco de dados
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
      res.render("TelaPrincipal", resultadoLogin.dadosFuncionario); // Renderiza a página e passa os dados do funcionário como variáveis de template
    } else {
      res.send("Login falhou!");
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).send("Erro ao fazer login");
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
    //função para registrar as horas no banco de dados
    database.close();
    res.status(200).json({ message: 'Ponto registrado com sucesso!' });
  } catch (error) {
    console.error("Erro ao registrar horas:", error);
    database.close();
    res.status(500).json({ message: 'Erro ao registrar ponto' });
  }
}

module.exports = { processarLogin, alterarDadosLogin, registrarHoras };
