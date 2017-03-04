var myWeatherApp = angular.module('myWeatherApp', ['ngRoute', 'ngResource']);

myWeatherApp.config(function ($routeProvider) {
                    
                    
    $routeProvider
    
        .when('/', {
            templateUrl: 'pages/home.htm',    
            controller: 'homeController'   
        })

        .when('/forecast', {
            templateUrl: 'pages/forecast.htm',    
            controller: 'forecastController'   
        })
            
       .when('/forecast/:days', {
            templateUrl: 'pages/forecast.htm',    
            controller: 'forecastController'   
        })
            
});

myWeatherApp.service('myWeatherAppService', function() {
 
    this.city = "2172797";
  
});

myWeatherApp.controller('homeController', ['$scope', 'myWeatherAppService', function ($scope, myWeatherAppService) {
     
    $scope.city = myWeatherAppService.city;
   
}]);



myWeatherApp.controller('forecastController', ['$scope','myWeatherAppService','$resource','$routeParams', function ($scope, myWeatherAppService,$resource,$routeParams) {
     $scope.days = $routeParams.days || '2';
     $scope.city = myWeatherAppService.city;
     $scope.$watch('city', function () {
           myWeatherAppService.city = $scope.city;
       });   
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast");
    
    $scope.weatherResult = $scope.weatherAPI.get({id:$scope.city ,cnt:$scope.days, apikey:'3514f186a2c3bdbad2d2c679e60c6e05'});
    $scope.convertToFarenhiet = function(degK){
         
      return Math.round((1.8 * (degK - 273)) + 32) ;
                        
    }
    
      $scope.convertToDate = function(date){
         
      return new Date(date * 1000) ;
                        
    }
    console.log($scope.weatherResult);
    
}]);

myWeatherApp.directive("weatherDirective",function(){
    
    return {
        restrict : 'AE',
        replace : true,
        templateUrl: 'directives/customDirective.htm',   
        scope:{
            weatherDay:"=",
            weatherDate:"&",
            weatherTemp:"&",
            dateFormat:"@"
        }
}
    
});
