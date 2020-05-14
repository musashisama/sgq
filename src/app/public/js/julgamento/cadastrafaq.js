let quillPerg,
    quillResp;

inicializaComponentes();
function inicializaComponentes() {
    $(document).ready(function () {
        editorPergunta();
        editorResposta();
        btnInsere();
    });
}


function editorPergunta() {

           quillPerg = new Quill('#editorPergunta', {
                theme: 'snow'
              });

}

function editorResposta() {
  quillResp = new Quill('#editorResposta', {
                theme: 'snow'
              });
}

function btnInsere() {
    $('.btn-insere').click(e => {
        console.log(quillPerg.getText());
        console.log(quillResp.getContents());
    })
}