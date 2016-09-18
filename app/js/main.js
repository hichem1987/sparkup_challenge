/*jshint strict:false */

'use strict';


  var app = angular.module('SampleApp', ['ngRoute', 'ngAnimate', 'openWeatherApp.services', 'openWeatherApp.directives', 'iso-3166-country-codes']);

    app.config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      // routes
      $routeProvider
        .when("/", {
          templateUrl: "./partials/partial1.html",
          controller: "OpenWeatherCtrl"
        })
        .otherwise({
           redirectTo: '/'
        });
    }
  ]);
  app.controller('MainController', [
    '$scope',
    function($scope) {
      
    }
  ]);

