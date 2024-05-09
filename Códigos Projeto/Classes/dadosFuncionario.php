<?php

require_once 'database.php';
require_once 'login.php';

class DadosFuncionario {
    private $conn;
    private $id_funcionario;

    public function __construct($id_funcionario, $servername, $username, $password, $dbname) {
        $this->id_funcionario = $id_funcionario;
        $db = new Database($servername, $username, $password, $dbname);
        $this->conn = $db->getConnection();
    }

    public function getIdFuncionario() {
        return $this->id_funcionario;
    }

    public function obterDadosFuncionarioParaVisualizar() {
        $sql = "SELECT df.nome, hh.horarioEsperadoEntrada, hh.horarioEsperadoSaida
                FROM DadosFuncionario df
                INNER JOIN HistoricoHoras hh ON df.id_funcionario = hh.id_funcionario
                WHERE df.id_funcionario = '" . $this->getIdFuncionario() . "'";
        $result = $this->conn->query($sql);

        if ($result->num_rows == 1) {
            return $result->fetch_assoc();
        } else {
            return false;
        }
    }

}

function dadosFuncionarioMain() {

    if (isset($_SESSION['id_funcionario'])) {
        $dados_conexao = dadosConexao();

        $dadosFuncionario = new DadosFuncionario($_SESSION['id_funcionario'], $dados_conexao['servername'], $dados_conexao['username'], $dados_conexao['password'], $dados_conexao['dbname']);

        $dados = $dadosFuncionario->obterDadosFuncionarioParaVisualizar();
        if ($dados !== false) {
            echo "Nome do Funcionário: " . $dados['nome'] . "<br>" . $dados['horarioEsperadoEntrada'] . "<br>" . $dados['horarioEsperadoSaida'];
        } else {
            echo "Falha ao obter dados do funcionário.";
        }
    } else {
        echo "ID do funcionário não encontrado na sessão.";
    }
}

?>