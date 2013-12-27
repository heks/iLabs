angular.module('ilabs.home', [
  'ui.router',
  'ngTouch',
  'service'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      views: {
        'main': {
          controller: 'HomeCtrl',
          templateUrl: 'home/home.tpl.html'
        }
      },
      data: { pageTitle: 'Home' },
      resolve: {
        suscriptions: [
          'api',
          function (api) {
            return 'tempfornow';
          }
        ],
        assignments: [
          'api',
          function (api) {
            return api.get_assignments();
          }
        ]
      }
    });
  }
]).controller('HomeCtrl', [
  '$scope',
  'api',
  'suscriptions',
  'assignments',
  '$state',
  '$rootScope',
  function HomeCtrl($scope, api, suscriptions, assignments, $state, $rootScope) {
    $scope.assignments = assignments.data.objects;
    $scope.goToAssignments = function (journal) {
      api.start_journal(journal.lab_journal).then(function (response) {
        $state.go('steps', {
          type: 'assignments',
          idx: $scope.assignments.indexOf(journal),
          stepnumber: 0
        });
      });
    };
    $scope.goToSuscriptions = function (journal) {
      $state.go('steps', {
        type: 'suscriptions',
        idx: $scope.suscriptions.indexOf(journal).toString()
      });
    };
    $scope.explore = function () {
      $state.go('explore');
    };
  }
]);