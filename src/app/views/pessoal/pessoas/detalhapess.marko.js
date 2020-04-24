// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/pessoal/pessoas/detalhapess.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    app_scripts_css_template = require("../../components/app-scripts-css.marko"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    app_scripts_css_tag = marko_loadTag(app_scripts_css_template),
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    app_header_template = require("../../components/app-header.marko"),
    app_header_tag = marko_loadTag(app_header_template),
    app_navbar_template = require("../../components/app-navbar.marko"),
    app_navbar_tag = marko_loadTag(app_navbar_template),
    marko_escapeXml = marko_helpers.x,
    marko_attr = marko_helpers.a,
    marko_forEach = marko_helpers.f,
    app_footer_template = require("../../components/app-footer.marko"),
    app_footer_tag = marko_loadTag(app_footer_template),
    app_scripts_js_template = require("../../components/app-scripts-js.marko"),
    app_scripts_js_tag = marko_loadTag(app_scripts_js_template),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html>");

  app_scripts_css_tag({}, out, __component, "1");

  out.w("<body>");

  component_globals_tag({}, out);

  app_header_tag({}, out, __component, "3");

  out.w("<main class=\"conteudoPrincipal\">");

  app_navbar_tag({
      id: "slide-out",
      class: "sidenav"
    }, out, __component, "5");

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">" +
    marko_escapeXml(data.pessoa.nome) +
    "</h3><br><div class=\"row\"><div class=\"col s12\"><ul class=\"tabs\"><li class=\"tab col s3\"><a href=\"#tabDados\">Dados Pessoais e Funcionais</a></li><li class=\"tab col s3\"><a href=\"#tabOcorrencias\">Ocorrências</a></li></ul></div><div id=\"tabDados\" class=\"col s12\"><div class=\"card-panel hoverable blue lighten-5 z-depth-4\"><div class=\"row\"><form id=\"formPessoa\"" +
    marko_attr("data-pessoa", "" + data.pessoa) +
    " name=\"formPessoa\"" +
    marko_attr("action", ("/pessoal/restrito/pessoas/" + data.pessoa.cpf) + "/") +
    " method=\"post\"><h4>Dados Pessoais</h4><div class=\"row\"><div class=\"input-field col s5\"><i class=\"material-icons prefix\">account_circle</i><input disabled id=\"nome\" name=\"nome\"" +
    marko_attr("value", "" + data.pessoa.nome) +
    " type=\"text\" class=\"validate selectCons\"><label class=\"active\" for=\"nome\">Nome:</label></div><div class=\"input-field col s5\"><i class=\"material-icons prefix\">contact_mail</i><input disabled id=\"email\" name=\"email\"" +
    marko_attr("value", "" + data.pessoa.email) +
    " type=\"email\" class=\"validate selectCons\"><label class=\"active\" for=\"email\">e-mail:</label></div></div><div class=\"row\"><div class=\"input-field col s2\"><i class=\"material-icons prefix\">info</i><input disabled id=\"cpf\" name=\"cpf\"" +
    marko_attr("value", "" + data.pessoa.cpf) +
    " type=\"text\" class=\"validate selectCons\"><label class=\"active\" for=\"cpf\">CPF:</label></div><div class=\"input-field col s2\"><i class=\"material-icons prefix\">info_outline</i><input disabled id=\"siape\" name=\"siape\"" +
    marko_attr("value", "" + data.pessoa.siape) +
    " type=\"text\" class=\"validate selectCons\"><label class=\"active\" for=\"siape\">Siape:</label></div><div class=\"input field col s3\"><input disabled id=\"dtNasc\" name=\"dtNasc\"" +
    marko_attr("value", "" + data.pessoa.dtNasc) +
    " type=\"text\" class=\"datepicker selectCons\"><label for=\"dtNasc\">Data de Nascimento</label></div><div class=\"input-field col s2\"><i class=\"material-icons prefix\">contact_phone</i><input disabled id=\"telefone\" name=\"telefone\"" +
    marko_attr("value", "" + data.pessoa.telefone) +
    " type=\"text\" class=\"validate selectCons\"><label class=\"active\" for=\"telefone\">Telefone:</label></div><div class=\"input-field col s2\"><i class=\"material-icons prefix\">phone_iphone</i><input disabled id=\"celular\" name=\"celular\"" +
    marko_attr("value", "" + data.pessoa.celular) +
    " type=\"text\" class=\"validate selectCons\"><label class=\"active\" for=\"celular\">Celular:</label></div></div><h4>Dados Funcionais</h4><div class=\"row\"><div class=\"form-group input-field unidade col s6\"><i class=\"material-icons prefix\">event_seat</i><input hidden id=\"setor\" name=\"setor\"" +
    marko_attr("value", "") +
    " type=\"text\"><select disabled name=\"unidade\" class=\"selectCons\"><option class=\"form-group\"" +
    marko_attr("value", "" + data.pessoa.unidade) +
    ">" +
    marko_escapeXml(data.pessoa.unidade) +
    "</option>");

  var $for$0 = 0;

  marko_forEach(data.unidades, function(unidade) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", "" + unidade.sigla) +
      ">" +
      marko_escapeXml(unidade.sigla) +
      "</option>");
  });

  out.w("</select><label for=\"unidade\">Unidade:</label></div> <div class=\"input-field col s3\"><i class=\"material-icons prefix\">gps_fixed</i><input disabled id=\"origem\" name=\"origem\"" +
    marko_attr("value", "" + data.pessoa.origem) +
    " type=\"text\" class=\"validate selectCons\"><label class=\"active\" for=\"origem\">Origem:</label></div></div><div class=\"row\"><div class=\"form-group input-field funcao col s4\"><i class=\"material-icons prefix\">domain</i><select disabled name=\"funcao\" class=\"selectFunc\"><option selected class=\"form-group\"" +
    marko_attr("value", "" + data.pessoa.funcao) +
    ">" +
    marko_escapeXml(data.pessoa.funcao) +
    "</option>");

  var $for$1 = 0;

  marko_forEach(data.funcoes, function(funcao) {
    var $keyScope$1 = "[" + (($for$1++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", "" + funcao.funcao) +
      ">" +
      marko_escapeXml(funcao.funcao) +
      "</option>");
  });

  out.w("</select><label for=\"funcao\">Função:</label></div></div><div class=\"card-action right-align\"><a class=\"btn-cons-edita btn-floating red waves-effect waves-light hoverable z-depth-3\" title=\"Editar Dados\"><i class=\"material-icons\">edit</i></a><a disabled class=\"btn-cons-salva btn-floating blue waves-effect waves-light hoverable z-depth-3\" type=\"submit\" title=\"Salvar\"><i class=\"material-icons\">save</i></a><a id=\"aModal\" class=\"btn-cons-adiciona btn-floating green waves-effect waves-light hoverable z-depth-3\" title=\"Adicionar ocorrência\" href=\"#modal1\"><i class=\"material-icons\">add</i></a></div></form></div></div></div><div id=\"tabOcorrencias\" class=\"col s12\"><a id=\"aModal2\" class=\"btn-cons-adiciona2 btn-floating green waves-effect waves-light hoverable z-depth-3 right\" title=\"Adicionar ocorrência\" href=\"#modal1\"><i class=\"material-icons\">add</i></a><h3 class=\"center-align\">Ocorrências</h3>");

  if (data.ocorrencias) {
    out.w("<div id=\"tabelaOcorrencias\"" +
      marko_attr("data-ocorrencias", "" + data.ocorrencias) +
      "></div>");
  }

  out.w("</div></div><div></div></div></main><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Inclusão de Ocorrência</h4><p class=\"pModal\"><form id=\"formOcorrencia\"" +
    marko_attr("data-tipoOcorrencias", "" + data.tipoOcorrencias) +
    " name=\"formOcorrencia\"" +
    marko_attr("action", ("/pessoal/restrito/pessoas/" + data.pessoa.cpf) + "/ocorrencia") +
    " method=\"post\"><div id=\"editaDiv\"></div><div class=\"row\"><br></div><input hidden id=\"cpfOcorrencia\" name=\"cpf\"" +
    marko_attr("value", "" + data.pessoa.cpf) +
    " type=\"text\"><div class=\"row\"><div class=\" input-field col s4\"><i class=\"material-icons prefix\">border_color</i><select name=\"tipoOcorrencia\">");

  var $for$2 = 0;

  marko_forEach(data.tipoOcorrencias, function(ocorrencia) {
    var $keyScope$2 = "[" + (($for$2++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", "" + ocorrencia.tipoOcorrencia) +
      ">" +
      marko_escapeXml(ocorrencia.tipoOcorrencia) +
      "</option>");
  });

  out.w("</select><label for=\"tipoOcorrencia\">Selecione o tipo de ocorrência:</label></div></div><div class=\"row\"><br></div><div class=\"row\"><div class=\"input-field col s12\"><i class=\"material-icons prefix\">mode_edit</i><textarea name=\"ocorDet\" id=\"ocorDet\" class=\"materialize-textarea\" placeholder=\"Este campo aceita &lt;ENTER>. Descreva aqui o nº da Portaria, Detalhes da notificação (arts do RICARF), nº do processo, nº SEI etc.\"></textarea><label for=\"ocorDet\">Detalhes da Ocorrência:</label></div></div><div class=\"row\"><br></div><div class=\"row\"><div class=\"input field col s3\"><i class=\"material-icons prefix\">insert_invitation</i><input id=\"dtOcorrencia\" name=\"dtOcorrencia\" value=\"\" type=\"text\" class=\"datepicker\"><label for=\"dtOcorrencia\">Data da Ocorrência</label></div> </div></form></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"modal-close btn waves-effect waves-light concordaOco\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div><div id=\"modal2\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal2\">Modal Header</h4><p class=\"pModal2\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div>");

  app_footer_tag({}, out, __component, "124");

  app_scripts_js_tag({}, out, __component, "125");

  out.w("<script src=\"/estatico/js/pessoal/pessoa.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "127");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/pessoal/pessoas/detalhapess.marko",
    tags: [
      "../../components/app-scripts-css.marko",
      "marko/src/core-tags/components/component-globals-tag",
      "../../components/app-header.marko",
      "../../components/app-navbar.marko",
      "../../components/app-footer.marko",
      "../../components/app-scripts-js.marko",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
