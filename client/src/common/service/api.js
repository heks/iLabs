angular.module('service.api', [])
.constant('dev_server','http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1')
.constant('api_prefix','/api/v1')
.constant('other_server','http://54.200.25.203')


.service('api', ['$http','$q','dev_server','other_server','$rootScope','localStorageService', function ($http,$q,dev_server,other_server,$rootScope,localStorageService) {
	
  var username = localStorageService.get('username') || [];
  var api_key = localStorageService.get('api_key') || [];
  var assignments = [];
  var suscriptions = [];
  var explore_journals = [];
  var steps = [];
  var step_info;

  this.login = function(_username,_password) {
		var parameters = 'username=' + _username + '&password=' + _password;
    var url = dev_server + '/login/?' + parameters;
    return $http({
      method:'POST',
      url:url,
      headers:{'Content-Type': 'application/json'},
      data:{}
    }).success(function(data){
      localStorageService.add('username',_username);
      localStorageService.add('api_key',data.api_key);
      api_key = data.api_key;
      username = _username;
      return data;
    }).error(function(error){
      console.log(error);
      return error;
    }); 
	};


    this.get_steps = function(type,idx) {
        var deferred = $q.defer();

          var call = '';

          if(type === 'assignments') {
            call = assignments[idx].lab_journal;
          } else if (type === 'suscriptions') {
            call = suscriptions[idx].lab_journal;
          }

          console.log(call);

          $http({
            method: 'GET',
            url:'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com'+call+'?username='+username+'&api_key='+api_key,
            headers:{'Content-Type': 'application/json'}
          }).success(function(response){
            angular.copy(response.lab_journal_steps, steps);
            var gen_step_info = {};
            gen_step_info.title = angular.copy(response.title);
            gen_step_info.number_of_steps = angular.copy(response.number_of_steps);
            gen_step_info.description = angular.copy(response.description);
            gen_step_info.post_endpoint = angular.copy(response.post_endpoint);
            step_info = angular.copy(gen_step_info);

            deferred.resolve(response.lab_journal_steps);
          }).error(function(err){
            deferred.reject('ERRROR');
          });

        return deferred.promise;
      };

  this.get_step_gen_info = function() {
    return step_info;
  };


  this.get_step = function(idx) {
    var deferred = $q.defer();
    if(idx === steps.length) {
      deferred.reject('Reached end');
    } else {
      deferred.resolve(steps[idx]);
      }
    return deferred.promise;
  };

  this.get_explore_journals = function() {
    var parameters = 'username=' + username + '&api_key=' + api_key;
    var promise;

    if(promise) {
      return promise;
    } else {
      promise = $http({
        method:'GET',
        url: dev_server + '/browselabjournal/?'+parameters,
        headers:{'Content-Type': 'application/json'}
      }).then(function(response){
        return response.data.objects; 
      });
      return promise; 
    }

  };

  /* Starts the journal and also generating a unique GUID */
  this.start_journal = function(lab_journal) {
        var deferred = $q.defer();
        var data = {};
        /* In progress lab journal so dont start a new one but get the old one */
        if( angular.isDefined(lab_journal.status) ) {
          /* this is a helper function to recreate the responses if the journal was already started */
          var get_previous_answers = function(GUID) {
              var call_param = '/labjournalparameterresponse/GUID/'+GUID;
              var param = $http.get(dev_server+call_param+'/?username='+username+'&api_key='+api_key);
              var call_ques = '/labjournalquestionresponse/GUID/'+GUID;
              var ques = $http.get(dev_server+call_ques+'/?username='+username+'&api_key='+api_key);

              function returnInt(ele) {
                return parseInt(ele,10);
              }
// [{"parameter":"/api/v1/deviceparameter/1/","instance":"/api/v1/labjournalinstance/8df7ae72-762c-425d-a142-1888a5c16628/","step":"/api/v1/labjournalstep/6/","response":[30,50,80]},{"parameter":"/api/v1/deviceparameter/2/","instance":"/api/v1/labjournalinstance/8df7ae72-762c-425d-a142-1888a5c16628/","step":"/api/v1/labjournalstep/6/","response":"4"},{"parameter":"/api/v1/deviceparameter/3/","instance":"/api/v1/labjournalinstance/8df7ae72-762c-425d-a142-1888a5c16628/","step":"/api/v1/labjournalstep/6/","response":"4"}]

              /* need to recreate local storage key:value pairs */
              return $q.all([param,ques]).then(function(response){
                var param_responses = response[0].data.objects;
                var ques_responses = response[1].data.objects;
                var data_param = {};
                var data_ques = {};

                /* recreate the students parameter answers */
                angular.forEach(param_responses, function(ans, key){
                  var t = {};
                  t.parameter = ans.parameter;
                  t.instance = ans.instance;
                  t.step = ans.step;
                  /* hacky way of formatting the data in the correct way */
                  t.response = ans.response.split(",").map(returnInt);
                  t.response = (t.response.length===1) ? t.response[0].toString() : t.response;
                  if(!data_param.hasOwnProperty(ans.step_order)) {
                    data_param[ans.step_order] = [t];
                  } else {
                    data_param[ans.step_order].push(t);
                  }
                });

                angular.forEach(ques_responses, function(ans, key){
                  var t = {};
                  t.question = ans.question;
                  t.instance = ans.instance;
                  t.response = ans.response;
                  if(!data_ques.hasOwnProperty(ans.step_order)) {
                    data_ques[ans.step_order] = [t];
                  } else {
                    data_ques[ans.step_order].push(t);
                  }
                });

                /* Recreate the local storage for the parameters */
                angular.forEach(data_param, function(value, key){
                  localStorageService.add('data_param_'+key,value);        
                });

                /* Recreate the local storage for the questions */
                angular.forEach(data_ques, function(value, key){
                  localStorageService.add('data_questions_'+key,value);
                });
                return 'SUCCESS';
              });
          };

          data.GUID = lab_journal.GUID;
          if(!lab_journal.last_step_completed) {
            data.last_step_completed = 0;
          } else {
            get_previous_answers(lab_journal.GUID);
            data.last_step_completed = parseInt(lab_journal.last_step_completed,10)-1;
          }
          deferred.resolve(data);
        /* lab journal not launched yet so generate a new GUID and launch the journal */
        } else {
          var call = '/labjournalinstance/';
          var GUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
          var ret_data = {};
          var post_data = {
            "GUID": GUID,
            "lab_journal":lab_journal.lab_journal
          };

          this.curr_journal = angular.copy(data);

          $http({
            method: 'POST',
            url:dev_server+call+'?username='+username+'&api_key='+api_key,
            headers:{'Content-Type': 'application/json'},
            data:post_data
          }).success(function(data){
            console.log("Successfully started journal");
            ret_data.GUID = GUID;
            ret_data.last_step_completed = 0;
            deferred.resolve(ret_data);
          }).error(function(data){
            deferred.reject("Somthing went wrong");
          });
        }

        return deferred.promise;
  };

  this.post_lab_journal_question_response = function(data) {
    var call = '/labjournalquestionresponse/';
    return $http({
      url:dev_server+call+'?username='+username+'&api_key='+api_key,
      method:"PATCH",
      data:{objects:data}
    }).success(function(data){
      console.log("successful patch");
      return data;
    }).error( function(data){
      console.log("error");
      return data;
    });
  };


  /* this call actually does a PATCH for the parameters and a POST to the equipment */
  this.submit_experiment = function(data_exp,data_param) {
    var call_exp = '/experiment/';
    var exp = $http({
      url:dev_server+call_exp+'?username='+username+'&api_key='+api_key,
      method:"POST",
      data:data_exp
    });
    var call_param = '/labjournalparameterresponse/';
    var param = $http({
      url:dev_server+call_param+'?username='+username+'&api_key='+api_key,
      method:"PATCH",
      data:{objects:data_param}
    });

    return $q.all([param,exp]);

  };

  this.remove_journal = function(data) {
    var call = '/favoritelabjournal/';
    return $http({
      url:dev_server+call+'?username='+username+'&api_key='+api_key,
      method:"DELETE",
      data:data
    });
  };


  this.suscribe_journal = function(data) {
    var call = '/favoritelabjournal/';
    return $http({
      url:dev_server+call+'?username='+username+'&api_key='+api_key,
      method:"POST",
      data:data
    }).success(function(data){
      return data;
    }).error( function(data){
      console.log("could not suscribe");
      return data;
    });
  };

  this.get_experiment_result = function(experiment_id) {
    var deferred = $q.defer();
    var call = '/experiment/result/'+experiment_id +'/';
    
    var results = localStorageService.get('results');
    if(results) {
      deferred.resolve(results);
    } else {

      $http({
        url:dev_server+call+'?username='+username+'&api_key='+api_key,
        method:"GET"
      }).then(function(response){
        /* need to do some parsing becuase this data is in such a shit format */
        angular.forEach(response.data.results, function(value, key){
          value.result = value.result.split(",");
          value.distance = parseInt(value.distance,10);
        });
        /* sort the results by distance before getting */
        response.data.results.sort(function(a,b){
          return a.distance - b.distance;
        });

        //store the results in local storage
        localStorageService.add('results',response.data);

        deferred.resolve(response.data);
      },function(error){
        var call2 = '/experiment/status/' + experiment_id + '/';
        $http({
          url:dev_server+call2+'?username='+username+'&api_key='+api_key,
          method:"GET"
        }).then(function(result){
          deferred.reject(result.data);
        },function(error){
          deferred.reject("ERROR");
        });
      });
    }

    return deferred.promise;
  };


  this.get_student_info = function() {
    var call = '/student/';
    return $http({
      url:dev_server+call+'?username='+username+'&api_key='+api_key,
      method:"GET"
    }).then(function(response) {
      return response.data.objects;
    });
  };

  /* Combine all 3 calls for the home page assignments,suscriptions,and launched instances
      Also automatically concats the 3 calls reponses to figure out which journals are already launched
  */
  this.get_home = function() {
    var params = '?username=' + username + '&api_key=' + api_key;


    /* ASSIGNMENTS PROMISE */
    var call_assignments = '/individualassignment/';
    var tassignments = $http({
      url:dev_server+call_assignments+params,
      method:"GET",
      headers:{'Content-Type': 'application/json'}
    });
    /* SUSCRIPTIONS PROMISE */
    var call_suscriptions = '/favoritelabjournal/';
    var tsuscriptions = $http({
      method:'GET',
      url:dev_server + call_suscriptions +params,
      headers:{'Content-Type': 'application/json'}
    });
    /* LAUNCHED LAB INSTANCES PROMISE */
    var call_launched = '/labjournalinstance/';
    var tlaunched = $http({
      url:dev_server+call_launched+params,
      method:"GET",
      headers:{'Content-Type': 'application/json'}
    });


    status_string = {
      'A':'Assigned',
      'I':'In Progress',
      'E':'In Progress - Experiment Submitted',
      'R':'In Progress - Experiment Result Ready',
      'S':'Submitted',
      'F':'Feedback Received'
    };

    return $q.all([tassignments,tsuscriptions,tlaunched]).then(function(response){
      var _assignments = response[0].data.objects;
      var _suscriptions = response[1].data.objects;
      var launched_instances = response[2].data.objects;
      /* need to merge the reponses to see which ones are in progress / completed */
      angular.forEach(launched_instances, function(instance, key){
        angular.forEach(_assignments, function(ass, key){
          if(instance.lab_journal === ass.lab_journal ) {
            ass.GUID = angular.copy(instance.GUID);
            ass.status = status_string[instance.status];
            ass.last_step_completed = angular.copy(instance.last_step_completed);
          }
        });
        angular.forEach(_suscriptions, function(sus, key){
          if(instance.lab_journal === sus.lab_journal ) {
            sus.GUID = angular.copy(instance.GUID);
            sus.status = status_string[instance.status];
            sus.last_step_completed = angular.copy(instance.last_step_completed);
          }
        });
      });
      var home = {
      'assignments':_assignments,
      'suscriptions':_suscriptions
      };
      suscriptions = angular.copy(_suscriptions);
      assignments = angular.copy(_assignments);

      return home;

    });
  
  };

  this.update_instance = function(data) {
    var params = '?username=' + username + '&api_key=' + api_key;
    var call = '/labjournalinstance/' + params;
    return $http({
      url:dev_server+call,
      method:"POST",
      data:data
    }).success(function(response){
      return response;
    });
  };


  this.register = function(data) {
    var call = '/registration/';
    return $http({
      url:dev_server+call,
      method:"POST",
      data:data
    }).then(function(response) {
      return response.data.objects;
    });
  };


  this.complete_the_journal = function(data) {
    var call = '/labjournalinstance/';
    return $http({
      url:dev_server+call+'?username='+username+'&api_key='+api_key,
      method:"POST",
      data:data
    }).then(function(response){
      console.log(response);
    });

  };


}]);


// http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournal/?username=student1&api_key=91eb6ee778f194eae706732b55bcef8171afb22f57363d3cdd1bd4e2 