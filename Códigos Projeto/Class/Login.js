const ConnectionDatabase = require("./ConnectionDatabase");

class Login {
  constructor() {
    this.db = new ConnectionDatabase();
  }

  async fazerLogin(cpf, senha) {
    try {
      await this.db.connect();

      const sql = `SELECT id_login, id_funcionario FROM Login WHERE cpf = ? AND senha = ? LIMIT 1`;
      const result = await this.db.query(sql, [cpf, senha]);
      console.log("Resultado da consulta:", result);

      if (result.length === 1) {
        return result[0]["id_funcionario"];
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    } 
  }

}

module.exports = Login;
