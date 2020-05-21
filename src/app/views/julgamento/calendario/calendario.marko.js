// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/calendario/calendario.marko",
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
    app_calendario_js_template = require("../../components/app-calendario-js.marko"),
    app_calendario_js_tag = marko_loadTag(app_calendario_js_template),
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

  out.w("<div class=\"container\"><div class=\"row\"><h3 class=\"center-align titulo\">Calendário de Sessões do CARF</h3></div><div class=\"row\"> <a id=\"aModal\" href=\"#modal1\" class=\"btn-legenda waves-effect waves-light btn-small\"><i class=\"material-icons left\">subtitles</i>Legenda</a></div><div class=\"row\"><div id=\"external-events\" class=\"left col s2\"><p><strong>Arraste a semana para o calendário:</strong></p><ul><li class=\"fc-event evCal Verde\">&nbsp</li><li class=\"fc-event evCal Amarela\">&nbsp</li><li class=\"fc-event evCal Azul\">&nbsp</li> <li class=\"fc-event evCal Vermelha\">&nbsp</li> <li class=\"fc-event evCal Roxa\">&nbsp</li> <li class=\"fc-event evCal Laranja\">&nbsp</li> <li class=\"fc-event evCal Cinza\">&nbsp</li> <li class=\"fc-event evCal VerdeClara\">&nbsp</li> <li class=\"fc-event evCal Rosa\">&nbsp</li> <li class=\"fc-event evCal Preta\">&nbsp</li> <li class=\"fc-event evCal AzulClara\">&nbsp</li><li class=\"fc-event evCal Musgo\">&nbsp</li> </ul> </div> <form id=\"formCal\" name=\"formCal\"" +
    marko_attr("data-cal", "" + data.cal) +
    " action=\"/julgamento/calendario/\" method=\"post\"></form> <div class=\"offset-s3 right\" id=\"calendar\"></div></div></div></main>");

  app_footer_tag({}, out, __component, "32");

  out.w("<div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Fechar</a> </div></div>");

  app_scripts_js_tag({}, out, __component, "39");

  app_calendario_js_tag({}, out, __component, "40");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "41");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/calendario/calendario.marko",
    tags: [
      "../../components/app-scripts-css.marko",
      "../../components/app-calendario-css.marko",
      "marko/src/core-tags/components/component-globals-tag",
      "../../components/app-header.marko",
      "../../components/app-navbar.marko",
      "../../components/app-footer.marko",
      "../../components/app-scripts-js.marko",
      "../../components/app-calendario-js.marko",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
