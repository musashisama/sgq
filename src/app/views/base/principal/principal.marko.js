// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/base/principal/principal.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/normalize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/materialize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/google-fonts.css\"><link rel=\"stylesheet\" href=\"/estatico/css/main.css\"><title>Sistema Integrado de Gestão</title></head><body>");

  component_globals_tag({}, out);

  out.w("<header class=\"container-header cabecalho\"></header><main class=\"conteudoPrincipal\"><div class=\"container\"><div class=\"row\">");

  if (data.msg) {
    out.w("<div id=\"toastsucesso\" class=\"ctoastsucesso\"></div>");
  }

  out.w("<div class=\"col s6 offset-s3 center-align\"><table class=\"centered highlight z-depth-3 responsive-table\" border-width=0><thead><br><br></thead><tbody><tr><td><a href=\"/form\"><strong>Cadastrar nova não conformidade</strong></a></td><td><a href=\"/form\"><i class=\"large material-icons circle\">add</i></a></td></tr><tr><td><a href=\"http://10.202.24.111:3005/public/dashboard/9e707956-2b3a-4f87-bbef-254e6ea90c8d\"><strong>Ir para o Dashboard</strong></a></td><td><a href=\"http://10.202.24.111:3005/public/dashboard/9e707956-2b3a-4f87-bbef-254e6ea90c8d\"><i class=\"large material-icons circle\">insert_chart</i></a></td></tr><tr><td><a href=\"/listagem\"><strong>Listar não conformidades</strong></a></td><td><a href=\"/listagem\"><i class=\"large material-icons circle\">format_list_bulleted</i></a></td></tr></tbody></table></div></div></div></main><footer class=\"page-footer rodape\"></footer><script src=\"/estatico/js/jquery-3.4.1.js\"></script><script src=\"/estatico/js/materialize.js\"></script><script src=\"/estatico/js/scprincipal.js\"></script><script src=\"/estatico/js/loadtemplate.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "46");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/base/principal/principal.marko",
    tags: [
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
