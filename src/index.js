import angular from "angular";
import MapCtrl from "./MapCtrl";

console.log(MapCtrl)
let app = angular.module("app", ["ui.router"])

app.config(function ($stateProvider, $locationProvider) {


  
  $stateProvider
    .state('map', {
      url: '',
      templateUrl: 'templates/map.html',
      controller: 'MapCtrl as vm'
    })
})

app.controller('MapCtrl', MapCtrl);
