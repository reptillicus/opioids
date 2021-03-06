import angular from "angular";
import MapCtrl from "./MapCtrl";

console.log(MapCtrl)
let app = angular.module("app", ["ui.router"])

app.config(function ($stateProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  
  $stateProvider
    .state('map', {
      url: '',
      templateUrl: 'templates/map.html',
      controller: 'MapCtrl as vm'
    })
})

app.controller('MapCtrl', MapCtrl);
