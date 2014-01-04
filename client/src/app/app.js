angular.module( 'ilabs', [
  'templates-app',
  'templates-common',
  'ilabs.home',
  'ilabs.login',
 'ilabs.register',
  'ilabs.steps',
  'ilabs.explore',
  'snap',
  'ngTouch',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, snapRemoteProvider) {
  $urlRouterProvider.otherwise( '/login' );
  snapRemoteProvider.globalOptions.disable = 'right';
})

.run( function run () {

})

.controller( 'AppCtrl', ['$scope','$rootScope','$location','$state', function AppCtrl ( $scope, $rootScope,$location,$state ) {
  $rootScope.searchFlag = false;

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | iLabs' ;
    }
  });

  /* for search button */
  $scope.searchFlag = function() {
    if($location.path() === '/home' || $location.path() === '/explore') {
      return true;
    } else {
      return false;
    }
  };

  /* for menu button */
  $scope.loginFlag = function() {
    if($location.path() === '/login' || $location.path() === '/register') {
      return true;
    } else {
      return false;
    }
  };

  $scope.toggleSearch = function() {
    $rootScope.searchFlag = !$rootScope.searchFlag;
  };

  $scope.goHome = function() {
    $state.go('home');
  };

  $scope.goExplore = function() {
    $state.go('explore');
  };

  $scope.goProfile = function() {
    console.log("go to profile");
  };

  $scope.goLogout = function() {
    console.log("Logout");
  };


}])
.directive('customDragArea', function (snapRemote) {
  return {
    restrict: 'AE',
    link: function(scope, element, attrs) {
      snapRemote.getSnapper().then(function(snapper) {
        snapper.settings({
          dragger: element[0]
        });
      });
    }
  };
})

;

