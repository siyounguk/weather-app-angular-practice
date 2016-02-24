// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//requirements:
// homepage - city name and forecast page
// 

weatherApp.config(function($routeProvider){
  $routeProvider
      .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
      })
      .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
      })
})


weatherApp.service('cityService', function(){

    var self = this;

    self.city = "New York, NY";

});


weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
  $scope.city = cityService.city;

  $scope.$watch('city', function() {
      cityService.city = $scope.city;
  });
}]);


weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService){
  $scope.city = cityService.city;

  $scope.$watch('city', function() {
      cityService.city = $scope.city;
  });

  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=44db6a862fba0b067b1930da0d769e98",{
    callback: 'JSON_CALLBACK'}, {get: {method: 'JSONP'}
  });

  $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: 2});

  $scope.convertToCelsius = function(degK){
    return Math.round(degK - 273.15)
  }

  $scope.convertDate = function(date){
    return new Date(date * 1000);
  }

}]);