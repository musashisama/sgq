// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/components/app-navbar.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<ul id=\"slide-out\" class=\"sidenav\"><ul id=\"dropdownJulg\" class=\"dropdown-content\" style=\"width: 300px !important\"><li><a class=\"waves-effect\" href=\"/julgamento/restrito/carregacsv\"><i class=\"material-icons\">lock</i>Enviar relatório do e-Processo</a></li><li><a class=\"waves-effect\" href=\"/julgamento/restrito/escolhecsv\"><i class=\"material-icons\">lock</i>Diagnóstico de Estoque dos Conselheiros</a></li><li><a class=\"waves-effect\" href=\"/julgamento/restrito/escolhecsvregap\"><i class=\"material-icons\">lock</i>Acompanhamento de Prazos dos Conselheiros</a></li><li><a class=\"waves-effect\" href=\"#\"><i class=\"material-icons\">lock</i>Diagnóstico do Acervo de Processos do CARF</a></li></ul><ul id=\"dropdownQualidade\" class=\"dropdown-content\" style=\"width: 300px !important\"><li><a class=\"waves-effect\" href=\"/form\">Cadastrar nova Não Conformidade<i class=\"material-icons\">lock_open</i></a></li><li><a class=\"waves-effect\" href=\"http://10.202.24.111:3005/public/dashboard/9e707956-2b3a-4f87-bbef-254e6ea90c8d\">Dashboard das Não Conformidades<i class=\"material-icons\">lock_open</i></a></li><li><a class=\"waves-effect\" href=\"/listagem\">Listar Tipos de Não Conformidades<i class=\"material-icons\">lock_open</i></a></li><li><a class=\"waves-effect\" href=\"/gestao/listaregistronc\">Listar Todos os Registros de Não Conformidades<i class=\"material-icons\">lock</i></a></li><li><a class=\"waves-effect\" href=\"/gestao/cadastranc\">Cadastrar Novo Tipo de Não Conformidade<i class=\"material-icons\">lock</i></a></li><li><a class=\"waves-effect\" href=\"/gestao/lista\">Listar/Editar Tipos de Não Conformidades<i class=\"material-icons\">lock</i></a></li></ul><ul id=\"dropdownRiscos\" class=\"dropdown-content\" style=\"width: 300px !important\"><li><a class=\"waves-effect\" href=\"http://diris.carf\">Ambiente GRCI<i class=\"material-icons\">lock</i></a></li></ul><ul id=\"dropdownPessoas\" class=\"dropdown-content\" style=\"width: 300px !important\"><li><a class=\"waves-effect\" href=\"/pessoal/restrito/pessoas\">Relação de Pessoal do CARF<i class=\"material-icons\">lock</i></a></li><li><a class=\"waves-effect\" href=\"/pessoal/restrito/conselheiros/\">Conselheiros do CARF<i class=\"material-icons\">lock</i></a></li></ul></ul>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/components/app-navbar.marko"
  };
