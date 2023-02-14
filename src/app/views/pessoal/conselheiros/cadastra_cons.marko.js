// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/pessoal/conselheiros/cadastra_cons.marko",
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
    marko_attr = marko_helpers.a,
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
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

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">Cadastrar Novo Conselheiro</h3><br><div class=\"card-panel hoverable blue lighten-5 z-depth-4 col s9\"><div class=\"row\"><form id=\"formCadCons\" name=\"formCons\"" +
    marko_attr("action", "/pessoal/restrito/conselheiros/cadastra/") +
    " method=\"post\"><h4>Dados Pessoais</h4><div class=\"row\"><input hidden id=\"cargo\" name=\"cargo\"" +
    marko_attr("value", "Conselheiro") +
    " type=\"text\"><div class=\"input-field col s5\"><i class=\"material-icons prefix\">account_circle</i><input id=\"nome\" name=\"nome\"" +
    marko_attr("value", "") +
    " type=\"text\" class=\"validate\"><label class=\"active\" for=\"nome\">Nome:</label></div><div class=\"input-field col s5\"><i class=\"material-icons prefix\">contact_mail</i><input id=\"email\" name=\"email\"" +
    marko_attr("value", "") +
    " type=\"email\" class=\"validate\"><label class=\"active\" for=\"email\">e-mail:</label></div></div><div class=\"row\"><div class=\"input-field col s4\"><i class=\"material-icons prefix\">info</i><input id=\"cpf\" name=\"cpf\"" +
    marko_attr("value", "") +
    " type=\"text\" class=\"validate\"><label class=\"active\" for=\"cpf\">CPF (SOMENTE NÚMEROS):</label></div><div class=\"input-field col s2\"><i class=\"material-icons prefix\">info_outline</i><input id=\"siape\" name=\"siape\"" +
    marko_attr("value", "") +
    " type=\"text\" class=\"validate\"><label class=\"active\" for=\"siape\">Siape:</label></div></div><div class=\"row\"><div class=\"input field col s3\"><input id=\"dtNasc\" name=\"dtNasc\"" +
    marko_attr("value", "") +
    " type=\"text\" class=\"datepicker\"><label for=\"dtNasc\">Data de Nascimento</label></div><div class=\"input-field col s2\"><i class=\"material-icons prefix\">contact_phone</i><input id=\"telefone\" name=\"telefone\"" +
    marko_attr("value", "") +
    " type=\"text\" class=\"validate\"><label class=\"active\" for=\"telefone\">Telefone:</label></div><div class=\"input-field col s2\"><i class=\"material-icons prefix\">phone_iphone</i><input id=\"celular\" name=\"celular\"" +
    marko_attr("value", "") +
    " type=\"text\" class=\"validate\"><label class=\"active\" for=\"celular\">Celular:</label></div></div><h4>Dados do Mandato</h4><div class=\"row\"><div class=\"form-group input-field turmaCons col s4\"><i class=\"material-icons prefix\">event_seat</i><select name=\"turmaCons\">");

  var $for$0 = 0;

  marko_forEach(data.unidades, function(unidade) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", "" + unidade.unidade) +
      ">" +
      marko_escapeXml(unidade.unidade) +
      "</option>");
  });

  out.w("</select><label for=\"turmaCons\">Turma/Câmara/Seção:</label></div><div class=\"input-field col s3\"><i class=\"material-icons prefix\">gps_fixed</i><input id=\"origem\" name=\"origem\"" +
    marko_attr("value", "") +
    " type=\"text\" class=\"validate\"><label class=\"active\" for=\"origem\">Representação:</label></div></div><div class=\"row\"><div class=\"input-field col s3\"><i class=\"material-icons prefix\">details</i><select id=\"tipo\" name=\"tipo\"><option value=\"Titular\">Titular</option><option value=\"Suplente\">Suplente</option></select><label>Titular/Suplente</label></div><div class=\"input field col s3\"><input id=\"dtInicio\" name=\"dtInicio\"" +
    marko_attr("value", "") +
    " type=\"text\" class=\"datepicker\"><label for=\"dtInicio\">Início do Último Mandato:</label></div><div class=\"form-group input-field funcao col s4\"><i class=\"material-icons prefix\">domain</i><select name=\"funcao\">");

  var $for$1 = 0;

  marko_forEach(data.funcoes, function(funcao) {
    var $keyScope$1 = "[" + (($for$1++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", "" + funcao.funcao) +
      ">" +
      marko_escapeXml(funcao.funcao) +
      "</option>");
  });

  out.w("</select><label for=\"funcao\">Função:</label></div><div class=\"input-field col s3\"><i class=\"material-icons prefix\">event_note</i><select id=\"mandatoAt\" name=\"mandatoAt\"><option value>Sim</option><option>Não</option></select><label>Mandato Ativo?</label></div></div><div class=\"card-action right-align\"><a class=\"btn-cons-salva btn-floating blue waves-effect waves-light hoverable z-depth-3\" type=\"submit\" title=\"Salvar\"><i class=\"material-icons\">save</i></a></div></form></div></div><div></div></div></main>");

  app_footer_tag({}, out, __component, "80");

  app_scripts_js_tag({}, out, __component, "81");

  out.w("<script src=\"/estatico/js/pessoal/cadcons.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "83");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/pessoal/conselheiros/cadastra_cons.marko",
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
