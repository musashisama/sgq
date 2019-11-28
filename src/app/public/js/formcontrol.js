
inicializaComponentes();

function inicializaComponentes(){
    $(document).ready(function () {
    
        $('select').formSelect();
    
        json = JSON.parse("{" + $("#naoconfs").text().slice(0, -1) + "}");
        $('input.autocomplete').autocomplete({
            data: json,
            minLength: 0
        }
        );
    
        
            $('.hModal').text("Confirmação de Inclusão de Registro");
            $('.pModal').text(`Confirma a inclusão da não conformidade?`);
        
       
    
        $('.concorda').click(function(){      
            $("#formNC").submit();     
        });
    
        // var obj = [
        //     {"name": "Afghanistan", "code": "AF"}, 
        //     {"name": "Åland Islands", "code": "AX"}, 
        //     {"name": "Albania", "code": "AL"}, 
        //     {"name": "Algeria", "code": "DZ"}
        //   ];
          
        //   // the code you're looking for
        //   var needle = 'AL';
          
        //   // iterate over each element in the array
        //   for (var i = 0; i < obj.length; i++){
        //     // look for the entry with a matching `code` value
        //     if (obj[i].code == needle){
        //        // we found it
        //       // obj[i].name is the matched result
        //     }
        //   }
        
        $('.modal').modal();
        $('.tooltipped').tooltip();
    
        $('.docref').keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13' && $('.docref').val()) {
                event.preventDefault();
                $('.areachip').append(
                    `<div class="chip">
                ${$('.docref').val()}
                <i class="close material-icons">close</i>
              </div>
              `);
                $('.docref').val("")
            }
        });
    
        $('.addDoc').click(function (event) {
            event.preventDefault();
            if($('.docref').val()){
                $('.areachip').append(
                    `<div class="chip">
                    ${$('.docref').val()}
                    <i class="close material-icons">close</i>
                </div>
                `);
                $('.docref').val("");
            }
        });
    
    
        $('.datepicker').datepicker({
            autoClose: true,
            format: 'dd-mm-yyyy',
            i18n:
            {
                cancel: 'Cancelar',
                clear: 'Limpar',
                done: 'Ok',
                months: ['Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro'
                ],
                monthsShort:
                    [
                        'Jan',
                        'Fev',
                        'Mar',
                        'Abr',
                        'Mai',
                        'Jun',
                        'Jul',
                        'Ago',
                        'Set',
                        'Out',
                        'Nov',
                        'Dez'
                    ],
                weekdays:
                    [
                        'Domingo',
                        'Segunda',
                        'Terça',
                        'Quarta',
                        'Quinta',
                        'Sexta',
                        'Sábado'
                    ],
                weekdaysShort:
                    [
                        'Dom',
                        'Seg',
                        'Ter',
                        'Qua',
                        'Qui',
                        'Sex',
                        'Sáb'
                    ],
                weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
    
            }
        });
    });
}
