// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/riscos/lista/lista.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    marko_attr = marko_helpers.a,
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><head><meta charset=\"utf-8\"> </head><body>");

  component_globals_tag({}, out);

  out.w("<header class=\"cabecalhoPrincipal\"><div class=\"container\"><div class=\"row align-items-center\"><div class=\"col-4\"></div><div class=\"cabecalhoPrincipal-navegacao col-8\"><a href=\"#\" class=\"login\"><i class=\"fas fa-sign-in-alt\"></i>Login</a></div></div></div></header><main class=\"conteudoPrincipal\"><div class=\"container\"><h1> Listagem de livros </h1><table id=\"riscos\" class=\"table table-striped table-hover\"><thead class=\"thead-dark\"><tr><th>ID</th><th>Título</th><th>Preço</th><th>Editar</th><th>Remover</th></tr></thead><tbody>");

  var $for$0 = 0;

  marko_forEach(data.riscos, function(risco) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<tr" +
      marko_attr("id", "risco_" + risco.idRisco) +
      "><td>" +
      marko_escapeXml(risco.idRisco) +
      "</td><td>" +
      marko_escapeXml(risco.NomeRisco) +
      "</td><td>" +
      marko_escapeXml(risco.descRisco) +
      "</td><td><a" +
      marko_attr("href", "/livros/form/" + risco.id) +
      ">Editar</a></td><td><a href=\"#\"" +
      marko_attr("data-ref", "" + risco.id) +
      " data-type=\"remocao\">Remover</a></td></tr>");
  });

  out.w("</tbody></table></div></main><footer class=\"rodape\"></footer>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "32");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/riscos/lista/lista.marko",
    tags: [
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
