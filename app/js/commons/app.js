/**
* Instantiate the mobileApp module. Module declaratively specify 
* how an application should be bootstrapped
*/
var mobileApp = angular.module('mobileApp', ['ui.bootstrap', 'directives.compileContent', 'directives.prepopulateFields',
  'services.checkInputfields', 'services.parameterquestionValues', 'services.postupdateParameters', 
  'services.postupdateQuestions', 'services.submitExperimentdesign', 'services.retrieveExperimentresult', 
  'services.renderGraph', 'services.updateInstance']);
/**
* All the angular page routing takes place here...
* Configuring existing services inside initialization blocks.
* @param $routeProvider {ngService} - It is used for configuring routes
* @param $locationProvider {ngService} - It is used to configure how the 
* application deep linking paths are stored.
*/
mobileApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })
  .when('/home', {
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })
  .when('/mygroups', {
    templateUrl: 'templates/mygroups.html',
    controller: 'groupCtrl'
  })
  .when('/assignments', {
    templateUrl: 'templates/assignments.html',
    controller: 'assignmentCtrl'
  })
  .when('/subscriptions', {
    templateUrl: 'templates/subscriptions.html',
    controller: 'subscriptionCtrl'
  })
  .when('/labjournals', {
    templateUrl: 'templates/labjournals.html',
    controller: 'labjournalCtrl'
  })
  .when('/experiment/:Id',{
    templateUrl: 'templates/experiment.html',
    controller: 'experimentCtrl'
  })
   .when('/experiment/:Key/:Id',{
    templateUrl: 'templates/experiment.html',
    controller: 'experimentCtrl'
  })
  .otherwise({
    redirectTo: '/login'
  });
}).run(function($rootScope, $location) {
  $rootScope.location = $location;
});
      


