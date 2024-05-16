document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('verSenha');
    const passwordInput = document.getElementById('senha');

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    });
});
