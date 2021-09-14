inicializaComponentes();

function inicializaComponentes() {
  $(document).ready(function () {
    initModal();
    btnInsere();
  });
}

function initModal() {
  $('.modal').modal();
}

function btnInsere() {
  $('.btn-ligaModal').click(function (event) {
    event.preventDefault();
    $('#aModal').addClass('modal-trigger');
    montaModal();
  });
}

function montaModal() {
  $('.hModal').text('1º Acesso / Esqueci minha senha');
  $('.pModal').append(
    `<p class="pModal">
            <br/>
            <br/><br/>
            <form action="/enviamail" id="formEmail" name="formEmail" method="post">
            <p>Caso seu endereço de email esteja cadastrado na base, você receberá instruções para criação de uma nova senha.</p>
            <label for="cpf">Qual seu endereço de email?</label>
            <input type="text" required autocomplete="email" id="email" name="email" value="@carf.economia.gov.br" placeholder="Digite seu endereço de email." class="form-control tooltipped" data-position="bottom" data-tooltip="Somente números."/>

            `,
  );
  $('.modal-footer')
    .append(`<a href="#!" class="modal-close waves-effect waves-red btn-flat cancela">Cancela</a>
    <button class="btn-small waves-effect waves-light concorda green right" type="submit" name="action">
          Enviar<i class="material-icons left">send</i>
    </button>
    </form>`);
  $('.concorda').click(function () {
    if ($('#email').val() == '') {
    } else {
      $('#formEmail').submit();
    }
  });
  $('.cancela').click(function () {
    $('.pModal').text('');
    $('.docref').val('');
    $('.modal-footer').text('');
  });
}
