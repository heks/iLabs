var mobileApp = angular.module('mobileApp', ['ui.bootstrap'])
.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'loginCtrl'
  })
  .when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'homeCtrl'
  })
  .when('/mygroups', {
    templateUrl: 'partials/mygroups.html',
    controller: 'groupCtrl'
  })
  .when('/partial1', {
    templateUrl: 'partials/partial1.html',
    controller: 'labCtrl'
  })
  .when('/research', {
    templateUrl: 'steps/research.html',
    controller: 'researchCtrl'
  })
  .when('/question', {
    templateUrl: 'steps/question.html',
    controller: 'questionCtrl'
  })
  .when('/design', {
    templateUrl: 'steps/design.html',
    controller: 'designCtrl'
  })
  .when('/investigate', {
    templateUrl: 'steps/investigate.html',
    controller: 'investigateCtrl'
  })
  .when('/analyze', {
    templateUrl: 'steps/analyze.html',
    controller: 'analyzeCtrl'
  })
  .when('/interpret', {
    templateUrl: 'steps/interpret.html',
    controller: 'interpretCtrl'
  })
  .when('/simulation/:Id',{
    templateUrl: 'steps/simulation.html',
    controller: 'simCtrl'
  })
  .when('/account/:Id',{
    templateUrl: 'steps/account.html',
    controller: 'accCtrl'
  })
  .when('/messages/:Id',{
    templateUrl: 'steps/messages.html',
    controller: 'msgCtrl'
  })
  .when('/webcam/:Id',{
    templateUrl: 'steps/webcam.html',
    controller: 'webCtrl'
  })
  .otherwise({
    redirectTo: '/login'
  });
}).run(function($rootScope, $location) {
  $rootScope.location = $location;
});


