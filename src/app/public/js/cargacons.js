inicializaComponentes();

function inicializaComponentes() {
    $(document).ready(function () {
        initSelect();
        botaoAbre();
        //handleSelect();
        //dataTable();
    });
}

function initSelect() {
    $('select').formSelect();
}


// function handleSelect() {
//     $('#relatorio').change(function (event) {
//         $('#dadosCarga').text('');
//         console.log($("#relatorio").val());
//         //$('#formGerencial').submit();        
//     });
// }

// function handleSelect() {

// }

function botaoAbre() {
    $('#botaoAbre').click(function (event) {              
        
        $.ajax({           
            url: "/julgamento/restrito/diagnostico-carga?nocache=" + Math.random(),
            type: 'post',
            data: {
                relatorio: $("#relatorio").val()
            },
            beforeSend: function () {
                $("#resultado").text("Buscando...");               
            }
        })
            .done(function (msg) {
                $("#dadosCarga").empty();
                $("#dadosCarga").remove();
                $("#dadosCarga").text(msg);                  
                dataTable(msg);               
                $("#resultado").text(""); 
                          
            })
            .fail(function (jqXHR, textStatus, msg) {
                $("#resultado").text(msg);
            });
    });
}


function dataTable(msg) {
   
    let tabledata = JSON.parse(msg.relatorio);
    //define table
    var table = null;
    
    table = new Tabulator("#tabelaCarga", {
        data: tabledata,
        pagination: "local",
        height: '900px',
        minHeight: '300px',
        maxHeight: '900px',
        layout: "fitColumns",
        initialSort: [
            { column: "HE_CARF", dir: "asc" }//, //sort by this first
            //{column:"CPF", dir:"desc"}, //then sort by this second
        ],
        columns: [
            { title: "CPF", field: "CPF", sorter: "string", hozAlign: "center", width: 150, editor: false, },
            {
                title: "Carga em horas", field: "HE_CARF", sorter: "number", hozAlign: "left", width: 320, formatter: "progress", formatterParams: {
                    min: 0,
                    max: 1000,
                    color: function (value) {
                        if (value <= 126) return "red";
                        if (value > 126 && value <= 252) return "orange";
                        if (value > 252) return "green";
                    },//["red", "orange", "green", "blue"],
                    legend: true,
                    legendColor: "#000000",
                    legendAlign: "right",
                }
            }],
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
                        "name": "filtrar nome...", //replace default header filter text for column name
                    }
                }
            }
        },
    });

    // $('#tabelaCarga').DataTable({
    //     "paging": true,        
    //     "language": {
    //         "sEmptyTable": "Não foi encontrado nenhum registro",
    //         "sLoadingRecords": "A carregar...",
    //         "sProcessing": "A processar...",
    //         "sLengthMenu": "Mostrar  registros _MENU_",
    //         "sZeroRecords": "Não foram encontrados resultados",
    //         "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
    //         "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
    //         "sInfoFiltered": "(filtrado de _MAX_ registros no total)",
    //         "sInfoPostFix": "",
    //         "sSearch": "Procurar:",
    //         "sUrl": "",
    //         "oPaginate": {
    //             "sFirst": "Primeiro",
    //             "sPrevious": "Anterior",
    //             "sNext": "Seguinte",
    //             "sLast": "Último"
    //         },
    //         "oAria": {
    //             "sSortAscending": ": Ordenar colunas de forma ascendente",
    //             "sSortDescending": ": Ordenar colunas de forma descendente"
    //         }
    //     },
    //     "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
    //     data: JSON.parse($('#dadosCarga').text()),
    //     columns: [
    //         { data: "CPF" },
    //         { data: "HE_CARF" },

    //     ]
    // });
}
