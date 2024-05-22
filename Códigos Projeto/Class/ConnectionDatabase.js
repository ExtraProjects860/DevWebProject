const mysql = require("mysql");

class ConnectionDatabase {
  constructor() {
    this.connection = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "pontodigital",
    });
  }

  connect() {
    this.connection.connect((err) => {
      if (err) throw err;
      console.log("Conectado ao banco de dados MySQL");
    });
  }

  getConnection() {
    return this.connection;
  }

  query(sql, params) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  close() {
    this.connection.end((err) => {
      if (err) throw err;
      console.log("Conexão com o banco de dados encerrada");
    });
  }
}

module.exports = ConnectionDatabase;
