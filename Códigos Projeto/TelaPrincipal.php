<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <main>
    <div class="div-logo">
            <img class="logo" src="../Códigos Projeto/img/Ponto_2.png" alt="logo">
        </div>
        <hr>
        <div class="dados">
            <div class="item-dados">
                <p class="item">Colaborador:</p>
                <p>Fulano de Tal</p>
            </div>
            <div class="item-dados">
                <p class="item">Horário de entrada:</p>
                <p>9:00h</p>
            </div>
            <div class="item-dados">
                <p class="item">Horário de saída:</p>
                <p>18:00h</p>
            </div>
        </div>
        <hr>
        <div class="btns">
            <button class="btn" onclick="mostrarDiv('corpo-formulario')">
                Marcar ponto
            </button>
            <button class="btn" onclick="mostrarDiv('justificativa')">
                Justificativa
            </button>
            <button class="btn" onclick="mostrarDiv('historico')">
                Histórico
            </button>
        </div>
        <div id="corpo-formulario" class="conteudo" style="display:none;">
        <p>To no ponto</p>
            <img src="" alt="">
            <form class="form-1" >     
            </form>
        </div>
        <div id="justificativa" class="conteudo" style="display:none;">
        <p>To na justificativa</p>
            <img src="" alt="">
            <form class="form-2" >     
            </form>
        </div>
        <div id="historico" class="conteudo" style="display:none;">
        <p>To no historico</p>
            <img src="" alt="">
            <form class="form-1" >     
            </form>
        </div>
    </main>    

    <?php
        require_once 'Classes/dadosFuncionario.php';

        dadosFuncionarioMain();
    ?>
    <script src="script.js"></script>
</body>
</html>