// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/admin/ocorrencias/tp_ocorrencias.marko",
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

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">Cadastrar novo tipo de Ocorrência</h3><br><br><form id=\"formOco\" name=\"formOco\" action=\"/admin/ocorrencias/cadastra\" method=\"post\"><div class=\"row\">");

  if (data.ocorrencia._id) {
    out.w("<div><input type=\"hidden\" name=\"_method\" value=\"PUT\"><input type=\"hidden\" name=\"_id\"" +
      marko_attr("value", "" + data.ocorrencia._id) +
      "></div>");
  }

  out.w("<div class=\"row\"><div class=\"form-group input-field cpfUser col s12\"><label for=\"tipoOcorrencia\">Qual é o tipo de ocorrência que deseja cadastrar?</label><textarea required type=\"text\" id=\"tipoOcorrencia\" name=\"tipoOcorrencia\"" +
    marko_attr("value", "" + data.ocorrencia.tipoOcorrencia) +
    " class=\"form-control materialize-textarea tipoOcorrencia alturaTextArea\">" +
    marko_escapeXml(data.ocorrencia.tipoOcorrencia) +
    "</textarea></div></div><div class=\"row\"><div class=\"form-group input-field descDet col s12\"><label for=\"descDet\">Descrição detalhada do tipo de ocorrência:</label><textarea required type=\"text\" id=\"descDet\" name=\"descDet\"" +
    marko_attr("value", "" + data.ocorrencia.descDet) +
    " class=\"form-control materialize-textarea descDet alturaTextArea\">" +
    marko_escapeXml(data.ocorrencia.descDet) +
    "</textarea></div><div class=\"col s12 right-align\"><a id=\"aModal\" class=\"btn-floating btn-large waves-effect waves-light green hoverable btn-insere\" href=\"#modal1\"><i class=\"material-icons\">add</i></a></div></div></div></form></div></main><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div>");

  app_footer_tag({}, out, __component, "34");

  app_scripts_js_tag({}, out, __component, "35");

  out.w("<script src=\"/estatico/js/base/tp_ocorrencias.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "37");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/admin/ocorrencias/tp_ocorrencias.marko",
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
