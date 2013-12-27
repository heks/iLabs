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

.controller( 'AppCtrl', ['$scope','$rootScope', function AppCtrl ( $scope, $rootScope ) {
  $rootScope.searchFlag = false;

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | iLabs' ;
    }
  });

  $scope.toggleSearch = function() {
    if($rootScope.searchFlag) {
      $rootScope.searchFlag = false;
    } else {
      $rootScope.searchFlag = true;      
    }
  };

}])

;

