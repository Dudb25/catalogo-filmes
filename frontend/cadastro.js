function mostrarToast(mensagem) {

    $('#toast-mensagem').text(mensagem);
    $('#toast').addClass('mostrar');
    setTimeout(function() {
        $('#toast').removeClass('mostrar');
    }, 3000);

}

$(document).ready(function () {

    $("#signin-form").submit(function(event) {

        event.preventDefault();
        $('#error-message').text('');
        $('#toast').removeClass('mostrar');

        const nome = $('#nomeL').val().trim();
        const email = $('#emailL').val().trim();
        const senha = $('#senhaL').val().trim();
        const confirmarSenha = $('#confSenhaL').val().trim();

        if(!nome || !email || !senha || !confirmarSenha) {
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
        nome: nome,
        email: email,
        senha: senha
        };

        const botao = $(this).find('button[type="submit"]');
        botao.prop('disabled', true);
        botao.text('CADASTRANDO...');

        $.ajax({
            url: 'http://127.0.0.1:8000/usuarios',
            method: 'POST',
            contentType: 'application/json',

            data: JSON.stringify(usuario),

            success: function(response) {

                console.log('Usuário cadastrado:', response);

                botao.prop('disabled', false);
                botao.text('CONFIRMAR');

                mostrarToast('Conta criada com sucesso! Redirecionando...');

                setTimeout(function() {

                window.location.href = '/login.html';

                }, 2000);

            },

            error: function(erro) {

                console.log('Status:', erro.status);
                console.log('Resposta:', erro.responseText);

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


    $('#nomeL, #emailL, #senhaL, #confSenhaL').on('input', function() {
        $('#error-message').text('');
    });

    console.log("Página de cadastro carregada.");
    $('#toast-fechar').on('click', function() {
        $('#toast').removeClass('mostrar');
    });
});