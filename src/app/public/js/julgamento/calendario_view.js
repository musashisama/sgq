
inicializaComponentes();
function inicializaComponentes() {
    $(document).ready(function () {
        let calendarEl = document.getElementById('calendar');
        getEventos().then((eventos) => {
            eventos.forEach(evento => {
                evento.start = moment(evento.start, 'DD/MM/YYYY').tz('America/Sao_Paulo').format()
                evento.end = moment(evento.end, 'DD/MM/YYYY').tz('America/Sao_Paulo').format()
            });
            initCalendar(calendarEl, eventos)
            
        })
        initModal()
        btnLegenda()
    });
}
function initModal() {
    $('.modal').modal();
}

async function getEventos() {
    return JSON.parse($('#divCal').attr('data-cal'))
}

function btnLegenda(){
    $('.btn-legenda').click(e => {
        e.preventDefault();
        $('#aModal').addClass('modal-trigger');
        montaModal()
    })
}

function montaModal() {
    $('.hModal').text("Legenda do Calendário");
    $('.pModal').append(
        `<p class="pModal ">
            <br/>
            <ul  style='width:50%'>
            <li class="fc-event evCal Verde center"> 1ª Turma da CSRF + Turmas Ordinárias da 2ª Seção + TE 1ª Seção</li>           
            <li class="fc-event evCal Amarela black-text center">2ª Turma da CSRF + Turmas Ordinárias da 3ª Seção + TE 2ª Seção</li>
            <li class="fc-event evCal Azul center">3ª Turma da CSRF + Turmas Ordinárias da 1ª Seção + TE 3ª Seção</li> 
            <li class="fc-event evCal Vermelha center">TE 1ª Seção</li> 
            <li class="fc-event evCal Roxa center">TE 3ª Seção</li> 
            <li class="fc-event evCal Laranja center">TE 2ª Seção</li>                
            <li class="fc-event evCal Cinza center">2ª Turma da CSRF + Turmas Ordinárias da 3ª Seção</li>               
            <li class="fc-event evCal VerdeClara center">1ª Turma da CSRF + Turmas Ordinárias da 2ª Seção</li>    
            <li class="fc-event evCal Rosa center">3ª Turma da CSRF + Turmas Ordinárias da 1ª Seção</li>  
            <li class="fc-event evCal Preta white-text center">Turmas Ordinárias da 2ª Seção + TE 1ª Seção</li>    
            <li class="fc-event evCal AzulClara center">1ª Turma da CSRF + 3ª Turma da CSRF + Turmas Ordinárias da 1ª Seção + TE 3ª Seção</li>
            <li class="fc-event evCal Musgo center">Pleno da CSRF</li>                  
          </ul>       
            
            </p>`
    );    
    $('.cancela').click(function () {
       
    })
}



function initCalendar(calendarEl, eventos) {

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['interaction', 'timeGrid', 'dayGrid', 'list'],
        timeZone: 'local',
        header: {
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '08:00',
            endTime: '18:00',
        },        
        firstDay: 0,
        editable: false,
        defaultView: 'dayGridMonth',        
        selectable: false,
        selecMirror: true,
        locale: 'pt-br',
        weekNumbers: true,
        weekNumbersWithinDays: true,
        weekNumberCalculation: 'ISO',
        navLinks: true,
        eventLimit: true,
        eventSources: [
            {
                events: eventos,
            }
        ],
    });
    calendar.render();
}

