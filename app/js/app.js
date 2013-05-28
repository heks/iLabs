

var app = angular.module('mobileApp', ['ui.bootstrap']);
 
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/partial1', {
        templateUrl: '/partials/partial1.html',
        controller: appController
    });
    
    $routeProvider.when('/partial2', {
      templateUrl: '/partials/partial2.html',
      controller: appController
    });

    $routeProvider.when('/partial3', {
      templateUrl: '/partials/partial3.html',
      controller: appController
    });

    $routeProvider.when('/partial4', {
      templateUrl: '/partials/partial4.html',
      controller: appController
    });

    $routeProvider.when('', {
      templateUrl: '/index.html',
      controller: appController
    });

    $routeProvider.otherwise({ redirectTo: '' });

    $locationProvider.html5Mode(true);
    
}]);



    

