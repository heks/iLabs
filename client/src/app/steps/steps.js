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
            localStorage.removeItem('type');
            localStorage.removeItem('idx');
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
  $scope.data_param = [];
  $scope.data_questions = [];

  if($scope.data_param.length > 0) {
    storage.bind($scope,'data_param',{defaultValue: '' ,storeName: step.resource_uri});
  } else if($scope.data_questions.length > 0 ) {
    storage.bind($scope,'data_questions',{defaultValue: '' ,storeName: step.resource_uri});
  }


  $scope.stepnumber = $stateParams.stepnumber;


  $scope.step = step; 

  $scope.nextQuestion = function() {
    var next = parseInt($stateParams.stepnumber, 10)+1;
    $state.go('steps.step',{stepnumber:next});
    //$location.path($stateParams.type+'/'+$stateParams.idx+'/step/'+next.toString()).replace();
    //angular.copy(api.get_step(next), $scope.step);
        // $scope.step = api.get_step(parseInt($stateParams.stepnumber,10)+1);
  };

  $scope.doPatchQues = function() {
    api.post_lab_journal_parameter_response($scope.data_questions);
  };

  $scope.doPatchParam = function() {
    var data = {};
    data.parameter_group = $scope.step.journal_parameter_group.resource_uri;
    data.instance = '/api/v1/labjournalinstance/x/';
    //api.post_lab_journal_parameter_response($scope.data_param);
    api.submit_experiment(data,$scope.data_param);

  };


}]);


  //MARKDOWN:
  //step.journal_step_content;

  //QUESTIONS
  //step.questions

  //PARAMETERS
  // step.journal_parameter_group.parameters
