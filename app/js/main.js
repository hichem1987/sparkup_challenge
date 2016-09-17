

'use strict';


  var app = angular.module('SampleApp', ['ngRoute', 'ngAnimate']);

    app.config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      // routes
      $routeProvider
        .when("/", {
          templateUrl: "./partials/partial1.html",
          controller: "MainController"
        })
        .otherwise({
           redirectTo: '/'
        });
    }
  ]);

  //Load controller
  app.controller('MainController', [
    '$scope',
    function($scope) {
      
    }
  ]);

