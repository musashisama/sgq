let tr ='';

const preloader = `
<div class="preloader-wrapper big active">
<div class="spinner-layer spinner-blue">
  <div class="circle-clipper left">
    <div class="circle"></div>
  </div><div class="gap-patch">
    <div class="circle"></div>
  </div><div class="circle-clipper right">
    <div class="circle"></div>
  </div>
</div>

<div class="spinner-layer spinner-red">
  <div class="circle-clipper left">
    <div class="circle"></div>
  </div><div class="gap-patch">
    <div class="circle"></div>
  </div><div class="circle-clipper right">
    <div class="circle"></div>
  </div>
</div>

<div class="spinner-layer spinner-yellow">
  <div class="circle-clipper left">
    <div class="circle"></div>
  </div><div class="gap-patch">
    <div class="circle"></div>
  </div><div class="circle-clipper right">
    <div class="circle"></div>
  </div>
</div>

<div class="spinner-layer spinner-green">
  <div class="circle-clipper left">
    <div class="circle"></div>
  </div><div class="gap-patch">
    <div class="circle"></div>
  </div><div class="circle-clipper right">
    <div class="circle"></div>
  </div>
</div>
</div>
`;

$(document).ready(function(){
    //$('.preloader-wrapper').toggleClass('active');    
    $('.modal').modal();    
    $('tr').click(function(){
    tr = $(this).attr('id');
    $('.hModal').text("Exclusão de Não Conformidade");
    $('.pModal').text(`Confirma a exclusão da não conformidade "${$(this).children(".desc").text()}" do macroprocesso "${$(this).children(".mp").text()}"?`);    
    }); 
});

$('.concorda').click(function(){      
    remove(tr);        
});

function remove(tr){  
    $('body').toggleClass('not-active'); 
    $('.preloader-wrapper').toggleClass('active');
    $('#naoconformidades').prepend(preloader);    
    fetch(`http://localhost:3000/lista/${tr}`, { method: 'DELETE' })       
        .then(resposta => {                
            $(`#${tr}`).fadeOut(600);
        })
        .catch(erro => console.log(erro))
        .finally(function(){            
            $('.preloader-wrapper').remove();            
            $('.preloader-wrapper').toggleClass('active');
            $('body').toggleClass('not-active');
        });
}    