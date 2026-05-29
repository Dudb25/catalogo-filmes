$("form").on("submit", function(event) {

    event.preventDefault();

    const titulo = $("#tituloF").val();
    const genero = $("#genero").val();
    const status = $("#status").val();
    const nota = Number($("#nota").val());

    const filme = {
        titulo: titulo,
        genero: genero,
        status: status,
        nota: nota
    };

    console.log(filme);

    $.ajax({
        url: "http://localhost:8000/filmes/",
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