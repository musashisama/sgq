let tr ='';

$(document).ready(function(){
    $('.modal').modal();
    $('tr').click(function(){
    tr = $(this).attr('id');
    $('.hModal').text("Exclusão de Não Conformidade");
    $('.pModal').text(`Confirma a exclusão da não conformidade "${$(this).children(".desc").text()}" do macroprocesso "${$(this).children(".mp").text()}"?`);
    }); 
});

$('.concorda').click(function(){
    console.log("Fui clicado");  
    remove(tr);  
});

function remove(tr){      
    fetch(`http://localhost:3000/lista/${tr}`, { method: 'DELETE' })
        .then(resposta => {     
            $(`#${tr}`).fadeOut(600);                          
            console.log("Removido");
        })
        .catch(erro => console.log(erro));
}    