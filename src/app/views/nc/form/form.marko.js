// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/nc/form/form.marko",
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

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">Cadastrar Não Conformidade</h3><br><br><form id=\"formNC\" name=\"formNC\" action=\"/qualidade/adiciona-nc\" method=\"post\">");

  if (data.registroNC._id) {
    out.w("<div><input type=\"hidden\" name=\"_method\" value=\"PUT\"><input type=\"hidden\" name=\"id\"" +
      marko_attr("value", data.registroNC._id) +
      "></div>");
  }

  out.w("<div class=\"row\"><div class=\"form-group input-field cpfUser col s2\"><label for=\"titulo\" class=\"tooltipped\" data-position=\"bottom\" data-tooltip=\"Não se preocupe, seu CPF não irá constar nos dashboards!\">Seu CPF:</label><input required type=\"text\" id=\"titulo\" name=\"cpfUser\"" +
    marko_attr("value", data.registroNC.cpfUser) +
    " placeholder=\"Digite seu CPF\" class=\"form-control cpfuser tooltipped\" data-position=\"bottom\" data-tooltip=\"Não se preocupe, seu CPF não irá constar nos dashboards!\"></div><div class=\"form-group input-field  col s4\"><label for=\"docRef\">Documento de referência:</label><input type=\"text\" id=\"docRef\" name=\"docRef\"" +
    marko_attr("value", data.registroNC.ssdocRef) +
    " placeholder=\"(ex.: n° do Processo). Após digitar, clique em &quot;+&quot; para adicionar o processo.\" class=\"form-control docref chips chips-placeholder\"></div><div class=\"form-group input-field col s1\"><a class=\"btn-floating btn-small waves-effect waves-light blue hoverable\" href=\"\"><i class=\"material-icons addDoc tooltipped\" data-position=\"bottom\" data-tooltip=\"Clique aqui para incluir mais de um processo.\">add</i></a></div><div class=\"areachip form-group input-field col s5\"></div></div><div class=\"row\"><div class=\"form-group input-field mpProcUser col s4\"><select required name=\"mpProcUser\"><option class=\"form-group\" value=\"\" disabled selected>Clique para selecionar</option>");

  var $for$0 = 0;

  marko_forEach(data.mp, function(mp) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", data.registroNC.mprocUser) +
      ">" +
      marko_escapeXml(mp.macroprocesso) +
      "</option>");
  });

  out.w("</select><label for=\"mProcUser\">Qual o seu macroprocesso?</label></div><div class=\"form-group input-field mProcOrigem col s4\"><select required name=\"mProcOrigem\"><option class=\"form-group\" value=\"\" disabled selected>Clique para selecionar</option>");

  var $for$1 = 0;

  marko_forEach(data.mp, function(mp) {
    var $keyScope$1 = "[" + (($for$1++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", data.registroNC.mprocOrigem) +
      ">" +
      marko_escapeXml(mp.macroprocesso) +
      "</option>");
  });

  out.w("</select><label for=\"mProcOrigem\">Em qual macroprocesso a <strong>não conformidade</strong> teve origem?</label></div><div class=\"form-group input-field equipeNC col s4\"><select name=\"equipeNC\"><option class=\"form-group\" value=\"\" disabled selected>Clique para selecionar</option>");

  var $for$2 = 0;

  marko_forEach(data.und, function(und) {
    var $keyScope$2 = "[" + (($for$2++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", data.und.sigla) +
      ">" +
      marko_escapeXml(und.sigla) +
      "</option>");
  });

  out.w("</select><label for=\"equipeNC\">Unidade onde ocorreu a <strong>não conformidade</strong>:</label></div></div><div class=\"row\"><div class=\"form-group input-field descNC col s6\"><select name=\"descNC\"><option class=\"form-group\" value=\"\" disabled selected>Clique para selecionar</option>");

  var $for$3 = 0;

  marko_forEach(data.nconf, function(nconf) {
    var $keyScope$3 = "[" + (($for$3++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", data.nconf.nconformidade) +
      ">" +
      marko_escapeXml(nconf.nconformidade) +
      "</option>");
  });

  out.w("</select><label for=\"descNC\">Descrição da <strong>não conformidade</strong>:</label></div><div class=\"input-field col s6\"><i class=\"material-icons prefix\">mode_edit</i><textarea name=\"obsParticipante\" placeholder=\"Detalhamento maior de como ocorreu a não conformidade.\" id=\"icon_prefix2\" class=\"materialize-textarea\">" +
    marko_escapeXml(data.registroNC.obs) +
    "</textarea><label for=\"icon_prefix2\">Comentários do participante (opcional):</label></div></div><div class=\"row\"><div class=\"input-field col s2\"><p><label>Ação Imediata</label></p><p><label><input name=\"acaoImediata\" type=\"radio\" value=\"Correção\" checked class=\"hoverable\"><span>Correção</span></label></p><p><label><input name=\"acaoImediata\" type=\"radio\" value=\"Encaminhada para Correção\" class=\"hoverable\"><span><strong>Não conformidade</strong> encaminhada para correção</span></label></p></div><div class=\"input-field dataNC col s5\"><input type=\"text\" id=\"dataNC\" name=\"dataNC\" class=\"datepicker\"><label for=\"dataNC\" class=\"lbdataNC\">Quando ocorreu a <strong>não conformidade</strong>?</label></div><div class=\"input-field EncCorNC col s5\"><input type=\"text\" id=\"EncCorNC\" name=\"EncCorNC\" class=\"datepicker\"><label for=\"EncCorNC\" class=\"lbEncCorNC\">Quando a <strong>não conformidade</strong> foi encaminhada/Corrigida?</label></div><div class=\"col s5 offset-s11\"><a id=\"aModal\" class=\"btn-floating btn-large waves-effect waves-light green hoverable btn-insere\" href=\"#modal1\"><i class=\"material-icons\">note_add</i></a></div></div></form></div></main>");

  app_footer_tag({}, out, __component, "78");

  app_scripts_js_tag({}, out, __component, "79");

  out.w("<div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div><div id=\"naoconfs\" class=\"controle\">");

  marko_forEach(data.nconf, function(nconf) {
    out.w("\"" +
      marko_escapeXml(nconf.nconformidade) +
      "\":null,");
  });

  out.w("</div><script src=\"/estatico/js/nc/valida.js\"></script><script src=\"/estatico/js/nc/formcontrol.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "91");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/nc/form/form.marko",
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
