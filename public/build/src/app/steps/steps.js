angular.module('ilabs.steps', [
  'ui.router',
  'ui.bootstrap',
  'ngTouch',
  'directive',
  'service'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    $stateProvider.state('steps', {
      url: '/{type}/:idx/step/:stepnumber',
      views: {
        'main': {
          controller: 'StepsCtrl',
          templateUrl: 'steps/onestep.tpl.html'
        }
      },
      data: { pageTitle: 'Lab Journal' },
      resolve: {
        steps: function ($stateParams, api) {
          return api.get_steps($stateParams.type, $stateParams.idx);
        }
      }
    });
  }
]).controller('StepsCtrl', [
  '$scope',
  'steps',
  '$location',
  '$stateParams',
  'api',
  function StepsCtrl($scope, steps, $location, $stateParams, api) {
    $scope.data_questions = [];
    $scope.data_param = [];
    $scope.steps = steps.data;
    $scope.step = api.get_step($stateParams.stepnumber);
    console.log('in step ctrl');
    $scope.nextQuestion = function () {
      var next = parseInt($stateParams.stepnumber, 10) + 1;
      $location.path($stateParams.type + '/' + $stateParams.idx + '/step/' + next.toString()).replace();
      $scope.step = api.get_step(next);
    };
    $scope.doPatch = function () {
      api.post_lab_journal_resonse($scope.data_questions);
    };
  }
]);