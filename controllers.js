weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
  $scope.city = cityService.city;

  $scope.$watch('city', function() {
      cityService.city = $scope.city;
  });
}]);


weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){
  $scope.city = cityService.city;

  $scope.$watch('city', function() {
      cityService.city = $scope.city;
  });

  $scope.days = $routeParams.days || "2";

  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=44db6a862fba0b067b1930da0d769e98",{
    callback: 'JSON_CALLBACK'}, {get: {method: 'JSONP'}
  });

  $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days});

  $scope.convertToCelsius = function(degK){
    return Math.round(degK - 273.15)
  }

  $scope.convertDate = function(date){
    return new Date(date * 1000);
  }
}]);