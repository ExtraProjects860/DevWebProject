<?php
require_once 'Classes/login.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $cpf = $_POST['cpf'];
    $senha = $_POST['senha'];


    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $dbname = "pontodigital";

    $login = new Login($servername, $username, $password, $dbname);

    $id_funcionario = $login->fazerLogin($cpf, $senha);

    if ($id_funcionario !== false) {
        echo "Login bem-sucedido! ID do funcionário: " . $id_funcionario;
    } else {
        echo "Login falhou!";
    }

    unset($login); 
}
?>
