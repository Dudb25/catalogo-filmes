$(document).ready(function () {

    $("#signin-form").submit(function(event) {

        event.preventDefault();
        $('#error-message').text('');

        const email = $('#emailL').val().trim();
        const senha = $('#senhaL').val().trim();
        const confirmarSenha = $('#confSenhaL').val().trim();

        if(!email || !senha || !confirmarSenha) {
            $('#error-message').text('Preencha todos os campos.');
            return;
        }

        if(senha !== confirmarSenha) {
            $('#error-message').text('As senhas não coincidem.');
            return;
        }

        if(senha.length < 6) {
            $('#error-message').text('A senha deve possuir pelo menos 6 caracteres.');
            return;
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!regexEmail.test(email)) {
            $('#error-message').text('Digite um e-mail válido.');
            return;
        }

        const usuario = {
        email: email,
        senha: senha
        };

        const botao = $(this).find('button[type="submit"]');
        botao.prop('disabled', true);
        botao.text('CADASTRANDO...');

        $.ajax({
            url: 'http://127.0.0.1:8000/cadastro',
            method: 'POST',
            contentType: 'application/json',

            data: JSON.stringify(usuario),

            success: function(response) {
                botao.prop('disabled', false);
                botao.text('CONFIRMAR');
                window.location.href = '/login.html';

            },

            error: function(erro) {
                botao.prop('disabled', false);
                botao.text('CONFIRMAR');

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


    $('#emailL, #senhaL, #confSenhaL').on('input', function() {
        $('#error-message').text('');
    });

    console.log("Página de cadastro carregada.");
});