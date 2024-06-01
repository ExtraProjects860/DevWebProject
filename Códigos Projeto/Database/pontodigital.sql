-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 02/06/2024 às 00:21
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `pontodigital`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `dadosfuncionario`
--

CREATE TABLE `dadosfuncionario` (
  `id_funcionario` int(11) NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `dataNascimento` date NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefone` int(11) NOT NULL,
  `profissao` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `dadosfuncionario`
--

INSERT INTO `dadosfuncionario` (`id_funcionario`, `cpf`, `nome`, `dataNascimento`, `endereco`, `email`, `telefone`, `profissao`) VALUES
(1, '123.456.789-00', 'João Silva', '1990-01-01', 'Rua Exemplo, 123', 'joao@example.com', 1234567890, 'Desenvolvedor');

-- --------------------------------------------------------

--
-- Estrutura para tabela `historicohoras`
--

CREATE TABLE `historicohoras` (
  `id_histórico` int(11) NOT NULL,
  `id_funcionario` int(11) NOT NULL,
  `horarioEsperadoEntrada` time NOT NULL,
  `horarioEsperadoSaida` time NOT NULL,
  `dataHoraEntrada` datetime DEFAULT NULL,
  `dataHoraSaida` datetime DEFAULT NULL,
  `statusRegistro` varchar(15) DEFAULT NULL,
  `totalHoras` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `historicohoras`
--

INSERT INTO `historicohoras` (`id_histórico`, `id_funcionario`, `horarioEsperadoEntrada`, `horarioEsperadoSaida`, `dataHoraEntrada`, `dataHoraSaida`, `statusRegistro`, `totalHoras`) VALUES
(1, 1, '09:00:00', '14:00:00', '0000-00-00 00:00:00', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `historicojustificativas`
--

CREATE TABLE `historicojustificativas` (
  `id_justificativa` int(11) NOT NULL,
  `id_funcionario` int(11) NOT NULL,
  `dataJustificativa` date DEFAULT NULL,
  `descricaoJustificativa` varchar(255) DEFAULT NULL,
  `documentoApoio` varchar(255) DEFAULT NULL,
  `statusJustificativa` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `historicojustificativas`
--

INSERT INTO `historicojustificativas` (`id_justificativa`, `id_funcionario`, `dataJustificativa`, `descricaoJustificativa`, `documentoApoio`, `statusJustificativa`) VALUES
(1, 1, NULL, 'teste', NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `login`
--

CREATE TABLE `login` (
  `id_login` int(11) NOT NULL,
  `id_funcionario` int(11) NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `senha` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `login`
--

INSERT INTO `login` (`id_login`, `id_funcionario`, `cpf`, `senha`) VALUES
(1, 1, '123.456.789-00', 'senha123');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `dadosfuncionario`
--
ALTER TABLE `dadosfuncionario`
  ADD PRIMARY KEY (`id_funcionario`),
  ADD UNIQUE KEY `cpf` (`cpf`);

--
-- Índices de tabela `historicohoras`
--
ALTER TABLE `historicohoras`
  ADD PRIMARY KEY (`id_histórico`),
  ADD KEY `id_funcionario` (`id_funcionario`);

--
-- Índices de tabela `historicojustificativas`
--
ALTER TABLE `historicojustificativas`
  ADD PRIMARY KEY (`id_justificativa`),
  ADD KEY `id_funcionario` (`id_funcionario`);

--
-- Índices de tabela `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_login`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD KEY `id_funcionario` (`id_funcionario`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `dadosfuncionario`
--
ALTER TABLE `dadosfuncionario`
  MODIFY `id_funcionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `historicohoras`
--
ALTER TABLE `historicohoras`
  MODIFY `id_histórico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `historicojustificativas`
--
ALTER TABLE `historicojustificativas`
  MODIFY `id_justificativa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `login`
--
ALTER TABLE `login`
  MODIFY `id_login` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `historicohoras`
--
ALTER TABLE `historicohoras`
  ADD CONSTRAINT `historicohoras_ibfk_1` FOREIGN KEY (`id_funcionario`) REFERENCES `dadosfuncionario` (`id_funcionario`);

--
-- Restrições para tabelas `historicojustificativas`
--
ALTER TABLE `historicojustificativas`
  ADD CONSTRAINT `historicojustificativas_ibfk_1` FOREIGN KEY (`id_funcionario`) REFERENCES `dadosfuncionario` (`id_funcionario`);

--
-- Restrições para tabelas `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_ibfk_1` FOREIGN KEY (`id_funcionario`) REFERENCES `dadosfuncionario` (`id_funcionario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
