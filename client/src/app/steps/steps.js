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
  'service',
  'angularLocalStorage'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state('steps',{
    url: '/{type}/:idx',
    abstract:true,
    views: {
      "main": {
        controller: function($scope){},
        template: '<div ui-view></div>'
      }
    },
    data: {pageTitle: 'Lab Journal'},
    resolve: {
      steps: function($stateParams,api){
        return api.get_steps($stateParams.type,$stateParams.idx).then(function(data){
          return data;
        });
      }
    }
  })
  .state('steps.step',{
    url:'/step/:stepnumber',
    controller: 'StepsCtrl',
    templateUrl: 'steps/onestep.tpl.html',
    resolve: {
      step: function($stateParams,api,$state,steps) {
        // steps.then(function(){
          return api.get_step(parseInt($stateParams.stepnumber,10)).then(function(data){
            return data;
          },function(error){
            $state.go('home');
          });
        // });
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
.controller('StepsCtrl',['$scope','step','$state','$stateParams','api','$rootScope','storage', function StepsCtrl($scope,step,$state,$stateParams,api,$rootScope,storage){

  storage.bind($scope,'data_param',{defaultValue: '' ,storeName: step.resource_uri});



  $scope.data_param = [];
  $scope.data_questions = [];

  $scope.stepnumber = $stateParams.stepnumber;


  $scope.step = step; 
  console.log("in step ctrl");

  $scope.nextQuestion = function() {
    var next = parseInt($stateParams.stepnumber, 10)+1;
    $state.go('steps.step',{stepnumber:next});
    //$location.path($stateParams.type+'/'+$stateParams.idx+'/step/'+next.toString()).replace();
    //angular.copy(api.get_step(next), $scope.step);
        // $scope.step = api.get_step(parseInt($stateParams.stepnumber,10)+1);
  };

  $scope.doPatch = function() {
    api.post_lab_journal_question_resonse($scope.data_questions);
  };

}]);


  //MARKDOWN:
  //step.journal_step_content;

  //QUESTIONS
  //step.questions

  //PARAMETERS
  // step.journal_parameter_group.parameters
