(function() {
    "use strict";

    var module = angular.module("psMovies");

    function fetchMovies($http) {
        return $http.get("/movies.json")
                    .then(function(response) {
                        return response.data;
                    });
    }

    function controller($http) {

        var model = this;
        model.movies = [];

        model.$onInit = function() {
            fetchMovies($http).then(function(movies) {
                model.movies = movies;    
            });
        };
        
        model.upRating = function(movie) {
            if(movie.rating < 5) {
                movie.rating += 1;
            }
        };
        
        model.downRating = function(movie) {
            if(movie.rating > 1) {
                movie.rating -= 1;
            }
        };

        model.goTo = function(id) {
            model.$router.navigate(["Details", {id: id}, "Overview"]);
        };

        model.setRating = function(movie, newRating) {
            movie.rating = newRating;
        }
    }

    module.component("movieList", {
        templateUrl: "/ps-movies/movie-list.component.html",
        controller: ["$http", controller],
        bindings: {
            "$router": "<"
        }
    });

} ());