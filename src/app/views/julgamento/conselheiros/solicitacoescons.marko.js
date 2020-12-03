// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/conselheiros/solicitacoescons.marko",
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
    app_modal_tabela_legenda_template = require("../../components/app-modal-tabela-legenda.marko"),
    app_modal_tabela_legenda_tag = marko_loadTag(app_modal_tabela_legenda_template),
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

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">Registro de Solicitação</h3><div id=\"dataCAL\"" +
    marko_attr("data-cal", "" + data.cal) +
    "></div><div id=\"dataUser\"" +
    marko_attr("data-user", "" + data.user) +
    "></div><div class=\"row\"><div class=\"col s12 m12\"><div class=\"card hoverable cardAzul\"><div class=\"card-content\"><span class=\"card-title\">Orientações:</span><ul><li><i class=\"fas fa-bullhorn\"></i> As solicitações que constem afastamentos para redução de meta e justificativa de suspensão de prazos e faltas à sessões de julgamento deverão ser efetuadas <strong>após</strong> transcorrido o evento. Caso sejam efetuadas antes do evento, serão <strong>rejeitadas</strong>.</li><li><i class=\"fas fa-bullhorn\"></i> As solicitações de Dispensa de Sorteio só poderão ser enviadas caso o somatório total seja maior ou igual a 126 horas.</li><li><i class=\"fas fa-bullhorn\"></i> Retornos de Diligência e Retorno de Embargos não são considerados como horas excedentes para fins de Dispensa de Sorteio.</li></ul></div></div></div><ul id=\"classesSol\" class=\"collapsible popout col s6 m12\"><li><div class=\"collapsible-header\"><i class=\"fas fa-calendar-plus\"></i>REGAP - Justificar Suspensão de Prazos Regimentais</div><div class=\"collapsible-body\"><div class=\"collection\"><a href=\"#!\" id=\"aflp\" class=\"collection-item\">Afastamentos e Licenças</a><a href=\"#!\" id=\"ora\" class=\"collection-item\">Processo Objeto de Retificação de Ata</a><a href=\"#!\" id=\"pvv\" class=\"collection-item\">Prorrogação de Voto Vencedor - Autorizado pelo Presidente de Turma - art. 45, §1º, inciso II do RICARF</a><a href=\"#!\" id=\"ppa\" class=\"collection-item\">Prorrogação de Prazo autorizada pela Presidência do CARF - art. 45, §1º, inciso II, item b do RICARF</a><a href=\"#!\" id=\"dpa\" class=\"collection-item\">Justificativa para deixar de praticar de ato processual - Art. 45, IV RICARF</a><a href=\"#!\" id=\"ppi\" class=\"collection-item\">Demais Suspensões Autorizadas pela COJUL</a></div></div></li><li><div class=\"collapsible-header\"><i class=\"fas fa-level-down-alt\"></i>REINP - Redução de Horas da Meta de Produtividade</div><div class=\"collapsible-body\"><div class=\"collection\"><a href=\"#!\" id=\"aflm\" class=\"collection-item\">Afastamentos e Licenças</a><a href=\"#!\" id=\"ptoa\" class=\"collection-item\">Participação em sessão TO/CSRF a partir de abril de 2020</a><a href=\"#!\" id=\"pptex\" class=\"collection-item\">Participação em sessão presencial ou virtual de TEX para sustentação oral</a><a href=\"#!\" id=\"acp\" class=\"collection-item\">Não cumprimento da meta por ausência de carga de processo</a><a href=\"#!\" id=\"s21\" class=\"collection-item\">1º sorteio com prazo inferior a 21 dias da Indicação para Pauta</a><a href=\"#!\" id=\"presi\" class=\"collection-item\">Assumir interinamente Presidência de Turma por no mínimo um mês</a><a href=\"#!\" id=\"mcc\" class=\"collection-item\">Mudança de Colegiado que implique em alteração do calendário da sessão de julgamento</a></div></div></li><li><div class=\"collapsible-header\"><i class=\"fas fa-list-ul\"></i>Dispensa de Sorteio</div><div class=\"collapsible-body\"><div class=\"collection\"><a href=\"#!\" id=\"dds\" class=\"collection-item\">Dispensa de Sorteio</a></div></div></li><li><div class=\"collapsible-header\"><i class=\"far fa-calendar-times\"></i>Justificar Faltas à Sessões de Julgamento</div><div class=\"collapsible-body\"><div class=\"collection\"><a href=\"#!\" id=\"fsj\" class=\"collection-item\">Justificar Faltas à Sessões de Julgamento</a></div></div></li><li><div class=\"collapsible-header\"><i class=\"fas fa-clinic-medical\"></i>Licenças e Afastamentos para Controle da COGEC</div><div class=\"collapsible-body\"><div class=\"collection\"><a href=\"#!\" id=\"lacc\" class=\"collection-item\">Licenças e Afastamentos para Controle da COGEC</a></div></div></li></ul></div><div class=\"row\"><span id=\"camposSol\" style=\"display: none;\"></span></div></div></main><footer class=\"page-footer rodape\"></footer>");

  app_modal_tabela_legenda_tag({}, out, __component, "69");

  out.w("<div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda modal-close\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div>");

  app_footer_tag({}, out, __component, "78");

  app_modal_tag({}, out, __component, "79");

  app_scripts_js_tag({}, out, __component, "80");

  out.w("<script src=\"/estatico/js/libs/plotly-latest.min.js\"></script><script src=\"/estatico/js/libs/plotly-locale-pt-br.js\"></script><script>Plotly.setPlotConfig({locale: 'pt-BR'})</script><script src=\"/estatico/js/libs/quill.min.js\"></script><script src=\"/estatico/js/julgamento/conselheiros/regsolicitacoes.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "86");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/conselheiros/solicitacoescons.marko",
    tags: [
      "../../components/app-scripts-css.marko",
      "marko/src/core-tags/components/component-globals-tag",
      "../../components/app-header.marko",
      "../../components/app-navbar.marko",
      "../../components/app-modal-tabela-legenda.marko",
      "../../components/app-footer.marko",
      "../../components/app-modal.marko",
      "../../components/app-scripts-js.marko",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
