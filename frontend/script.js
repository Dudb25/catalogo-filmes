let paginaAtual = 1;
let buscaAtual = '';

const token = localStorage.getItem('token');

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
     $('#popup-excluir').attr('data-filme-id', filme.id).show();

     $('#overlay').show();

  });

  lapis.on('click', function(event) {
    $('#popup-editar').attr('data-filme-id', filme.id).show();

    $('#overlay').show();

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
    url: `https://catalogo-filmes-fc6x.onrender.com/filmes/?page=${paginaAtual}&limit=10&titulo=${buscaAtual}`,
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`
    }, 

    success: function (resposta) {
      $('#container-cards').empty();

      resposta.data.forEach(function(filme) {
        console.log(filme);
        renderizarFilme(filme);
      });

      renderizarPaginacao(resposta.pages);
},

    error: function (erro) {
      console.log("Erro ao buscar filmes");
      console.log(erro);
    },
  });
}

function renderizarPaginacao(totalPaginas) {
  $('#paginacao').empty();

  const botaoAnterior = $('<button>').addClass('btn-navegacao btn-anterior').text('← Anterior');

  if(paginaAtual === 1) {
    botaoAnterior.prop('disabled', true);
  }

  botaoAnterior.on('click', function(){
    paginaAtual--;
    buscarFilmes();
  });
  
  $('#paginacao').append(botaoAnterior);

  const botaoProximo = $('<button>').addClass('btn-navegacao btn-proximo').text('Próximo →');

  if(paginaAtual === totalPaginas) {
    botaoProximo.prop('disabled', true);
  }
 
  botaoProximo.on('click', function() {
    paginaAtual++;
    buscarFilmes();


  });

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

  $('#paginacao').append(botaoProximo)
}

function mostrarToast(mensagem) {
  $('#toast-mensagem').text(mensagem);
  $('#toast').addClass('mostrar');
  setTimeout(function() {
    $('#toast').removeClass('mostrar');
  }, 3000);
}

$(document).ready(function () {

  

  $('#logout-btn').on('click', function() {
    // localStorage.removeItem('token');
    // window.location.href = '/login.html';

    $('#popup-logout').show();
    $('#overlay').show();
  });

  $('#confirmar-logout').on('click', function() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
  });

  $('#cancelar-logout').on('click', function() {
      $('#popup-logout').hide();
      $('#overlay').hide();
  });

  $('#fechar-logout').on('click', function() {
      $('#popup-logout').hide();
      $('#overlay').hide();
  });


  $('#buscar-filme').on('input', function() {
    buscaAtual = $(this).val();
    paginaAtual = 1;
    buscarFilmes();
  });

 $(document).on('keydown', function(event) {

  if(event.key === 'Escape') {
    $('#popup-excluir').hide();
    $('#popup-editar').hide();
    $('#popup-logout').hide();
    $('#overlay').hide();
  }
});


  buscarFilmes();
  $('#toast-fechar').on('click', function() {
    $('#toast').removeClass('mostrar');
  });

  // mostrarToast('Teste de toast');

  // $('#toast').addClass('mostrar');
  // $('#toast-mensagem').text('Teste do Toast');

  $('#cancelar-edicao').on('click', function() {
    $('#popup-editar').hide();
    $('#overlay').hide();
  });

  $('#fechar-edicao').on('click', function() {
    $('#popup-editar').hide();
    $('#overlay').hide();
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
      url: `https://catalogo-filmes-fc6x.onrender.com/filmes/${idFilme}`,
      method: 'PUT',
      contentType: 'application/json',

      headers: {
        Authorization: `Bearer ${token}`
      }, 

      data: JSON.stringify(filmeAtualizado),

      success: function() {
        buscarFilmes();
        $('#popup-editar').hide();
        $('#overlay').hide();

        mostrarToast('Filme editado com sucesso!');
      },

      error: function(erro) {

        if(erro.status === 401) {
          mostrarToast('Você precisa estar em uma conta para editar filmes.')
          return;
        }

        console.log(erro);
      }

    });

  });



  $('#cancelar-excluir').on('click', function() {
    $('#popup-excluir').hide();
    $('#overlay').hide();
  });

  $('#fechar-excluir').on('click', function() {
    $('#popup-excluir').hide();
    $('#overlay').hide();
  });  

    $('#confirmar-excluir').on('click', function() {

      const idFilme = $('#popup-excluir').attr('data-filme-id');

      $.ajax({

        url: `https://catalogo-filmes-fc6x.onrender.com/filmes/${idFilme}`, 
        method: 'DELETE', 

        headers: {
          Authorization: `Bearer ${token}`
        }, 

        success: function() {

          if ($('#container-cards .card-filmes').length === 1 && paginaAtual > 1) {
            paginaAtual--;
          }

          buscarFilmes();
          $('#popup-excluir').hide();
          $('#overlay').hide();

          mostrarToast('Filme excluído com sucesso!');
        },

        error: function(erro) {

          if(erro.status === 401) {
            mostrarToast('Você precisa estar em uma conta para excluir filmes');

            return;
          }

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
      url: "https://catalogo-filmes-fc6x.onrender.com/filmes/",
      method: "POST",
      contentType: "application/json",
      headers: { 
        Authorization: `Bearer ${token}`
      }, 

      data: JSON.stringify(filme),

      success: function (resposta) {

        paginaAtual = 1;

        buscarFilmes();
        mostrarToast('Filme cadastrado com sucesso!');
      },

      error: function (erro) {

         console.log("STATUS:", erro.status);
         console.log("RESPOSTA:", erro.responseText);

         if(erro.status === 401) {
          mostrarToast('Você precisa estar em uma conta para cadastrar filmes.');
          return;
         }
      },
    });
  });
});
