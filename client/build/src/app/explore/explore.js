angular.module('ilabs.explore', [
  'ui.router',
  'ngTouch',
  'service'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    $stateProvider.state('explore', {
      url: '/explore',
      views: {
        'main': {
          controller: 'ExploreCtrl',
          templateUrl: 'explore/explore.tpl.html'
        }
      },
      data: { pageTitle: 'Explore' },
      resolve: {
        explore_journals: [
          'api',
          '$rootScope',
          function (api, $rootScope) {
            return api.get_explore_journals($rootScope.username, $rootScope.api_key);
          }
        ]
      }
    });
  }
]).controller('ExploreCtrl', [
  '$scope',
  'explore_journals',
  function ExploreCtrl($scope, explore_journals) {
    $scope.explore_journals = explore_journals.data.objects;
    $scope.selectJournal = function (journal) {
      if ($scope.selectedJournal === journal) {
        $scope.selectedJournal = null;
      } else {
        $scope.selectedJournal = journal;
      }
    };
    $scope.isSelected = function (journal) {
      return $scope.selectedJournal === journal;
    };
  }
]);