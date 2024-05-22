const mysql = require("mysql");

class DadosFuncionario {
  constructor(id_funcionario, connection) {
    this.id_funcionario = id_funcionario;
    this.connection = connection;
  }

  async obterDadosFuncionario() {
    const sql = `SELECT df.nome, hh.horarioEsperadoEntrada, hh.horarioEsperadoSaida
                     FROM DadosFuncionario df
                     INNER JOIN HistoricoHoras hh ON df.id_funcionario = hh.id_funcionario
                     WHERE df.id_funcionario = ?`;
    try {
      const result = await this.connection.query(sql, [this.id_funcionario]);
      console.log(result);
      if (result.length === 1) {
        return result[0];
      } else {
        return false;
      }
    } catch (error) {
      console.error("Erro ao obter dados do funcionário:", error);
      throw error;
    } finally {
      this.connection.close();
    }
  }

  async alterarDados(cpf, senhaAtual, novaSenha) {
    const sql = `UPDATE Login SET senha = ? WHERE cpf = ? AND senha = ?`;
    try {
      const result = await this.connection.query(sql, [novaSenha, cpf, senhaAtual]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Erro ao alterar dados do funcionário:", error);
      throw error;
    } finally {
      this.connection.close();
    }
  }

  async recuperarRegistroHoras(data, hora) {
    const sql_recuperar = `SELECT`;
    const sql_inserir = `INSERT`;
    try {
      const result = await this.connection.query();
    } catch (error) {
      console.error("Erro ao registrar data e hora ponto do funcionário:", error);
      throw error;
    } finally {
      this.connection.close();
    }
  }
}

module.exports = DadosFuncionario;
