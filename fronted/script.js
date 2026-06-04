function renderizarFilme(filme) {
  const container = $("#container-cards");
  const card = $("<div>").addClass("card-filmes");
  const infoFilmes = $("<div>").addClass("info-filmes");
  const icons = $("<div>").addClass("icons");

  infoFilmes.append(
    $("<p>").text(filme.titulo),
    $("<p>").text(filme.genero),
    $("<p>").text(filme.status),
    $("<p>").text(filme.nota),
  );

  const lapis = $("<img>").addClass("pencil").attr("src", "src/icons/pencil.svg");
  const lixeira = $("<img>").addClass("trash").attr("src", "src/icons/trash-alt.svg");

  icons.append(lapis, lixeira);
  card.append(infoFilmes);
  card.append(icons);
  container.append(card);
}

function buscarFilmes() {
  $.ajax({
    url: "http://127.0.0.1:8000/filmes/",
    method: "GET",

    success: function (resposta) {
      $('#container-cards').empty(); //evita duplicar o filme
      resposta.forEach(function(filme) {
        renderizarFilme(filme);
      });
    },

    error: function (erro) {
      console.log("Erro ao buscar filmes");
      console.log("erro");
    },
  });
}

$(document).ready(function () {
  buscarFilmes();
  // console.log("ready carregou");

  $("button[type='submit']").on("click", function (event) {
    event.preventDefault();

    // console.log('submit funcionando');

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

        // console.log(resposta);
        renderizarFilme(resposta);
      },

      error: function (erro) {
        console.log("ERRO");

        console.log(erro.status);

        console.log(erro.responseText);
      },
    });
  });
});
