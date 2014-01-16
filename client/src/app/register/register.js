angular.module( 'ilabs.register', [
  'ui.router',
  'ui.bootstrap',
  'ngTouch',
  'directive',
  'constants'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'register', {
    url: '/register',
    views: {
      "main": {
        controller: 'registerCtrl',
        templateUrl: 'register/register.tpl.html'
      }
    },
    data:{ pageTitle: 'Register' }
  });
})

.controller( 'registerCtrl', ['$scope','$state','AFFILIATIONS','api', function registerCtrl( $scope,$state, AFFILIATIONS,api ) {
  $scope.user = {};

  $scope.affiliations = AFFILIATIONS;

  $scope.register = function() {
    //api.register($scope.user)
    console.log("REGISTER");
    $state.go('login');
  };

  $scope.cancel = function() {
    $state.go('login');
  };

}]);
