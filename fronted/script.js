$(document).ready(function () {
  console.log("ready carregou");

  $("#form-filmes").on("submit", function (event) {
    event.preventDefault();

    console.log("submit funcionando");

    const titulo = $("#tituloF").val();
    const genero = $("#genero").val();
    const status = $("#status").val();
    const nota = Number($("#nota").val());

    const filme = {
      titulo: titulo,
      genero: genero,
      status: status,
      nota: nota,
    };

    console.log(filme);

    $.ajax({
      url: "http://127.0.0.1:8000/filmes/",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(filme),

      success: function (resposta) {
        console.log("SUCESSO");

        console.log(resposta);
      },

      error: function (erro) {
        console.log("ERRO");

        console.log(erro.status);

        console.log(erro.responseText);
      },
    });
  });
});
