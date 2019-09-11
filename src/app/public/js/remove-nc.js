/* document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
}); */

let modal = document.querySelectorAll('.modal');
document.addEventListener('DOMContentLoaded', function() {    
    M.Modal.init(modal, {
        onCloseEnd: ''//remove()
    });
    
  });

  let concorda = document.querySelector('.concorda');
  concorda.addEventListener('click', (evento)=>{
      console.log(evento);
        remove();
  })

//TODO: Adicionar classe remoção ao botao "agree" e depois remover;

  function remove(){           
                 
    let tabelaNC = document.querySelector('#naoconformidades');
    tabelaNC.addEventListener('click', (evento) => {
    /* evento.preventDefault(); */

    let elementoClicado = evento.target;
    console.log(evento.currentTarget);
    console.log("Elemento clicado:" + elementoClicado);

    if (elementoClicado.dataset.type == 'remocao') {
            let ncId = elementoClicado.dataset.ref;
            console.log("NCID = "+ ncId);
            //fetch(`http://localhost:3000/livros/${ncId}`, { method: 'DELETE' })
            fetch(``, { method: 'DELETE' })
                .then(resposta => {                
                    //let tr = document.querySelector(`#nc_${ncId}`);
                    
                    let tr = elementoClicado.closest(`#nc_${ncId}`);
                    console.log(tr);
                    tr.remove();                
                    console.log("Removido");   
                                      
                })
                .catch(erro => console.log(erro));
        }
    });   
    //return '';
    tabelaNC.removeEventListener('click', null);
}
/* let tabelaNC = document.querySelector('#naoconformidades');
tabelaNC.addEventListener('click', (evento) => {
    evento.preventDefault();
    
    let elementoClicado = evento.target;
    console.log(evento.currentTarget);
console.log("Elemento clicado:" + elementoClicado);




if (elementoClicado.dataset.type == 'remocao') {
        let ncId = elementoClicado.dataset.ref;
        console.log("NCID = "+ ncId);
        //fetch(`http://localhost:3000/livros/${ncId}`, { method: 'DELETE' })
        fetch(``, { method: 'DELETE' })
            .then(resposta => {                
                //let tr = document.querySelector(`#nc_${ncId}`);
                
                let tr = elementoClicado.closest(`#nc_${ncId}`);
                console.log(tr);
                tr.remove();                
                console.log("Removido");
            })
            .catch(erro => console.log(erro));
    }
}); */