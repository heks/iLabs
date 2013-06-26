

var app = angular.module('mobileApp', ['ui.bootstrap']);
 
app.run(function($rootScope, $location) {
    $rootScope.location = $location;
});


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/partial1', {
        //templateUrl: '/partials/partial1.html',
        templateUrl: 'Mobile-iLab/app/partials/partial1.html',
        controller: appController
    });

    $routeProvider.when('/partial1/:Id/:Key', {
        //templateUrl: '/partials/partial1.html',
        templateUrl: 'Mobile-iLab/app/partials/partial1.html',
        controller: appController
    });

    $routeProvider.when('/home/:Id/:Key', {
        //templateUrl: '/partials/home.html',
        templateUrl: 'Mobile-iLab/app/partials/home.html',
        controller: appController
    });

    $routeProvider.when('/home', {
        //templateUrl: '/partials/home.html',
        templateUrl: 'Mobile-iLab/app/partials/home.html',
        controller: appController
    });

    $routeProvider.when('/mygroups', {
        //templateUrl: '/partials/mygroups.html',
        templateUrl: 'Mobile-iLab/app/partials/mygroups.html',
        controller: appController
    });

    $routeProvider.when('/partial2', {
      //templateUrl: '/partials/partial2.html',
      templateUrl: 'Mobile-iLab/Mobile-iLab/app/partials/partial2.html',
      controller: appController
    });

    $routeProvider.when('/partial3', {
      //templateUrl: '/partials/partial3.html',
      templateUrl: 'Mobile-iLab/app/partials/partial3.html',
      controller: appController
    });

    $routeProvider.when('/partial4', {
     // templateUrl: '/partials/partial4.html',
     templateUrl: 'Mobile-iLab/app/partials/partial4.html',
      controller: appController
    });

    $routeProvider.when('/research', {
     // templateUrl: '/steps/research.html',
     templateUrl: 'Mobile-iLab/app/steps/research.html',
      controller: appController
    });

    $routeProvider.when('/question', {
      //templateUrl: '/steps/question.html',
      templateUrl: 'Mobile-iLab/app/steps/question.html',
      controller: appController
    });

    $routeProvider.when('/design', {
      //templateUrl: '/steps/design.html',
      templateUrl: 'Mobile-iLab/app/steps/design.html',
      controller: appController
    });

    $routeProvider.when('/investigate', {
      //templateUrl: '/steps/investigate.html',
      templateUrl: 'Mobile-iLab/app/steps/investigate.html',
      controller: appController
    });

    $routeProvider.when('/investigate/:Dis/:Times/:Trials', {
      //templateUrl: '/steps/investigate.html',
      templateUrl: 'Mobile-iLab/app/steps/investigate.html',
      controller: appController
    });

    $routeProvider.when('/analyze', {
      //templateUrl: '/steps/analyze.html',
      templateUrl: 'Mobile-iLab/app/steps/analyze.html',
      controller: appController
    });

    $routeProvider.when('/interpret', {
      //templateUrl: '/steps/interpret.html',
      templateUrl: 'Mobile-iLab/app/steps/interpret.html',
      controller: appController
    });

    $routeProvider.when('/exit',{
      templateUrl: 'http://ilabcentral.org/radioactivity/',
      controller: appController
    });

    $routeProvider.when('/simulation/:Id',{
      //templateUrl: '/steps/simulation.html',
      templateUrl: 'Mobile-iLab/app/steps/simulation.html',
      controller: appController
    });

     $routeProvider.when('/account/:Id',{
      //templateUrl: '/steps/account.html',
      templateUrl: 'Mobile-iLab/app/steps/account.html',
      controller: appController
    });

      $routeProvider.when('/messages/:Id',{
      //templateUrl: '/steps/messages.html',
      templateUrl: 'Mobile-iLab/app/steps/messages.html',
      controller: appController
    });

       $routeProvider.when('/webcam/:Id',{
      //templateUrl: '/steps/webcam.html',
      templateUrl: 'Mobile-iLab/app/steps/webcam.html',
      controller: appController
    });

    $routeProvider.when('', {
      //templateUrl: '/index.html',
      templateUrl: 'Mobile-iLab/app/index.html',
      controller: appController
    });

    $routeProvider.otherwise({ redirectTo: '' });

    $locationProvider.html5Mode(true);
    
}]);





    

