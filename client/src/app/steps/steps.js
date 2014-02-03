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
  'service.api',
  'timer',
  'services.httpRequestTracker',
  'LocalStorageModule',
  'highcharts-ng'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state('steps',{
    url: '/{type}/{GUID}/:idx',
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
      },
      step_info : function(api,steps) {
        return api.get_step_gen_info();
      }
    }
  })
  .state('steps.result',{
    url:'/step/:stepnumber/{experiment_id}',
    controller: 'ResultCtrl',
    templateUrl: 'steps/result.tpl.html',
    resolve: {
      results: function($stateParams,api,chart) {
        return api.get_experiment_result($stateParams.experiment_id).then(function(response) {
          return chart.format(response);
        },function(error){
          console.log("Error out but you should return to the previous step and keep waiting for the next available equipemnt");
        });
      },
      step_info: function(api,steps) {
        return api.get_step_gen_info();
      }  
    },
    data: {pageTitle: 'Results'}
  });
})


.controller('StepsCtrl',['$scope','step','$state','$stateParams','api','localStorageService','$timeout','step_info','httpRequestTracker', function StepsCtrl($scope,step,$state,$stateParams,api,localStorageService,$timeout,step_info,httpRequestTracker){
  $scope.GUID = $stateParams.GUID;

  $scope.step_info = step_info;

  $scope.data_param = localStorageService.get('data_param_'+step.order.toString()) || [];
  $scope.data_questions = localStorageService.get('data_questions_'+step.order.toString()) || [];

  $scope.stepnumber = $stateParams.stepnumber;


  $scope.step = step; 


  $scope.prevQuestion = function() {
    /* only add to local storage if there are contents */
    if($scope.data_param.length>0) {
      localStorageService.add('data_param_'+$scope.step.order.toString(),$scope.data_param);
    }
    if($scope.data_questions.length>0) {
      localStorageService.add('data_questions_'+$scope.step.order.toString(),$scope.data_questions);
    } 
    var prev = parseInt($stateParams.stepnumber, 10)-1;
    $state.go('steps.step',{stepnumber:prev});
  };

  $scope.nextQuestion = function() {
    var next = parseInt($stateParams.stepnumber, 10)+1;
    if($scope.step.questions.length > 0) {
      localStorageService.add('data_questions_'+$scope.step.order.toString(),$scope.data_questions);
      api.post_lab_journal_question_response($scope.data_questions);
    }
    if($scope.step.journal_parameter_group) {
      /* do some shit if there are parameters */
      if($scope.step.journal_parameter_group.parameters.length > 0) {
        /* add the data to local storage */
        localStorageService.add('data_param_'+$scope.step.order.toString(),$scope.data_param);
        post_to_lab();
      }
    } else {
      $state.go('steps.step',{stepnumber:next});
    }
    var data = {
      'GUID':$stateParams.GUID.toString(),
      'last_step_completed':$scope.step.order
    };
    api.update_instance(data); 
  };

  /* we must do this shit if we are posting to the equipment */

  var post_to_lab = function() {
    /* construct the data to post to the equipment */
    var data = {};
    data.parameter_group = $scope.step.journal_parameter_group.resource_uri;
    data.instance = step_info.post_endpoint + $stateParams.GUID + '/';
    data.step = $scope.step.resource_uri;
    console.log($scope.data_param);
    api.submit_experiment(data,$scope.data_param).then(function(response){
      response = response[1].data;
      $scope.waitclock = parseInt(response.status.waitTime,10);
        var run_rest = function() {
          $scope.waitclock = 0; // reset the queue timer to 0
          $scope.timerclock = parseInt(response.status.estRunTime,10)+5;
          var experiment_id = response.experiment_id;
          $timeout( function() {
            var curr = parseInt($stateParams.stepnumber, 10);
            $state.go('steps.result',{stepnumber:curr, experiment_id:experiment_id});
            //do_call(experiment_id);
          },$scope.timerclock*1000+3000);
        };
      $timeout(run_rest,$scope.waitclock*1000 );
    });
  };

  $scope.hasPendingRequests = function () {
    return httpRequestTracker.hasPendingRequests();
  };


}])

.controller('ResultCtrl', ['$scope','results','step_info','$stateParams','$state', function ($scope,results,step_info,$stateParams,$state) {
  $scope.step_info = step_info;

  $scope.trial_data = results.trial;
  $scope.regression_data = results.regression;

  $scope.chartConfig = {
    options: {
        chart: {
            backgroundColor: null,
            zoomType: 'x'
        },
        legend: {
          itemStyle: {
             fontSize:'19px',
             color: '#A0A0A0'
          }
        },
        navigation: {
          buttonOptions: {
            height: 40,
            width: 48,
            symbolSize: 24,
            symbolX: 23,
            symbolY: 21,
            symbolStrokeWidth: 2
          }
        }
    },
    series: results.regression.concat(results.trial),
    title: {
        text: "",
        style: {
          display:'none'
        }
    },
    xAxis: {
      title: {
        text: 'Distance'
      }
    },
    yAxis: {
      title: {
        text: 'Particle Count'
      }
    },
    credits: {
          enabled: false
    },
    exporting: {
      buttons: {
        contextButton: {
            menuItems: [{
                text: 'Print',
                onclick: function() {
                    this.print();
                }
            }, {
                text: 'Export to PNG (small)',
                onclick: function() {
                    this.exportChart({
                      width: 250
                    });
                },
                separator: false
            }]
        }
      }
    },
    loading: false
  };


  $scope.prevQuestion = function() {
    $state.go('steps.step');
  };

  $scope.nextQuestion = function() {
    var next = parseInt($stateParams.stepnumber, 10)+1;
    $state.go('steps.step',{stepnumber:next});
  };


}])

/* helper function to get data into highchartjs format */
.service('chart', [function () {

  var data = {};


  var doRegression = function(full_data) {
    var flag = true;
    var dataset = [];
    var line_types = ['linear','exponential','logarithmic','power'];
    angular.forEach(line_types, function(line_type, key){
      var reg = regression(line_type,full_data);
      var points = reg.points;
      var equation = reg.string;
      points = points.filter(function(elem,pos,self){
        return self.indexOf(elem) == pos;
      });
      dataset.push(
        {
          name: line_type.charAt(0).toUpperCase() + line_type.slice(1),
          data: points,
          id: equation,
          type:'spline',
          marker: {enabled:false},
          visible: flag
        }
      );
      flag = false;
    });
    return dataset;
  };

  this.format = function(response) {
    var dataset = [];
    var full_data = [];
    angular.forEach(response.results, function(result, key){
      var trial = 1;
        angular.forEach(result.result, function(value, key){
          if( response.results.indexOf(result) === 0 ) {
            dataset.push(
              {
                type:'scatter',
                name: 'Trial '+trial.toString(),
                data : [[result.distance,parseInt(value,10)]]
              }
            );
            full_data.push([result.distance,parseInt(value,10)]);
          trial += 1;
          } else {
            dataset[key].data.push([result.distance,parseInt(value,10)]);
            full_data.push([result.distance,parseInt(value,10)]);
          }
        });
    });
    data.trial = angular.copy(dataset);
    data.regression = angular.copy(doRegression(full_data));

    return data;
  };


}]);


  //MARKDOWN:
  //step.journal_step_content;

  //QUESTIONS
  //step.questions

  //PARAMETERS
  // step.journal_parameter_group.parameters
