(function() {
  "use strict";

  var module = angular.module("psMovies");

  module.component("accordion", {
    transclude: true,
    template: "<div class='panel-group' ng-transclude></div>",
    controller: function () {
      var model = this;
      var panels = [];

      model.selectPanel = function(panel) {
        for(var i in panels) {
          if(panel === panels[i]) {
            panels[i].turnOn();
          } else {
            panels[i].turnOff();
          }
        }
      }

      model.addPanel = function(panel) {
        panels.push(panel);
        if(panels.length > 0) {
          panels[0].turnOn();
        }
      }
    }
  });

  module.component("accordionPanel", {
    bindings: {
      heading: '@'
    },
    require: {
      "parent": "^accordion"
    },
    controller: function() {
      var model = this;
      model.selected = false;

      model.turnOn = function() {
        model.selected = true;
      }

      model.turnOff = function() {
        model.selected = false;
      }

      model.select = function() {
        model.parent.selectPanel(model);
      }

      model.$onInit = function() {
        model.parent.addPanel(model);
      }
    },
    transclude: true,
    template: "<div class='panel panel-default'>" +
        "<div class='panel-heading' ng-click='$ctrl.select()'>" +
          "<h4 class='panel-title'>{{ $ctrl.heading }}</h4>" +
        "</div>" +
        "<div class='panel-body' ng-if='$ctrl.selected' ng-transclude></div>" +
      "</div>"
  })
}())