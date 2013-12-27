/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ilabs.steps', [
  'ui.router',
  'ui.bootstrap',
  'ngTouch',
  'directive',
  'service'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state('steps',{
    url: '/{type}/:idx/step/:stepnumber',
    views: {
      "main": {
        controller: 'StepsCtrl',
        templateUrl: 'steps/onestep.tpl.html'
      }
    },
    data: {pageTitle: 'Lab Journal'},
    resolve: {
      steps: function($stateParams,api){
        return api.get_steps($stateParams.type,$stateParams.idx);
      }
    }
  });
  // .state('newstep',{
  //   url:'/step/:stepnumber',
  //   views: {
  //     "main": {
  //       controller: 'StepCtrl',
  //       templateUrl: 'steps/onestep.tpl.html'
  //     }
  //   },
  //   resolve: {
  //     step: function($stateParams,api){
  //       return api.get_step(parseInt($stateParams.stepnumber,10));
  //     }
  //   },
  //   data: {pageTitle: 'Step'}
  // });
})
/**
 * And of course we define a controller for our route.
 */
.controller('StepsCtrl',['$scope','steps','$location','$stateParams','api', function StepsCtrl($scope,steps,$location,$stateParams,api){

  $scope.data_questions = [];
  $scope.data_param = [];

  $scope.steps=steps.data;

  $scope.step = api.get_step($stateParams.stepnumber); 
  console.log("in step ctrl");

  $scope.nextQuestion = function() {
    var next = parseInt($stateParams.stepnumber,10)+1;
    $location.path($stateParams.type+'/'+$stateParams.idx+'/step/'+next.toString()).replace();
    $scope.step = api.get_step(next); 
    // $scope.step = api.get_step(parseInt($stateParams.stepnumber,10)+1);
  };

  $scope.doPatch = function() {
    api.post_lab_journal_resonse($scope.data_questions);
  };

}]);


  //MARKDOWN:
  //step.journal_step_content;

  //QUESTIONS
  //step.questions

  //PARAMETERS
  // step.journal_parameter_group.parameters
