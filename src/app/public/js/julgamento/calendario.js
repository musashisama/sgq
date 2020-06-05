
inicializaComponentes();
function inicializaComponentes() {
    $(document).ready(function () {
        let containerEl = document.getElementById('external-events');
        let calendarEl = document.getElementById('calendar');
        getEventos().then((eventos) => {
            eventos.forEach(evento => {
                evento.start = moment(evento.start, 'DD/MM/YYYY').tz('America/Sao_Paulo').format();
                evento.end = moment(evento.end, 'DD/MM/YYYY').tz('America/Sao_Paulo').format();
            });
            draggable(containerEl)
            initCalendar(calendarEl, eventos)
        })
        initModal()
        btnLegenda()
    });
}
function initModal() {
    $('.modal').modal();
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
            <li class="fc-event evCal Azul center">2ª Turma da CSRF + Turmas Ordinárias da 3ª Seção + TE 2ª Seção</li> 
            <li class="fc-event evCal Amarela black-text center">3ª Turma da CSRF + Turmas Ordinárias da 1ª Seção + TE 3ª Seção</li>
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

async function getEventos() {
    return JSON.parse($('#formCal').attr('data-cal'))
}


function draggable(containerEl) {
    let Draggable = FullCalendarInteraction.Draggable;
    new Draggable(containerEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
            return {
                title: eventEl.innerText
            };
        }
    });

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
        droppable: true,
        drop: function (info) {

        },
        eventDrop: function (info) {
            handleCal(info.event, 'POST');
        },
        eventReceive: function (info) {
            let cores = ['Azul', 'Amarela', 'Verde', 'Vermelha', 'Roxa', 'Preta', 'Cinza', 'Laranja', 'VerdeClara','Rosa','AzulClara', 'Musgo']
            cores.forEach(cor => {
                if ($(info.draggedEl).hasClass(cor)) {
                    info.event.setProp('classNames', cor)
                }
            })
            info.event.setExtendedProp('uniqueId', moment.now());
            console.log(info.event.extendedProps.uniqueId);            
            handleCal(info.event, 'POST');
        },
        businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '08:00',
            endTime: '18:00',
        },
        firstDay: 0,
        editable: true,
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
        eventRender: function (info) {
            $(info.el).dblclick(() => {
                info.event.remove()
                handleCal(info.event, 'DELETE');
            })
        },
        select: selecao => {
            //console.log('a day has been clicked! ' + selecao);
        },
        eventResize: function (info) {
            //alert(info.event.title + " end is now " + info.event.end.toISOString());
            handleCal(info.event, 'POST');
            // if (!confirm("is this okay?")) {
            //     info.revert();
            // } else {
            //     handleCal(info.event, 'POST');
            // }
        },
        dateClick: function (data) {
            console.log((calendar.getEvents()));
        },
        unselect: selecao => {
            //console.log('a day has been clicked! ' + selecao);
        },
    });
    calendar.render();
}



function handleCal(reg, metodo) {
    let data = { classNames: reg.classNames, uniqueId: reg.extendedProps.uniqueId, start: moment(reg.start).tz('America/Sao_Paulo').format('DD/MM/YYYY'), end: moment(reg.end).tz('America/Sao_Paulo').format('DD/MM/YYYY'), allDay: true }
    $.ajax({
        url: `/julgamento/restrito/calendario/${reg.extendedProps.uniqueId}`,
        data: data,
        type: metodo,
        success: function (result) {
            var toastHTML = `<span>Dados atualizados com sucesso!</span>`;
            M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
            console.log(result);
        },
        error: function (result) {
            var toastHTML = `<span>Ocorreu um erro.</span>`;
            M.toast({ html: toastHTML, classes: 'rounded', timeRemaining: 500 });
            console.log(result);
        }
    })
}
