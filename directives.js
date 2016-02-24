weatherApp.directive("forecastResults", function() {
   return {
      restrict: 'E',
      templateUrl: 'directives/forecastResults.html',
      replace: true,
      scope: {
          weatherDay: "=",
          convertToCelsius: "&",
          convertDate: "&",
          dateFormat: "@"
      }
   }
});