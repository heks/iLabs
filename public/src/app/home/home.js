/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ilabs.home', [
  'ui.router',
  'ngTouch',
  'service'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' },
    resolve: {
      suscriptions: ['api',function(api){
        return "tempfornow";//api.get_suscriptions($rootScope.username,$rootScope.api_key);
      }],
      assignments: ['api',function(api){
        return api.get_assignments();
      }]
    }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', ['$scope','api','suscriptions','assignments','$state','$rootScope', function HomeCtrl( $scope,api,suscriptions,assignments,$state,$rootScope ) {
  // $scope.suscriptions = suscriptions.data.objects;
  $scope.assignments = assignments.data.objects;
  // $rootScope.assignments = assignments.data.objects;
  // $rootScope.suscriptions = suscriptions.data.objects;




  $scope.goToAssignments = function(journal) {
    api.start_journal(journal.lab_journal).then( function(response){
      $state.go('steps',{type:'assignments',idx:$scope.assignments.indexOf(journal),stepnumber:0});
    });
  };

  $scope.goToSuscriptions = function(journal) {
    $state.go('steps',{type:'suscriptions',idx:$scope.suscriptions.indexOf(journal).toString()});
  };

  $scope.explore = function() {
    $state.go('explore');
  };


}]);
