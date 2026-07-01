

$(document).ready(function () {
  $("#login-form").submit(function (event) {
    event.preventDefault();
    $('#error-message').text('');

    const email = $('#loginL').val();
    const senha = $('#senhaL').val();

    if(!email || !senha) {
        $('#error-message').text('Preencha todos os campos.')
        return;
    }

    $.ajax({
        url: 'https://catalogo-filmes-fc6x.onrender.com/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            email: email,
            senha: senha
        }),

        success: function(response) {
            localStorage.setItem("token", response.access_token);
            window.location.href = "/index.html";
        }, 

        error: function(xhr) {
            $('#error-message').text('Email ou senha inválidos.')
        }

    });
  });
});
