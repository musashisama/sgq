inicializaComponentes();
layout = "fitDataFill";
responsiveLayout = true;
let table = '';
let tabledata = "";
let agrupado = false;

function inicializaComponentes() {
    $(document).ready(function () {
        initSelect();
        dataTable();
        initModal();
    });
}


function initSelect() {
    $('select').formSelect();
}

function initModal() {
    $('.modal').modal();
}


function dataTable(msg) {
    let tabledata = JSON.parse($('#formPerfis').attr('data-users'));
    table = new Tabulator("#tabelaUsuarios", {
        data: tabledata,
        pagination: "local",
        height: "1000px",
        minHeight: '300px',
        maxHeight: '1000px',
        layout: layout,
        responsiveLayout: 'collapse',
        responsiveLayoutCollapseStartOpen: false,
        initialSort: [{ column: "nome", dir: 'asc' }, { column: "cargo", dir: "desc" }],
        columns: [
            { formatter: "responsiveCollapse", width: 30, minWidth: 30, hozAlign: "left", resizable: false, headerSort: false },
            { title: "Nome", field: "nome", sorter: "string", hozAlign: "left", editor: false, headerFilter: "input", bottomCalc: "count", responsive: 0 },
            { title: "CPF", field: "cpf", sorter: "string", hozAlign: "center", width: 150, editor: false, headerFilter: "input", responsive: 2 },
            { title: "Perfis", field: "perfil", sorter: "string", hozAlign: "center", width: 150, editor: false, headerFilter: "input", responsive: 0 },
            { title: "Setor", field: "setor", sorter: "string", hozAlign: "left", editor: false, responsive: 0 },
            { title: "Cargo", field: "cargo", sorter: "string", hozAlign: "left", editor: false, responsive: 2 },
            { title: "Função", field: "funcao", sorter: "string", hozAlign: "left", editor: false, responsive: 0 },
            { title: "e-mail", field: "email", sorter: "string", hozAlign: "left", editor: false, responsive: 2 },
            { formatter: formatEdita, cellClick: clickEdita, width: 40, hozAlign: "center" },
        ],
        autoColumns: false,
        locale: true,
        langs: {
            "pt-br": {
                "columns": {
                    "name": "Nome", //replace the title of column name with the value "Name"
                },
                "ajax": {
                    "loading": "Carregando", //ajax loader text
                    "error": "Erro", //ajax error text
                },
                "groups": { //copy for the auto generated item count in group header
                    "item": "item", //the singular  for item
                    "items": "itens", //the plural for items
                },
                "pagination": {
                    "page_size": "Quantidade de registros", //label for the page size select element
                    "first": "Primeira", //text for the first page button
                    "first_title": "Primeira Página", //tooltip text for the first page button
                    "last": "Última",
                    "last_title": "Última Página",
                    "prev": "Anterior",
                    "prev_title": "Página Anterior",
                    "next": "Próxima",
                    "next_title": "Próxima Página",
                },
                "headerFilters": {
                    "default": "filtrar coluna...", //default header filter placeholder text
                    "columns": {
                        "nome": "Filtrar por Nome",
                        "CPF": "Filtrar por CPF", //replace default header filter text for column name
                    }
                }
            }
        },
    });
}

let formatEdita = function formatNome(cell) {

    return `<a class='btn-perfil-edita' title='Editar' href='#modal1'><i class='material-icons orange-text'>edit</i></a>`
}

function clickEdita(e, cell) {
    e.preventDefault();
    $('.btn-perfil-edita').addClass('modal-trigger');

    montaModal(e, cell);
    initSelect();
}

function montaModal(e, cell) {
    let perfis = cell.getRow().getData().perfil

    $('.hModal').text(`Edição de perfis de usuário`);
    $('.pModal').append(
        `<p class="pModal">
            <br/>
            <strong>Usuário:</strong> ${cell.getRow().getData().nome}<br/>
            <strong>CPF:</strong> ${cell.getRow().getData().cpf}<br/>
            <strong>Perfis:</strong> ${cell.getRow().getData().perfil}<br/>          
            <form id="formEditaPerfis" name="formEditaPerfis" action="#">
            <p>
            <label>
              <input type="checkbox" id='admin' value='admin' name="perfis"/>
              <span>Administrador</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" id='acervo' value='acervo' name="perfis"/>
              <span>Acervo</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" id='julgamento' value='julgamento' name="perfis" />
              <span>Gestão do Julgamento</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" id='qualidade' value='qualidade' name="perfis"/>
              <span>Gestão da Qualidade</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" id='pessoal' value='pessoal' name="perfis"/>
              <span>Gestão de Pessoas</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" id='riscos' value='riscos' name="perfis"/>
              <span>Gestão de Riscos</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" id='carf' value='carf' name="perfis"/>
              <span>Usuário CARF</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" id='conselheiro' value='conselheiro' name="perfis"/>
              <span>Conselheiro</span>
            </label>
          </p>
          <p>
          <label>
            <input type="checkbox" id='serpro' value='serpro' name="perfis"/>
            <span>Serpro</span>
          </label>
        </p>
    
</form></p>`
    );
    perfis.forEach(perfil => {
        $(`#${perfil}`).prop("checked", true);
    })
    $('#formEditaPerfis').attr('action', `/admin/usuario/perfis/${cell.getRow().getData().cpf}`)
    $('#formEditaPerfis').append('<input type="hidden" name="_method" value="PUT"/>')

    $('.concorda').click(function () {
        let form = $('#formEditaPerfis').serializeArray();
        edita(e, cell, form)
    });
    $('.cancela').click(function () {
        $('.hModal').text('');
        $('.pModal').text('');
    })
}

function edita(e, cell, form) {
    let registro = [];
    let cpf = cell.getRow().getData().cpf;
    form.forEach(array => {
        if (array.value != 'PUT') {
            registro.push(array.value);
        }
    })    
    $.ajax({
        type: "PUT",
        url: `/admin/usuario/perfis/${cell.getRow().getData().cpf}`,
        data: { cpf: cpf, perfil: registro },
        done: function (result) {
            console.log(result);
            var toastHTML = `<span>Perfis atualizados com sucesso!</span>`;
            M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
            location.reload(true);
        },
        error: function (result) {
            console.log(`Erro: ${result}`);
        }
    });
    location.reload(true);
}

document.getElementById("mostraColunas").addEventListener("click", function () {
    if (agrupado == false) {
        table.setGroupBy(["funcao", "cargo"]);
        agrupado = true;
    }
    else {
        table.setGroupBy();
        agrupado = false;
    };

});