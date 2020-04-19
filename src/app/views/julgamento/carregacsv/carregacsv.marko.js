// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/carregacsv/carregacsv.marko",
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

  out.w("<div class=\"container\"><h3 class=\"center-align jurema\">Carga de Relatório CSV</h3><br><br><form id=\"formCSV\" name=\"formCSV\" action=\"/julgamento/restrito/carregacsv\" method=\"post\" enctype=\"multipart/form-data\"><div class=\"row\"><div class=\"file-field ctoastsucesso input-field form-group col s6\"><div class=\"btn\"><span>Arquivo</span><input type=\"file\" name=\"filetoupload\" accept=\".csv\" onchange=\"triggerValidation(this)\" required></div><div class=\"file-path-wrapper\"><input class=\"file-path validate\" type=\"text\"></div></div></div><div class=\"row\"><div class=\"col s2\"><div class=\"form-group\"><p><label>Qual relatório que deseja enviar?</label></p><p><label><input class=\"with-gap\" value=\"REGAP\" id=\"REGAP\" name=\"tipoRel\" type=\"radio\"><span>REGAP</span></label></p><p><label><input class=\"with-gap\" value=\"Estoque\" id=\"Estoque\" name=\"tipoRel\" type=\"radio\" checked><span>Estoque</span></label></p><p><label><input class=\"with-gap\" value=\"REINP\" id=\"REINP\" name=\"tipoRel\" type=\"radio\" disabled><span>REINP</span></label></p><p><label><input class=\"with-gap\" value=\"REJUL\" name=\"tipoRel\" type=\"radio\" disabled><span>REJUL</span></label></p></div></div><div class=\"col s2 soregap\"><div class=\"form-group\"><p><label>Qual a semana do REGAP:</label></p><p><label><input class=\"with-gap\" value=\"Amarela\" name=\"semana\" type=\"radio\" checked><span>Amarela</span></label></p><p><label><input class=\"with-gap\" value=\"Verde\" name=\"semana\" type=\"radio\"><span>Verde</span></label></p><p><label><input class=\"with-gap\" value=\"Azul\" name=\"semana\" type=\"radio\"><span>Azul</span></label></p></div></div><div class=\"input-field dataExt col s3\"><input type=\"text\" id=\"dataExt\" name=\"dataExt\" class=\"datepicker\" required><label for=\"dataExt\" class=\"lbdataNC\">Quando o relatório foi <strong>extraído</strong>?</label></div><div class=\"form-group col s2\"><button class=\"btn waves-effect waves-light concorda right\" type=\"submit\" name=\"action\">Enviar arquivo <i class=\"material-icons right\">send</i></button></div></div></form></div></main><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div>");

  app_footer_tag({}, out, __component, "70");

  app_scripts_js_tag({}, out, __component, "71");

  out.w("<script src=\"/estatico/js/julgamento/carregaCSV.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "73");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/carregacsv/carregacsv.marko",
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
