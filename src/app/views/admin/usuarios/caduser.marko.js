// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/admin/usuarios/caduser.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    marko_attr = marko_helpers.a,
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/normalize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/materialize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/google-fonts.css\"><link rel=\"stylesheet\" href=\"/estatico/css/main.css\"><title>Adicionar Usuário</title></head><body>");

  component_globals_tag({}, out);

  out.w("<header class=\"container-header cabecalho\"></header><main class=\"conteudoPrincipal\"><div class=\"container\"><h3 class=\"center-align\">Adicionar Usuário</h3><br><br><form id=\"formUser\" name=\"formUser\" action=\"/admin/usuario\" method=\"post\">");

  if (data.registroUser._id) {
    out.w("<div><input type=\"hidden\" name=\"_method\" value=\"PUT\"><input type=\"hidden\" name=\"id\"" +
      marko_attr("value", data.registroUser._id) +
      "></div>");
  }

  out.w("<div class=\"row\"><div class=\"form-group input-field cpfUser col s2\"><label for=\"cpfUser\">CPF do Usuário:</label><input required type=\"text\" id=\"cpfUser\" name=\"cpf\"" +
    marko_attr("value", data.registroUser.cpfUser) +
    " placeholder=\"Digite seu CPF\" class=\"form-control cpfuser\"></div><div class=\"form-group input-field  col s8\"><label for=\"nomeUser\">Nome do Usuário:</label><input type=\"text\" id=\"nomeUser\" name=\"nome\"" +
    marko_attr("value", data.registroUser.nomeUser) +
    " placeholder=\"Nome completo\" class=\"form-control\"></div></div><div class=\"row\"><div class=\"form-group input-field  col s4\"><label for=\"mailUser\">Endereço e-mail do Usuário:</label><input type=\"text\" id=\"mailUser\" name=\"mail\"" +
    marko_attr("value", data.registroUser.mailUser) +
    " placeholder=\"Endereço de e-mail no formato XXX.XXX@carf.economia.gov.br\" class=\"form-control docref\"></div><div class=\"form-group input-field equipeNC col s4\"><select name=\"unidadeLotacao\"><option class=\"form-group\" value=\"\" disabled selected>Clique para selecionar</option>");

  var $for$0 = 0;

  marko_forEach(data.und, function(und) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", data.registroUser.Sigla) +
      ">" +
      marko_escapeXml(und.Sigla) +
      "</option>");
  });

  out.w("</select><label for=\"unidadeLotacao\">Qual a unidade de lotação do usuário?</label></div></div><div class=\"row\"><div class=\"form-group input-field perfis col s4\"><label for=\"cargoUser\">Cargo do Usuário:</label><input type=\"text\" id=\"cargoUser\" name=\"cargo\"" +
    marko_attr("value", data.registroUser.cargoUser) +
    " placeholder=\"Cargo do Usuário\" class=\"form-control\"></div><div class=\"form-group input-field perfis col s4\"><select name=\"perfilUser\"><option class=\"form-group\" value=\"\" disabled selected>Clique para selecionar</option>");

  var $for$1 = 0;

  marko_forEach(data.prf, function(perfil) {
    var $keyScope$1 = "[" + (($for$1++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", data.registroUser.perfil) +
      ">" +
      marko_escapeXml(perfil.perfil) +
      "</option>");
  });

  out.w("</select><label for=\"perfilUser\">Qual o perfil do usuário?</label></div><div class=\"col s5 offset-s9\"><a id=\"aModal\" class=\"btn-floating btn-large waves-effect waves-light green hoverable btn-insere\" href=\"#modal1\"><i class=\"material-icons\">note_add</i></a></div></div> </form></div></main><footer class=\"page-footer rodape\"></footer><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div><script src=\"/estatico/js/libs/jquery-3.4.1.js\"></script><script src=\"/estatico/js/libs/materialize.js\"></script><script src=\"/estatico/js/loadtemplate.js\"></script><script src=\"/estatico/js/services/HttpService.js\"></script><script src=\"/estatico/js/validaUser.js\"></script><script src=\"/estatico/js/formcontrolUser.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "62");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/admin/usuarios/caduser.marko",
    tags: [
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
