// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/conselheiros/regap_individual.marko",
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
    app_valor_maximo_template = require("../../components/app-valor-maximo.marko"),
    app_valor_maximo_tag = marko_loadTag(app_valor_maximo_template),
    app_drop_download_template = require("../../components/app-drop-download.marko"),
    app_drop_download_tag = marko_loadTag(app_drop_download_template),
    app_modal_tabela_legenda_template = require("../../components/app-modal-tabela-legenda.marko"),
    app_modal_tabela_legenda_tag = marko_loadTag(app_modal_tabela_legenda_template),
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

  out.w("<div id=\"caixa\" class=\"container\"><div id=\"dataCAL\"" +
    marko_attr("data-cal", "" + data.cal) +
    "></div><h3 class=\"center-align titulo\">Relatório Gerencial de Acompanhamento de Prazos</h3><br><h6></h6><div class=\"col s12 m12\"><div class=\"card hoverable cardAzul\"><div class=\"card-content\">Falta(m) <strong><span id=\"daps\"></span></strong> dia(s) para a próxima sessão, que será realizada em <strong><span id=\"ps\"></span></strong>.</div></div></div><div class=\"row\"><div class=\"col s12\"><ul class=\"tabs\"><li class=\"tab col s3\"><a href=\"#processos\">Processos</a></li><li id=\"stata\" class=\"tab col s3\"><a href=\"#stats\">Estatísticas</a></li><li class=\"tab col s3\"><a href=\"#apes749\">Apuração Especial nº 749</a></li></ul></div><div id=\"processos\" class=\"col s12\"><br><div class=\"row\"><div class=\"form-group input-field  col s3\"><select class=\"dataRelRegap\" name=\"dataRelRegap\" id=\"dataRelRegap\"><option id=\"optionsRegap\" class=\"form-group\"" +
    marko_attr("value", "") +
    " disabled selected>Clique para selecionar</option></select><label>Selecione a data do relatório:</label></div><div class=\"form-group input-field  col s3\"><select class=\"Atividade\" name=\"atividadeSelect\" id=\"atividadeSelect\"><option class=\"form-group\" value=\"Todas\" selected>Todas</option><option class=\"form-group\" value=\"Para Relatar\">Para Relatar</option><option class=\"form-group\" value=\"Formalizar Decisao\">Formalizar Decisão</option><option class=\"form-group\" value=\"Formalizar Voto Vencedor\">Formalizar Voto Vencedor</option><option class=\"form-group\" value=\"Corrigir Decisão\">Corrigir Decisão</option><option class=\"form-group\" value=\"Apreciar e Assinar Documento\">Apreciar e Assinar Documento</option></select><label>Selecione a atividade para filtrar:</label></div><div class=\"notFound col s6\"></div></div><div class=\"row\"><div class=\"form-group input-field  col s2\"><label><input name=\"expandirCheck\" id=\"expandirCheck\" type=\"checkbox\"><span>Expandir Tabela</span></label></div><div class=\"form-group input-field  col s2\"><label><input name=\"repetitivosCheck\" id=\"repetitivosCheck\" type=\"checkbox\"><span>Ocultar Repetitivos</span></label></div><div class=\"form-group input-field  col s2\"><label><input name=\"aguardandoPauta\" id=\"aguardandoPauta\" type=\"checkbox\"><span>Somente \"Aguardando Pauta\"?</span></label></div>");

  app_valor_maximo_tag({}, out, __component, "57");

  out.w("<div class=\"col s4\"></div><div class=\"form-group input-field  col s2\"><label><input name=\"juntadaCheck\" id=\"juntadaCheck\" type=\"checkbox\"><span>Solicitação de Juntada Pendente?</span></label></div></div><div class=\"row\"><div class=\"col s12 right-align\">");

  app_drop_download_tag({}, out, __component, "65");

  out.w("<a href=\"#!\" id=\"mostraColunasAtividade\" title=\"Agrupar/Desagrupar por Atividade\" class=\"waves-effect waves-green hoverable z-depth-3 btn-floating blue\"><i class=\"material-icons\">unfold_less</i></a><a href=\"#!\" id=\"agrupaData\" title=\"Agrupar/Desagrupar por Data de Distribuição\" class=\"waves-effect waves-green hoverable z-depth-3 btn-floating grey\"><i class=\"material-icons\">unfold_less</i></a><a href=\"#modal2\" id=\"mostraLegenda\" title=\"Mostrar Legenda da Tabela\" class=\"waves-effect waves-purple hoverable z-depth-3 btn-floating black\"><i class=\"material-icons\">details</i></a></div></div><div id=\"tabelaRegap\"></div><p><div class=\"col s12 m12\"><div class=\"card hoverable cardVermelho\"><div class=\"card-content\"><span class=\"card-title center\">ATENÇÃO</span><a id=\"oitomilhoes\"></a>* O campo \"Valor Originário\" é extraído diretamente do e-Processo e não leva em consideração outros fatores que possam alterar o valor a ser considerado para indicação. Dessa forma, para casos concretos, deverão ser somadas a esse valor outras informações, nos termos das <strong>orientações para indicação de pauta</strong>.</div></div></div></p></div><div id=\"stats\" class=\"col s12\"><h4>Quantidade de processos por atividade:</h4><div class=\"row\"><div class=\"s12\" style=\"width:100%;\" id=\"barrasAtividade\"></div></div></div><div id=\"apes749\" class=\"col s12\"><h4 id=\"gerApes749\" class=\"center\">Gerencial Apuração Especial 749</h4><div class=\"row\"><div class=\"row\"><div class=\"col s12 left-align\"><a id=\"listaProcApes\" class=\"waves-effect waves-light btn\"><i class=\"material-icons right\">cloud</i>Listar Processos</a></div><div class=\"col s12 left-align\"><span>Situação em 19/02/2021 - Data de Correção da APES pelo Serpro</span></div><div class=\"col s12 right-align\"><a href=\"#!\" id=\"mostraColunasAtividadeApes\" title=\"Agrupar/Desagrupar por Atividade\" class=\"waves-effect waves-green hoverable z-depth-3 btn-floating blue\"><i class=\"material-icons\">unfold_less</i></a><a href=\"#!\" id=\"xlsxDownApes\" title=\"Download da Tabela\" class=\"waves-effect waves-yellow hoverable z-depth-3 btn-floating red\"><i class=\"material-icons\">file_download</i></a></div></div><p><div id=\"tabelaApes\"></div></p></div></div></div></div></main><footer class=\"page-footer rodape\"></footer>");

  app_modal_tabela_legenda_tag({}, out, __component, "101");

  out.w("<div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div>");

  app_footer_tag({}, out, __component, "110");

  app_scripts_js_tag({}, out, __component, "111");

  out.w("<script src=\"/estatico/js/libs/plotly-latest.min.js\"></script><script src=\"/estatico/js/libs/plotly-locale-pt-br.js\"></script><script>Plotly.setPlotConfig({locale: 'pt-BR'})</script><script src=\"/estatico/js/julgamento/helpers/configTabelaNovoRegap.js\"></script><script src=\"/estatico/js/julgamento/conselheiros/regap.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "117");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/conselheiros/regap_individual.marko",
    tags: [
      "../../components/app-scripts-css.marko",
      "marko/src/core-tags/components/component-globals-tag",
      "../../components/app-header.marko",
      "../../components/app-navbar.marko",
      "../../components/app-valor-maximo.marko",
      "../../components/app-drop-download.marko",
      "../../components/app-modal-tabela-legenda.marko",
      "../../components/app-footer.marko",
      "../../components/app-scripts-js.marko",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
