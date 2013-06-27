/* Directives */
/*var myApp = angular.module('mobileApp', []).run(function($rootScope, $location) {
    $rootScope.location = $location;
});*/

/*var app = angular.module('mobileApp', []);

app.directive('myDirective', function () {
    return {
      restrict: 'C',
      scope: {
        options: '='
      },
      link: function (scope) {
        scope.$watch('options.reload', function (val) {
          if (val) {
            alert('reloading')
            scope.options.reload = false
          }
        })
        scope.$watch('options.refresh', function (val) {
          if (val) {
            alert('refreshing')
            scope.options.refresh = false
          }
        })
      }
    }
  })
  .controller('appController', function ($scope) {
    $scope.opts = {
      reload: false,
      refresh: false
    }
    
   //$scope.reload = function () {
      $scope.opts.reload = true
   // }
    
    $scope.refresh = function () {
      $scope.opts.refresh = true
    }
  })*/
