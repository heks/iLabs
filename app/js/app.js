

var app = angular.module('mobileApp', ['ui.bootstrap']);
 
app.run(function($rootScope, $location) {
    $rootScope.location = $location;
});


/*app.controller('appController', ['$scope', '$rootScope', function($scope, $rootScope) {
    
    $scope.changeLanguage = function (lang) {
        $rootScope.currentLanguage = lang;
    }

}]);*/

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

    $routeProvider.when('/research', {
      templateUrl: '/steps/research.html',
      controller: appController
    });

    $routeProvider.when('/question', {
      templateUrl: '/steps/question.html',
      controller: appController
    });

    $routeProvider.when('/design', {
      templateUrl: '/steps/design.html',
      controller: appController
    });

    $routeProvider.when('/investigate', {
      templateUrl: '/steps/investigate.html',
      controller: appController
    });

    $routeProvider.when('/analyze', {
      templateUrl: '/steps/analyze.html',
      controller: appController
    });

    $routeProvider.when('/interpret', {
      templateUrl: '/steps/interpret.html',
      controller: appController
    });

    $routeProvider.when('/exit',{
      templateUrl: 'http://ilabcentral.org/radioactivity/',
      controller: app/appController
    });

    $routeProvider.when('/simulation',{
      templateUrl: '/steps/simulation.html',
      controller: app/appController
    });

     $routeProvider.when('/account',{
      templateUrl: '/steps/account.html',
      controller: app/appController
    });

      $routeProvider.when('/messages',{
      templateUrl: '/steps/messages.html',
      controller: app/appController
    });

    $routeProvider.when('', {
      templateUrl: '/index.html',
      controller: appController
    });

    $routeProvider.otherwise({ redirectTo: '' });

    $locationProvider.html5Mode(true);
    
}]);





    

