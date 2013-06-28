

var app = angular.module('mobileApp', ['ui.bootstrap']);
 
app.run(function($rootScope, $location) {
    $rootScope.location = $location;
});


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/partial1', {
        //templateUrl: '/partials/partial1.html',
        templateUrl: 'app/partials/partial1.html',
        controller: appController
    });

    $routeProvider.when('/partial1/:Id/:Key', {
        //templateUrl: '/partials/partial1.html',
        templateUrl: 'app/partials/partial1.html',
        controller: appController
    });

    $routeProvider.when('/home/:Id/:Key', {
        //templateUrl: '/partials/home.html',
        templateUrl: 'app/partials/home.html',
        controller: appController
    });

    $routeProvider.when('/app/partials/home.html', {
        //templateUrl: '/partials/home.html',
        templateUrl: 'app/partials/home.html',
        controller: appController
    });

    $routeProvider.when('/mygroups', {
        //templateUrl: '/partials/mygroups.html',
        templateUrl: 'app/partials/mygroups.html',
        controller: appController
    });

    $routeProvider.when('/partial2', {
      //templateUrl: '/partials/partial2.html',
      templateUrl: 'app/partials/partial2.html',
      controller: appController
    });

    $routeProvider.when('/partial3', {
      //templateUrl: '/partials/partial3.html',
      templateUrl: 'app/partials/partial3.html',
      controller: appController
    });

    $routeProvider.when('/partial4', {
     // templateUrl: '/partials/partial4.html',
     templateUrl: 'app/partials/partial4.html',
      controller: appController
    });

    $routeProvider.when('/research', {
     // templateUrl: '/steps/research.html',
     templateUrl: 'app/steps/research.html',
      controller: appController
    });

    $routeProvider.when('/question', {
      //templateUrl: '/steps/question.html',
      templateUrl: 'app/steps/question.html',
      controller: appController
    });

    $routeProvider.when('/design', {
      //templateUrl: '/steps/design.html',
      templateUrl: 'app/steps/design.html',
      controller: appController
    });

    $routeProvider.when('/investigate', {
      //templateUrl: '/steps/investigate.html',
      templateUrl: 'app/steps/investigate.html',
      controller: appController
    });

    $routeProvider.when('/investigate/:Dis/:Times/:Trials', {
      //templateUrl: '/steps/investigate.html',
      templateUrl: 'app/steps/investigate.html',
      controller: appController
    });

    $routeProvider.when('/analyze', {
      //templateUrl: '/steps/analyze.html',
      templateUrl: 'app/steps/analyze.html',
      controller: appController
    });

    $routeProvider.when('/interpret', {
      //templateUrl: '/steps/interpret.html',
      templateUrl: 'app/steps/interpret.html',
      controller: appController
    });

    $routeProvider.when('/exit',{
      templateUrl: 'http://ilabcentral.org/radioactivity/',
      controller: appController
    });

    $routeProvider.when('/simulation/:Id',{
      //templateUrl: '/steps/simulation.html',
      templateUrl: 'app/steps/simulation.html',
      controller: appController
    });

     $routeProvider.when('/account/:Id',{
      //templateUrl: '/steps/account.html',
      templateUrl: 'app/steps/account.html',
      controller: appController
    });

      $routeProvider.when('/messages/:Id',{
      //templateUrl: '/steps/messages.html',
      templateUrl: 'app/steps/messages.html',
      controller: appController
    });

       $routeProvider.when('/webcam/:Id',{
      //templateUrl: '/steps/webcam.html',
      templateUrl: 'app/steps/webcam.html',
      controller: appController
    });

    $routeProvider.when('', {
      //templateUrl: '/index.html',
      templateUrl: 'app/index.html',
      controller: appController
    });

    $routeProvider.otherwise({ redirectTo: '' });

    $locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix("");
}]);





    

