// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/pessoal/conselheiros/detalhacons.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    marko_escapeXml = marko_helpers.x,
    marko_attr = marko_helpers.a,
    marko_forEach = marko_helpers.f,
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/normalize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/materialize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/google-fonts.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/tabulator_materialize.min.css\"><link rel=\"stylesheet\" href=\"/estatico/css/main.css\"><title>Gestão de Pessoas do CARF</title></head><body>");

  component_globals_tag({}, out);

  out.w("<header class=\"container-header cabecalho\"></header><main class=\"conteudoPrincipal\"><ul id=\"slide-out\" class=\"sidenav\"></ul><div class=\"container\"><h3 class=\"center-align\">" +
    marko_escapeXml(data.conselheiro.nome) +
    " - " +
    marko_escapeXml(data.conselheiro.cpf) +
    "</h3><br><div class=\"card-panel hoverable blue lighten-5 z-depth-4 col s9\"><div class=\"row\"><form id=\"formCons\"" +
    marko_attr("data-conselheiros", "" + data.conselheiro) +
    " name=\"formCons\"" +
    marko_attr("action", ("/pessoal/restrito/conselheiros/" + data.conselheiro.cpf) + "/") +
    " method=\"post\"><h4>Dados Pessoais</h4><div class=\"row\"><div class=\"input-field col s5\"><i class=\"material-icons prefix\">account_circle</i><input disabled id=\"nome\" name=\"nome\"" +
    marko_attr("value", "" + data.conselheiro.nome) +
    " type=\"text\" class=\"validate\"><label class=\"active\" for=\"nome\">Nome:</label></div><div class=\"input-field col s5\"><i class=\"material-icons prefix\">contact_mail</i><input disabled id=\"email\" name=\"email\"" +
    marko_attr("value", "" + data.conselheiro.email) +
    " type=\"email\" class=\"validate\"><label class=\"active\" for=\"email\">e-mail:</label></div></div><div class=\"row\"><div class=\"input-field col s2\"><i class=\"material-icons prefix\">info</i><input disabled id=\"cpf\" name=\"cpf\"" +
    marko_attr("value", "" + data.conselheiro.cpf) +
    " type=\"text\" class=\"validate\"><label class=\"active\" for=\"cpf\">CPF:</label></div><div class=\"input-field col s2\"><i class=\"material-icons prefix\">info_outline</i><input disabled id=\"siape\" name=\"siape\"" +
    marko_attr("value", "" + data.conselheiro.siape) +
    " type=\"text\" class=\"validate\"><label class=\"active\" for=\"siape\">Siape:</label></div><div class=\"input field col s3\"><input disabled id=\"dtNasc\" name=\"dtNasc\"" +
    marko_attr("value", "" + data.conselheiro.dtNasc) +
    " type=\"text\" class=\"datepicker\"><label for=\"dtNasc\">Data de Nascimento</label></div><div class=\"input-field col s2\"><i class=\"material-icons prefix\">contact_phone</i><input disabled id=\"telefone\" name=\"telefone\"" +
    marko_attr("value", "" + data.conselheiro.telefone) +
    " type=\"text\" class=\"validate\"><label class=\"active\" for=\"telefone\">Telefone:</label></div><div class=\"input-field col s2\"><i class=\"material-icons prefix\">phone_iphone</i><input disabled id=\"celular\" name=\"celular\"" +
    marko_attr("value", "" + data.conselheiro.celular) +
    " type=\"text\" class=\"validate\"><label class=\"active\" for=\"celular\">Celular:</label></div></div><h4>Dados do Mandato</h4><div class=\"row\"><div class=\"form-group input-field turmaCons col s4\"><i class=\"material-icons prefix\">event_seat</i><select disabled name=\"turmaCons\"> <option class=\"form-group\"" +
    marko_attr("value", "" + data.conselheiro.turmaCons) +
    ">" +
    marko_escapeXml(data.conselheiro.turmaCons) +
    "</option> ");

  var $for$0 = 0;

  marko_forEach(data.unidades, function(unidade) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", "" + unidade.unidade) +
      ">" +
      marko_escapeXml(unidade.unidade) +
      "</option>");
  });

  out.w("</select><label for=\"turmaCons\">Turma/Câmara/Seção:</label></div><div class=\"input-field col s2\"><i class=\"material-icons prefix\">event_seat</i><input disabled id=\"turma\" name=\"turma\"" +
    marko_attr("value", "" + data.conselheiro.turma) +
    " type=\"text\" class=\"validate\"><label class=\"active\" for=\"turma\">Turma:</label></div><div class=\"input-field col s2\"><i class=\"material-icons prefix\">event_seat</i><input disabled id=\"camara\" name=\"camara\"" +
    marko_attr("value", "" + data.conselheiro.camara) +
    " type=\"text\" class=\"validate\"><label class=\"active\" for=\"camara\">Câmara:</label></div><div class=\"input-field col s2\"><i class=\"material-icons prefix\">event_seat</i><input disabled id=\"setor\" name=\"setor\"" +
    marko_attr("value", "" + data.conselheiro.setor) +
    " type=\"text\" class=\"validate\"><label class=\"active\" for=\"setor\">Seção:</label></div><div class=\"input-field col s3\"><i class=\"material-icons prefix\">gps_fixed</i><input disabled id=\"origem\" name=\"origem\"" +
    marko_attr("value", "" + data.conselheiro.origem) +
    " type=\"text\" class=\"validate\"><label class=\"active\" for=\"origem\">Representação:</label></div></div><div class=\"row\"><div class=\"input-field col s3\"><i class=\"material-icons prefix\">details</i><select disabled id=\"tipo\" name=\"tipo\"><option value=\"Titular\">Titular</option><option value=\"Suplente\">Suplente</option></select><label>Titular/Suplente</label></div><div class=\"input field col s3\"><input disabled id=\"dtInicio\" name=\"dtInicio\"" +
    marko_attr("value", "" + data.conselheiro.dtInicio) +
    " type=\"text\" class=\"datepicker\"><label for=\"dtInicio\">Início do Último Mandato:</label></div><div class=\"input-field col s2\"><i class=\"material-icons prefix\">domain</i><input disabled id=\"funcao\" name=\"funcao\"" +
    marko_attr("value", "" + data.conselheiro.funcao) +
    " type=\"text\" class=\"validate\"><label class=\"active\" for=\"funcao\">Função:</label></div><div class=\"input-field col s3\"><i class=\"material-icons prefix\">event_note</i><select disabled id=\"mandatoAt\" name=\"mandatoAt\"><option value>Sim</option><option>Não</option></select><label>Mandato Ativo?</label></div></div><div class=\"card-action right-align\"><a class=\"btn-cons-edita btn-floating red waves-effect waves-light hoverable z-depth-3\" title=\"Editar Dados\"><i class=\"material-icons\">edit</i></a><a disabled class=\"btn-cons-salva btn-floating blue waves-effect waves-light hoverable z-depth-3\" type=\"submit\" title=\"Salvar\"><i class=\"material-icons\">save</i></a><a id=\"aModal\" class=\"btn-cons-adiciona btn-floating green waves-effect waves-light hoverable z-depth-3\" title=\"Adicionar ocorrência\" href=\"#modal1\"><i class=\"material-icons\">add</i></a></div></form></div></div>");

  if (data.ocorrencias) {
    out.w("<div id=\"tabelaOcorrencias\"" +
      marko_attr("data-ocorrencias", "" + data.ocorrencias) +
      "></div><div" +
      marko_attr("data-tipoOcorrencias", "" + data.tipoOcorrencias) +
      "></div>");
  }

  out.w("</div></main><footer class=\"page-footer rodape\"></footer><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div><script src=\"/estatico/js/libs/jquery-3.4.1.js\"></script><script src=\"/estatico/js/libs/materialize.js\"></script><script src=\"/estatico/js/libs/tabulator.min.js\"></script> <script src=\"/estatico/js/loadtemplate.js\"></script><script src=\"/estatico/js/base/navbar.js\"></script> <script src=\"/estatico/js/pessoal/conselheiro.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "117");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/pessoal/conselheiros/detalhacons.marko",
    tags: [
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
