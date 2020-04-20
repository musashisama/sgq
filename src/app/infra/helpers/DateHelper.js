class DateHelper {
    
    constructor() {
        throw new Error('DateHelper não pode ser instanciada. Utilize os métodos estáticos.');
    }

    static dataParaTexto(data) {

       
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
        /* return data.getDate()
        + '/' + (data.getMonth()+1)
        + '/' + data.getFullYear(); */
    }   

    static dataAtual(){
        let data = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
        return data;
    }
    static textoParaData(texto) {

        // mudamos a validação para aceitar o novo formato!
        if(!/\d{2}\/\d{2}\/\d{4}/.test(texto))
            throw new Error('Deve estar no formato dd/mm/aaaa');

        // veja que usamos no split '/' no lugar de '-'. Usamos `reverse` também para ficar ano/mes/dia.      
        return new Date(...texto.split('/').reverse().map((item, indice) => item - indice % 2));
    }

    // $(document).ready(() => {
    //     $('#calc').click(() => {
    //     var d1 = $('#d1').val();
    //     var d2 = $('#d2').val();
    //       $('#dif').text(workingDaysBetweenDates(d1,d2));
    //     });
    //   });
      
    //   let workingDaysBetweenDates = (d0, d1) => {
    //     /* Two working days and an sunday (not working day) */
    //     var holidays = ['2016-05-03', '2016-05-05', '2016-05-07'];
    //     var startDate = parseDate(d0);
    //     var endDate = parseDate(d1);  
      
    //   // Validate input
    //     if (endDate < startDate) {
    //       return 0;
    //     }
      
    //   // Calculate days between dates
    //     var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
    //     startDate.setHours(0, 0, 0, 1);  // Start just after midnight
    //     endDate.setHours(23, 59, 59, 999);  // End just before midnight
    //     var diff = endDate - startDate;  // Milliseconds between datetime objects    
    //     var days = Math.ceil(diff / millisecondsPerDay);
      
    //     // Subtract two weekend days for every week in between
    //     var weeks = Math.floor(days / 7);
    //     days -= weeks * 2;
      
    //     // Handle special cases
    //     var startDay = startDate.getDay();
    //     var endDay = endDate.getDay();
          
    //     // Remove weekend not previously removed.   
    //     if (startDay - endDay > 1) {
    //       days -= 2;
    //     }
    //     // Remove start day if span starts on Sunday but ends before Saturday
    //     if (startDay == 0 && endDay != 6) {
    //       days--;  
    //     }
    //     // Remove end day if span ends on Saturday but starts after Sunday
    //     if (endDay == 6 && startDay != 0) {
    //       days--;
    //     }
    //     /* Here is the code */
    //     holidays.forEach(day => {
    //       if ((day >= d0) && (day <= d1)) {
    //         /* If it is not saturday (6) or sunday (0), substract it */
    //         if ((parseDate(day).getDay() % 6) != 0) {
    //           days--;
    //         }
    //       }
    //     });
    //     return days;
    //   }
                 
    //   function parseDate(input) {
    //       // Transform date from text to date
    //     var parts = input.match(/(\d+)/g);
    //     // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    //     return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
    //   }
        
} 
module.exports = DateHelper;