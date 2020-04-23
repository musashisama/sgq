// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/components/app-drop-download.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<a class=\"dropdownDownload waves-effect waves-yellow hoverable z-depth-3 btn-floating red\" href=\"#\" data-target=\"dropdown2\"><i class=\"material-icons\">file_download</i></a><ul id=\"dropdown2\" class=\"dropdown-content\"><li><a class=\"pdfDown\" href=\"#!\"><i class=\"pdfDown material-icons\">file_download</i>PDF</a></li><li class=\"divider\" tabindex=\"-1\"></li><li><a class=\"csvDown\" href=\"#!\"><i class=\"csvDown material-icons\">file_download</i>CSV</a></li><li class=\"divider\" tabindex=\"-1\"></li><li><a class=\"xlsxDown\" href=\"#!\"><i class=\"xlsxDown material-icons\">file_download</i>XLSX</a></li><li class=\"divider\" tabindex=\"-1\"></li></ul>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/components/app-drop-download.marko"
  };
