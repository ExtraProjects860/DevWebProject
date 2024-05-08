<?php

require_once 'Database.php';

class Login {

    private $conn;

    public function __construct($servername, $username, $password, $dbname) {
        $db = new Database($servername, $username, $password, $dbname);
        $this->conn = $db->getConnection();
    }

    public function testarConexao() {
        if ($this->conn->connect_error) {
            die("Conexão falhou: " . $this->conn->connect_error);
        }
    }

    public function fazerLogin($cpf, $senha) {
        $cpf = $this->conn->real_escape_string($cpf);
        $senha = $this->conn->real_escape_string($senha);

        $sql = "SELECT id_login, id_funcionario FROM Login WHERE cpf = '$cpf' AND senha = '$senha' LIMIT 1";
        $result = $this->conn->query($sql);

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            return $row['id_funcionario'];
        } else {
            return false;
        }
    }

    public function __destruct() {
        $this->conn->close();
    }

}

?>