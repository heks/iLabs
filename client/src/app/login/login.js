angular.module( 'ilabs.login', [
  'ui.router',
  'ui.bootstrap',
  'directive',
  'service',
  'ngTouch'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})

.controller( 'LoginCtrl', ['$scope','$state','$rootScope','api', function LoginCtrl( $scope,$state,$rootScope,api ) {
  $scope.user = {};

   $scope.user.username = 'student1';
   $scope.user.password = 'student1';

  $scope.login = function() {
    api.login($scope.user.username,$scope.user.password).then(function(response) {
      console.log(response.data.api_key);
      $rootScope.api_key = response.data.api_key;
      $rootScope.username = $scope.user.username;
      $state.go('home');
    });
  };

  $scope.register = function() {
    $state.go('register');
  };

}])

;
