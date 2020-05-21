// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/calendario/calendarioView.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    app_scripts_css_template = require("../../components/app-scripts-css.marko"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    app_scripts_css_tag = marko_loadTag(app_scripts_css_template),
    app_calendario_css_template = require("../../components/app-calendario-css.marko"),
    app_calendario_css_tag = marko_loadTag(app_calendario_css_template),
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    app_header_template = require("../../components/app-header.marko"),
    app_header_tag = marko_loadTag(app_header_template),
    app_navbar_template = require("../../components/app-navbar.marko"),
    app_navbar_tag = marko_loadTag(app_navbar_template),
    marko_attr = marko_helpers.a,
    app_footer_template = require("../../components/app-footer.marko"),
    app_footer_tag = marko_loadTag(app_footer_template),
    app_scripts_js_template = require("../../components/app-scripts-js.marko"),
    app_scripts_js_tag = marko_loadTag(app_scripts_js_template),
    app_calendario_view_js_template = require("../../components/app-calendario-view-js.marko"),
    app_calendario_view_js_tag = marko_loadTag(app_calendario_view_js_template),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html>");

  app_scripts_css_tag({}, out, __component, "1");

  app_calendario_css_tag({}, out, __component, "2");

  out.w("<body>");

  component_globals_tag({}, out);

  app_header_tag({}, out, __component, "4");

  out.w("<main class=\"conteudoPrincipal\">");

  app_navbar_tag({}, out, __component, "6");

  out.w("<div class=\"container\"><div class=\"row\"><h3 class=\"center-align titulo\">Calendário de Sessões do CARF</h3></div><div class=\"row\"> <a id=\"aModal\" href=\"#modal1\" class=\"btn-legenda waves-effect waves-light btn-small\"><i class=\"material-icons left\">subtitles</i>Legenda</a></div><div class=\"row\"> <div id=\"divCal\"" +
    marko_attr("data-cal", "" + data.cal) +
    "></div><div class=\"center-align\" id=\"calendar\"></div></div></div></main>");

  app_footer_tag({}, out, __component, "16");

  out.w("<div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Fechar</a> </div></div>");

  app_scripts_js_tag({}, out, __component, "23");

  app_calendario_view_js_tag({}, out, __component, "24");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "25");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/calendario/calendarioView.marko",
    tags: [
      "../../components/app-scripts-css.marko",
      "../../components/app-calendario-css.marko",
      "marko/src/core-tags/components/component-globals-tag",
      "../../components/app-header.marko",
      "../../components/app-navbar.marko",
      "../../components/app-footer.marko",
      "../../components/app-scripts-js.marko",
      "../../components/app-calendario-view-js.marko",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
