
angular.module( 'ilabs.explore', [
  'ui.router',
  'ngTouch',
  'service.api',
  'filters'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'explore', {
    url: '/explore',
    views: {
      "main": {
        controller: 'ExploreCtrl',
        templateUrl: 'explore/explore.tpl.html'
      }
    },
    data:{ pageTitle: 'Explore' },
    resolve: {
      explore_journals: ['api',function(api){
        return api.get_explore_journals();
      }]
    }
  });
})

.controller( 'ExploreCtrl', ['$scope','explore_journals','api', function ExploreCtrl( $scope,explore_journals,api ) {

  $scope.explore_journals = explore_journals;


  $scope.selectJournal = function(journal) {
    if($scope.selectedJournal === journal) {
      $scope.selectedJournal = null;
    } else {
      $scope.selectedJournal = journal;
    }
  };

  $scope.isSelected = function(journal) {
    return $scope.selectedJournal === journal;
  };

  $scope.suscribe = function(journal) {
    var d = {'lab_journal':journal.lab_journal};
    api.suscribe_journal(d).then( function(){
      var idx = $scope.explore_journals.indexOf(journal);
      if( idx > -1) {
        $scope.explore_journals.splice(idx,1);
      }
    });
  };


}]);
