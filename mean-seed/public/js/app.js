'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/beers', {
      templateUrl: 'expose/beers/list',
      controller: 'BeerListController'
    }).
    when('/beers/add', {
      templateUrl: 'expose/beers/create',
      controller: 'BeerCreateController'
    }).
    when('/beers/:id', {
      templateUrl: 'expose/beers/show',
      controller: 'BeerShowController'
    }).
    when('/beers/:id/edit', {
      templateUrl: 'expose/beers/edit',
      controller: 'BeerEditController'
    }).
    when('/beers/:id/remove', {
      templateUrl: 'expose/beers/remove',
      controller: 'BeerRemoveController'
    }).
    when('/breweries', {
      templateUrl: 'expose/breweries/list',
      controller: 'BreweriesListController'
    }).
    when('/breweries/add', {
      templateUrl: 'expose/breweries/create',
      controller: 'BreweriesCreateController'
    }).
    when('/breweries/:id', {
      templateUrl: 'expose/breweries/show',
      controller: 'BreweriesShowController'
    }).
    when('/breweries/:id/edit', {
      templateUrl: 'expose/breweries/edit',
      controller: 'BreweriesEditController'
    }).
    when('/breweries/:id/remove', {
      templateUrl: 'expose/breweries/remove',
      controller: 'BreweriesRemoveController'
    }).
    otherwise({
      redirectTo: '/beers'
    });

    // when('/beers', {
    //   templateUrl: 'expose/beers/list',
    //   controller: 'BeerListController'
    // }).
    // when('/beers/add', {
    //   templateUrl: 'expose/beers/create',
    //   controller: 'BeerCreateController'
    // }).
  $locationProvider.html5Mode(true);
});
