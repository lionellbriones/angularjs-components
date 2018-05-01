(function() {
  "use strict";

  var module = angular.module("psMovies");

  module.component("movieDetails", {
    templateUrl: "/ps-movies/movie-details.component.html",
    $canActivate: function($timeout) {
      return $timeout(function() {
        return true;
      }, 100)
    },
    $routeConfig: [
      {path: "/overview", component: "movieOverview", name: "Overview"},
      {path: "/cast", component: "movieCast", name: "Cast"},
      {path: "/director", component: "movieDirector", name: "Director"}
    ],
    controller: function() {
      var model = this;

      model.$routerOnActivate = function(next, previous) {
        model.id = next.params.id;
      }
    }
  });

  module.component("movieOverview", {
    template: "This is the overview."
  });

  module.component("movieCast", {
    template: "This is info about the cast."
  });

  module.component("movieDirector", {
    template: "This is info about the director."
  });
}())