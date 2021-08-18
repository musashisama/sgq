// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/suporte/gestaoindicacao/criaIndicacao.marko",
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
    app_footer_template = require("../../components/app-footer.marko"),
    app_footer_tag = marko_loadTag(app_footer_template),
    app_modal_template = require("../../components/app-modal.marko"),
    app_modal_tag = marko_loadTag(app_modal_template),
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

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">Criar Período de Indicação para Pauta</h3><br><div class=\"conteudoPrincipal\"></div><div class=\"row\"><h4>Colegiados</h4></div><div class=\"row\"><div class=\"col s4\"><i class=\"far fa-question-circle prefix\"></i><label for=\"tipoColegiado\">Colegiados:</label><select required name=\"tipoColegiado\" id=\"tipoColegiado\"><option class=\"form-group\" value=\"TE\">Turmas Extraordinárias</option><option class=\"form-group\" value=\"TOCSRF\">Turmas Ordinárias e Câmara Superior</option></select></div><div class=\"col s2\"><i class=\"far fa-question-circle prefix\"></i><label for=\"semana\">Semana:</label><select required name=\"semana\" id=\"semana\"><option class=\"form-group\" value=\"Verde\">Verde</option><option class=\"form-group\" value=\"Amarela\">Amarela</option><option class=\"form-group\" value=\"Azul\">Azul</option></select></div><div class=\"col s2\"><i class=\"far fa-question-circle prefix\"></i><label for=\"tipoSessao\">Tipo de Sessão:</label><select required name=\"tipoSessao\" id=\"tipoSessao\"><option class=\"form-group\" value=\"Ordinaria\">Ordinária</option><option class=\"form-group\" value=\"Extraordinaria\">Extraordinária</option></select></div></div><div class=\"row\"><h4>Períodos</h4></div><div class=\"row\"><div class=\"row\"><h5 class=\"col s6\">Mês da Indicação</h5><div class=\"col s3\"><i class=\"far fa-calendar-alt prefix\"></i><label for=\"mes\">Mês da Indicação:</label><select required name=\"mes\" id=\"mes\"><option class=\"form-group\" value=\"01\">Janeiro</option><option class=\"form-group\" value=\"02\">Fevereiro</option><option class=\"form-group\" value=\"03\">Março</option><option class=\"form-group\" value=\"04\">Abril</option><option class=\"form-group\" value=\"05\">Maio</option><option class=\"form-group\" value=\"06\">Junho</option><option class=\"form-group\" value=\"07\">Julho</option><option class=\"form-group\" value=\"08\">Agosto</option><option class=\"form-group\" value=\"09\">Setembro</option><option class=\"form-group\" value=\"10\">Outubro</option><option class=\"form-group\" value=\"11\">Novembro</option><option class=\"form-group\" value=\"12\">Dezembro</option></select></div><div class=\"col s3\"><span id=\"selectAno\"></span></div></div><div class=\"row\"><h5 class=\"col s6\">Período da Indicação pelos Conselheiros</h5><div class=\"form-group abreIndicacao input field col s3\"><input id=\"abreIndicacao\" name=\"abreIndicacao\" type=\"text\" class=\"datepicker\"><i class=\"fas fa-calendar-check prefix\"></i><label for=\"abreIndicacao\">Abertura da Indicação</label></div><div class=\"form-group fechaIndicacao input field col s3\"><input id=\"fechaIndicacao\" name=\"fechaIndicacao\" type=\"text\" class=\"datepicker\"><i class=\"fas fa-calendar-check prefix\"></i><label for=\"fechaIndicacao\">Data Limite da Indicação</label></div></div></div><div class=\"row\"><div class=\"col s12 offset-s12\"><a id=\"aModal\" class=\"btn-floating btn-large waves-effect waves-light green btn-cria\"" +
    marko_attr("href", "#modal1") +
    "><i class=\"material-icons right \">add</i></a></div></div></div></main>");

  app_footer_tag({}, out, __component, "69");

  app_modal_tag({}, out, __component, "70");

  app_scripts_js_tag({}, out, __component, "71");

  out.w("<script src=\"/estatico/js/julgamento/cosup/criaIndicacao.js\"></script>");

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
    id: "/sgq$1.0.0/src/app/views/suporte/gestaoindicacao/criaIndicacao.marko",
    tags: [
      "../../components/app-scripts-css.marko",
      "marko/src/core-tags/components/component-globals-tag",
      "../../components/app-header.marko",
      "../../components/app-navbar.marko",
      "../../components/app-footer.marko",
      "../../components/app-modal.marko",
      "../../components/app-scripts-js.marko",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
