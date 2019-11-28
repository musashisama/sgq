$(document).ready(function(){
    $('select').formSelect();
    json = JSON.parse("{"+$("#naoconfs").text().slice(0,-1)+"}");      
    $('input.autocomplete').autocomplete({
        data:json,            
        minLength:0}
    );


    $('.datepicker').datepicker({
        autoClose:true,
        format:'dd-mm-yyyy',
        i18n:
        {
            cancel: 'Cancelar',
            clear: 'Limpar',
            done: 'Ok',
            months: [  'Janeiro',
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
            weekdaysShort	:
                        [
                        'Dom',
                        'Seg',
                        'Ter',
                        'Qua',
                        'Qui',
                        'Sex',
                        'Sáb'
                        ],
            weekdaysAbbrev:	['D','S','T','Q','Q','S','S']
            
        }
    });           
});