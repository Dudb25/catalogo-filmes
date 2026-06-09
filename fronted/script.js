function renderizarFilme(filme) {
  const container = $("#container-cards");
  const card = $("<div>").addClass("card-filmes").attr('data-id', filme.id);
  const infoFilmes = $("<div>").addClass("info-filmes");
  const icons = $("<div>").addClass("icons");

  infoFilmes.append(
    $("<p>").text(filme.titulo),
    $("<p>").text(filme.genero),
    $("<p>").text(filme.status),
    $("<p>").text(filme.nota),
  );

  const lapis = $("<img>").addClass("pencil").attr("src", 'src/icons/pencil.svg');
  const lixeira = $("<img>").addClass("trash").attr("src", "src/icons/trash-alt.svg");

  lixeira.on('click', function(event) {
    const posicao = $(this).offset();
    $('#popup-excluir').css({
        top: posicao.top - 20,
        left: posicao.left - 150
      })
      .attr('data-filme-id', filme.id)
      .show();
  });

  lapis.on('click', function(event) {
    const posicao = $(this).offset();

    $('#popup-editar').css({
      top: posicao.top - 20,
      left: posicao.left - 180
    }).show();

    $('#popup-editar').attr('data-filme-id', filme.id);
    $('#editar-titulo').val(filme.titulo);
    $('#editar-genero').val(filme.genero);
    $('#editar-status').val(filme.status);
    $('#editar-nota').val(filme.nota);
  });

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
      resposta.data.forEach(function(filme) {
        renderizarFilme(filme);
      });
    },

    error: function (erro) {
      console.log("Erro ao buscar filmes");
      console.log(erro);
    },
  });
}

function renderizarPaginacao(totalPaginas) {
  $('#paginacao').empty();

  for(let i = 1; i <= totalPaginas; i++) {
    const botao = $('<button>')
  .text(i);

if(i === paginaAtual) {
  botao.css({
    background: '#F6E9E9',
    color: '#0F0000'
  });
}

  botao.on('click', function() {
  paginaAtual = i;
  buscarFilmes();

    });

    $('#paginacao').append(botao);

  }
}

$(document).ready(function () {
  buscarFilmes();

  $('#cancelar-edicao').on('click', function() {
    $('#popup-editar').hide();
  });

  $('#confirmar-edicao').on('click', function() {
    const idFilme = $('#popup-editar').attr('data-filme-id');
    const filmeAtualizado = {
      titulo: $('#editar-titulo').val(),
      genero: $('#editar-genero').val(),
      status: $('#editar-status').val(),
      nota: Number($('#editar-nota').val())
    };

    $.ajax({
      url: `http://127.0.0.1:8000/filmes/${idFilme}`,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(filmeAtualizado),

      success: function() {
        buscarFilmes();
        $('#popup-editar').hide();
      },

      error: function(erro) {
        console.log(erro);
      }

    });

  });



  $('#cancelar-excluir').on('click', function() {
      $('#popup-excluir').hide();
    });

    $('#confirmar-excluir').on('click', function() {

      const idFilme = $('#popup-excluir').attr('data-filme-id');

      $.ajax({

        url: `http://127.0.0.1:8000/filmes/${idFilme}`, 
        method: 'DELETE', 
        success: function() {
          buscarFilmes();
          $('#popup-excluir').hide();
        },

        error: function(erro) {
          console.log(erro)
        }

      });

    });
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
       console.log('SUCESSO');

       console.log('POST RESPOSTA:');

       console.log(resposta);

       buscarFilmes();
      },

      error: function (erro) {
        console.log("ERRO");
        console.log(erro.status);
        console.log(erro.responseText);
      },
    });
  });
});
