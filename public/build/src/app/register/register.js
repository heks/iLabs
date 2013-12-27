angular.module('ilabs.register', [
  'ui.router',
  'ui.bootstrap',
  'ngTouch',
  'directive',
  'constants'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    $stateProvider.state('register', {
      url: '/register',
      views: {
        'main': {
          controller: 'registerCtrl',
          templateUrl: 'register/register.tpl.html'
        }
      },
      data: { pageTitle: 'Register' }
    });
  }
]).controller('registerCtrl', [
  '$scope',
  '$state',
  'AFFILIATIONS',
  function registerCtrl($scope, $state, AFFILIATIONS) {
    $scope.user = {};
    $scope.affiliations = AFFILIATIONS;
    $scope.register = function () {
      console.log('REGISTER');
      $state.go('login');
    };
    $scope.cancel = function () {
      console.log('CANCEL');
      $state.go('login');
    };
  }
]);