var resp = [];
var obj = '';

$(document).ready(function(){
    $('select').formSelect();
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
                          'Fevb',
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
   fetch(`http://localhost:3000/listaNC`, { method: 'GET'})
            .then(resposta => {                
                return resposta.json();
            })
            .then(dados => {
                dados.forEach(dado => resp.push(`"${dado.nconformidade}": null`));
                console.log("Resp:"+ resp);
                obj = JSON.parse("{"+resp+"}");                
                console.log("Obj:" +typeof(obj));
                $('input.autocomplete').autocomplete({
                    data:obj,                    
                    minLenght:3}
                ); 
            })
            .catch(erro => console.log(erro));       
});