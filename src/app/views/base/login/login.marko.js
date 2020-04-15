// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/base/login/login.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    marko_escapeXml = marko_helpers.x,
    marko_attr = marko_helpers.a,
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/normalize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/materialize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/google-fonts.css\"><link rel=\"stylesheet\" href=\"/estatico/css/main.css\"><title>Sistema Integrado de Gestão</title></head><body>");

  component_globals_tag({}, out);

  out.w("<header class=\"container-header cabecalho\"></header><main class=\"conteudoPrincipal\"><div class=\"container\"><h3 class=\"center-align\">Autenticação de Usuário</h3><div class=\"row\">");

  if (data.msg) {
    out.w("<div class=\"login_error col s4 offset-s4 center-align\"> <h6><i class=\"material-icons prefix\">error</i>" +
      marko_escapeXml(data.msg) +
      "</h6></div>");
  }

  out.w("<div class=\"col s6 offset-s3 center-align\"><form action=\"/login\" method=\"post\"><div class=\"form-group input-field cpf\"><i class=\"material-icons prefix\">account_circle</i><label for=\"cpf\">CPF:</label><input type=\"text\" autocomplete=\"username\" id=\"cpf\" name=\"cpf\"" +
    marko_attr("value", data.id) +
    " placeholder=\"Digite seu CPF.\" class=\"form-control tooltipped\" data-position=\"bottom\" data-tooltip=\"Somente números.\"></div><div class=\"form-group input-field pwd\"><i class=\"material-icons prefix\">lock</i><input type=\"password\" autocomplete=\"current-password\" id=\"pwd\" name=\"pwd\"" +
    marko_attr("value", data.pwd) +
    " placeholder=\"Digite sua senha.\" class=\"form-control\"></div><div class=\"form-group\"><button class=\"btn waves-effect waves-light concorda right\" type=\"submit\" name=\"action\">Efetuar login <i class=\"material-icons right\">send</i></button></div></form></div></div></div></main><footer class=\"page-footer rodape\"></footer><script src=\"/estatico/js/libs/jquery-3.4.1.js\"></script><script src=\"/estatico/js/libs/materialize.js\"></script><script src=\"/estatico/js/loadtemplate.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "33");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/base/login/login.marko",
    tags: [
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
