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
  'angularLocalStorage',
  'timer',
  'angles'
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
            var data = api.curr_journal;
            console.log(data);
            /* on the last step submit the experiment */
            api.complete_the_journal(data);
            /* remove this shit from storage */
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
.controller('StepsCtrl',['$scope','step','$state','$stateParams','api','storage','$timeout', function StepsCtrl($scope,step,$state,$stateParams,api,storage,$timeout){
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
    data.step = "/api/v1/labjournalstep/6/";
    api.submit_experiment(data,$scope.data_param).then(function(response){
      console.log(response);
      // need to do wait time
      //response[1].data.status.waitTime
      $scope.timerclock = parseInt(response[1].data.status.estRunTime,10)+5;
      var experiment_id = response[1].data.experiment_id;
      $timeout(function(){},$scope.timerclock*1000+3000).then( function() {
        api.get_experiment_result(experiment_id).then(function(response){
          console.log(response);

            var labels = [];
            var dataset = [];
            angular.forEach(response.results, function(result, key){
              labels.push(result.distance);
              angular.forEach(result, function(value, key){
                if( response.results.indexOf(result) === 0 ) {
                  //var idx = result.indexOf(value);
                  dataset.push(
                    {
                      fillColor : "rgba(255,255,255, 0)",
                      strokeColor : "rgba(220,220,220,1)",
                      data : [value]
                    }
                  );
                } else {
                  dataset[key].data.push(value);
                }
              });
            });

            $scope.chart.labels = angular.copy(labels);
            $scope.chart.datasets = angular.copy(dataset);

        },function(error){
          console.log(error);
        });
      });
    });

  };


  // $scope.chart = {
  //     labels : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  //     datasets : [
  //         {
  //             fillColor : "rgba(255,255,255, 0)",
  //             strokeColor : "rgba(220,220,220,1)",
  //             //pointColor : "rgba(151,187,205,0)",
  //             //pointStrokeColor : "#e67e22",
  //             data : [4, 3, 5, 4, 6]
  //         },
  //         {
  //             fillColor : "rgba(255,255,255, 0)",
  //             strokeColor : "rgba(151,187,205,1)",
  //             //pointColor : "rgba(151,187,205,0)",
  //             //pointStrokeColor : "#f1c40f",
  //             data : [8, 3, 2, 5, 4]
  //         },
  //         {
  //             fillColor : "rgba(255,255,255, 0)",
  //             strokeColor : "#4D5360",
  //             //pointColor : "rgba(151,187,205,0)",
  //             //pointStrokeColor : "#f1c40f",
  //             data : [3, 4, 5, 1, 7]
  //         }
  //     ] 
  // };

  $scope.options =  {
          //Boolean - Whether we should show a stroke on each segment
          segmentShowStroke : true,
          //String - The colour of each segment stroke
          segmentStrokeColor : "#fff",
          //Number - The width of each segment stroke
          segmentStrokeWidth : 24,
          //The percentage of the chart that we cut out of the middle.
          percentageInnerCutout : 50,
          //Boolean - Whether we should animate the chart
          animation : true,
          //Number - Amount of animation steps
          animationSteps : 100,
          //String - Animation easing effect
          animationEasing : "easeOutBounce",
          //Boolean - Whether we animate the rotation of the Doughnut
          animateRotate : true,
          //Boolean - Whether we animate scaling the Doughnut from the centre
          animateScale : false,
          //Function - Will fire on animation completion.
          onAnimationComplete : null
      };




}]);


  //MARKDOWN:
  //step.journal_step_content;

  //QUESTIONS
  //step.questions

  //PARAMETERS
  // step.journal_parameter_group.parameters
