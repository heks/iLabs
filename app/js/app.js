/**
* Instantiate the mobileApp module. Module declaratively specify 
* how an application should be bootstrapped
*/
var mobileApp = angular.module('mobileApp', ['ui.bootstrap', 'mobileApp.directives']);
/**
* All the angular page routing takes place here...
* Configuring existing services inside initialization blocks.
* @param $routeProvider {ngService} - It is used for configuring routes
* @param $locationProvider {ngService} - It is used to configure how the 
* application deep linking paths are stored.
*/
mobileApp.config(function($routeProvider, $locationProvider) {
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
  .when('/assignments', {
    templateUrl: 'partials/assignments.html',
    controller: 'assignmentCtrl'
  })
  .when('/subscriptions', {
    templateUrl: 'partials/subscriptions.html',
    controller: 'subscriptionCtrl'
  })
  .when('/labjournals', {
    templateUrl: 'partials/labjournals.html',
    controller: 'labjournalCtrl'
  })
  .when('/template/:Id',{
    templateUrl: 'partials/template.html',
    controller: 'templateCtrl'
  })
   .when('/template/:Key/:Id',{
    templateUrl: 'partials/template.html',
    controller: 'templateCtrl'
  })
  .otherwise({
    redirectTo: '/login'
  });
}).run(function($rootScope, $location) {
  $rootScope.location = $location;
});
      


