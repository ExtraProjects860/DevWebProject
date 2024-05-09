<?php

require_once 'database.php';

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

function dadosConexao() {
    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $dbname = "pontodigital";

    return array(
        "servername" => $servername,
        "username" => $username,
        "password" => $password,
        "dbname" => $dbname
    );
}

function LoginMain($servername, $username, $password, $dbname) {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $cpf = $_POST['cpf'];
        $senha = $_POST['senha'];

        $login = new Login($servername, $username, $password, $dbname);

        $id_funcionario = $login->fazerLogin($cpf, $senha);

    if ($id_funcionario !== false) {
        $_SESSION['id_funcionario'] = $id_funcionario;

        header("Location: ../TelaPrincipal.php");
        exit();
    } else {
        echo "Login falhou!";
    }

    unset($login); 
    }
}

session_start();

$dados_conexao = dadosConexao();

LoginMain($dados_conexao['servername'], $dados_conexao['username'], $dados_conexao['password'], $dados_conexao['dbname']);

?>