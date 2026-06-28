$(document).ready(function () {

    $("#signin-form").submit(function(event) {

        event.preventDefault();
        $('#error-message').text('');

        const email = $('#emailL').val().trim();
        const senha = $('#senhaL').val();
        const confirmarSenha = $('#confSenhaL').val();

        if(!email || !senha || !confirmarSenha) {
            $('#error-message').text('Preencha todos os campos.');
            return;
        }

        if(senha !== confirmarSenha) {
            $('#error-message').text('As senhas não coincidem.');
            return;
        }

        const usuario = {
        email: email,
        senha: senha
        };

        const botao = $(this).find('button[type="submit"]');
        botao.prop('disabled', true);

        $.ajax({
            url: 'http://127.0.0.1:8000/cadastro',
            method: 'POST',
            contentType: 'application/json',

            data: JSON.stringify(usuario),

            success: function(response) {
                botao.prop('disabled', false);
                window.location.href = '/login.html';

            },

            error: function(erro) {
                botao.prop('disabled', false);

                if(erro.status === 409) {
                    $('#error-message').text('Este e-mail já está cadastrado.');
                    return;
                }

                if(erro.status === 400) {
                    $('#error-message').text('Dados inválidos.');
                    return;
                }

                $('#error-message').text('Erro ao cadastrar usuário.');

                console.log(erro);

            }

        });

    });


    console.log("Página de cadastro carregada.");
});