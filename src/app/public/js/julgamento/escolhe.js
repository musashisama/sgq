// inicializaComponentes();

// function inicializaComponentes() {
//     $(document).ready(function () {
//         btnInsere();
//     });
// }

// function btnInsere() {
//     $('.btn-insere').click(function (event) {
//         //event.preventDefault();
//         console.log($('.controle').text() );
//         $.ajax({
//             type: "POST",
//             url: "/julgamento/restrito/escolhecsv",
//             data: { caminho: $('.controle').text() },
//             beforeSend: function () {
//                 $("#resultado").html("ENVIANDO...");
//             },
//             success: function (v) { console.log(v); }
//             //dataType: dataType
//         });
//     });
// }