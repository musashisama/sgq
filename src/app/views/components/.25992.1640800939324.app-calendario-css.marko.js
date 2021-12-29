// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/components/app-calendario-css.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<link rel=\"stylesheet\" href=\"/estatico/css/libs/calendario/main.min.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/calendario/timegrid/main.min.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/calendario/list/main.min.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/calendario/daygrid/main.min.css\">");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/components/app-calendario-css.marko"
  };
