function mostrarDiv(id) {
    // Oculta todas as divs de conteúdo
    const conteudos = document.querySelectorAll('.conteudo');
    conteudos.forEach((conteudo) => {
        conteudo.style.display = 'none';
    });

    // Mostra a div correspondente ao botão clicado
    const divParaMostrar = document.getElementById(id);
    if (divParaMostrar) {
        divParaMostrar.style.display = 'flex';
    }
}
// Adiciona um evento para mostrar a div inicial quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    mostrarDiv('marcar-ponto'); 
});

