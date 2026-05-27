$("form").on("submit", function(event) {

    event.preventDefault();

    const titulo = $("#titulo").val();
    const genero = $("#genero").val();
    const status = $("#status").val();
    const nota = $("#nota").val();

    const filme = {
        titulo: titulo,
        genero: genero,
        status: status,
        nota: nota
    };

    console.log(filme);

    $.ajax({
        url: "http://127.0.0.1:8000/docs#/Filmes/criar_filme_filmes__post",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(filme),

        success: function(resposta) {
            console.log("Filme enviado com sucesso!");
            console.log(resposta);
        },

        error: function(erro) {
            console.log("Erro ao enviar filme");
            console.log(erro);
        }
    });

});