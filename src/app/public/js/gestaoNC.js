inicializaComponentes();

function inicializaComponentes() {
  $(document).ready(function () {
    initSelect();
    btnInsere();
    initModal();
  });
}

function initSelect() {
  $('select').formSelect();
}

function btnInsere() {
  $('.addListaNC').click(function (event) {

  });
}

function initModal() {
  $('.modal').modal();
}

function montaModal() {
  $('.hModal').text("Confirmação de Inclusão de Novo Tipo de Não Conformidade");
  $('.pModal').append(
    `<p class="pModal">
    <form id="formCadNC" name="formCadNC" action="/gestao/cadastranc" method="post">
    <div class="form-group input-field mProcOrigem col s4">
      <select required name="mProcOrigem">
        <option class="form-group" value="" disabled selected>Clique para selecionar</option>        
          <option class="form-group" value="1">Tetse</option>
        
      </select>
      <label for="mProcOrigem">
        Em qual macroprocesso a <strong>não conformidade</strong> teve origem?
      </label>
    </div>    
      <div class="form-group input-field nconf col s6">
        <label for="nconformidade">Não Conformidade:</label>
        <input required type="text" id="nconformidade" name="nconformidade" value="" class="form-control nconformidade"/>
      </div>    
      <div class="form-group input-field descDet col s6">
        <label for="descDet">
          Descrição detalhada da <strong>não conformidade:</strong>
        </label>
        <input required type="text" id="descDet" name="descDet" value="" class="form-control descDet"/>
      </div>
    </form>
    </p>
  `);

  $('.concorda').click(function () {
  });
  $('.cancela').click(function () {
    $('.pModal').text('');
    $('.docref').val('');
  })
}

let tr = '';

const preloader = `
<div class="preloader-wrapper big active">
<div class="spinner-layer spinner-blue">
  <div class="circle-clipper left">
    <div class="circle"></div>
  </div><div class="gap-patch">
    <div class="circle"></div>
  </div><div class="circle-clipper right">
    <div class="circle"></div>
  </div>
</div>

<div class="spinner-layer spinner-red">
  <div class="circle-clipper left">
    <div class="circle"></div>
  </div><div class="gap-patch">
    <div class="circle"></div>
  </div><div class="circle-clipper right">
    <div class="circle"></div>
  </div>
</div>

<div class="spinner-layer spinner-yellow">
  <div class="circle-clipper left">
    <div class="circle"></div>
  </div><div class="gap-patch">
    <div class="circle"></div>
  </div><div class="circle-clipper right">
    <div class="circle"></div>
  </div>
</div>

<div class="spinner-layer spinner-green">
  <div class="circle-clipper left">
    <div class="circle"></div>
  </div><div class="gap-patch">
    <div class="circle"></div>
  </div><div class="circle-clipper right">
    <div class="circle"></div>
  </div>
</div>
</div>
`;

$(document).ready(function () {
  $('.modal').modal();
  $('tr').click(function () {
    tr = $(this).attr('id');
    $('.hModal').text("Exclusão de Não Conformidade");
    $('.pModal').text(`Confirma a exclusão da não conformidade "${$(this).children(".desc").text()}" do macroprocesso "${$(this).children(".mp").text()}"?`);
  });
});

$('.concorda').click(function () {
  remove(tr);
});

function remove(tr) {
  $('body').toggleClass('not-active');
  $('.preloader-wrapper').toggleClass('active');
  $('#naoconformidades').prepend(preloader);
  fetch(`http://localhost:3000/lista/${tr}`, { method: 'DELETE' })
    .then(resposta => {
      $(`#${tr}`).fadeOut(600);
    })
    .catch(erro => console.log(erro))
    .finally(function () {
      $('.preloader-wrapper').remove();
      $('.preloader-wrapper').toggleClass('active');
      $('body').toggleClass('not-active');
    });
}    