angular.module('service', ['angularLocalStorage'])
.constant('dev_server','http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1')
.constant('api_prefix','/api/v1')
.constant('other_server','http://54.200.25.203')


.service('api', ['$http','$q','dev_server','other_server','$rootScope','storage', function ($http,$q,dev_server,other_server,$rootScope,storage) {
	
  var username = storage.get('username') || [];
  var api_key = storage.get('api_key') || [];
  var assignments = storage.get('assignments') || [];
  var suscriptions = storage.get('suscriptions') || [];
  var explore_journals = [];
  var steps = [];

  this.login = function(_username,_password) {
		var parameters = 'username=' + _username + '&password=' + _password;
    var url = dev_server + '/login/?' + parameters;
    return $http({
      method:'POST',
      url:url,
      headers:{'Content-Type': 'application/json'},
      data:{}
    }).success(function(data){
      api_key = data.api_key;
      username = _username;

      /* set the local storage (person should need to reauthenticate on a disconnect */
      storage.set('api_key',data.api_key);
      storage.set('username',username);

      return data;
    }).error(function(error){
      console.log(error);
      return error;
    }); 
	};


	this.get_assignments = function() {
    var deferred = $q.defer();
    console.log(storage.get('assignments'));
    if( assignments.length > 0 ) {
      deferred.resolve(assignments);
    } else {
      var parameters = 'username=' + username + '&api_key=' + api_key;
      $http({
        method:'GET',
        url: dev_server + '/labjournalassignment/?'+parameters,
        headers:{'Content-Type': 'application/json'}
      }).then(function(response){
        angular.copy(response.data.objects,assignments);
        storage.set('assignments',response.data.objects);
        deferred.resolve(response.data.objects);
      }, function(error){
        console.log(error);
        deferred.reject('ERRROR');
      });
    }

    return deferred.promise;
	};

	this.get_suscriptions = function() {
    var parameters = 'username=' + username + '&api_key=' + api_key;
    var deferred = $q.defer();

    return $http({
      method:'GET',
      url:dev_server + '/favoritelabjournal/?'+parameters,
      headers:{'Content-Type': 'application/json'}
    }).then(function(response){
      angular.copy(response.data.objects,suscriptions);
      storage.set('suscriptions',response.data.objects);
      return response.data.objects;
    }, function(error){
      // look in local storage for the suscriptions
      if(storage.get('suscriptions')) {
        return storage.get('suscriptions');
      } else {
        // not in local storage so FUCK
        console.log(error);
        return 'error';
      }
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

          $http({
            method: 'GET',
            url:'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com'+call+'?username='+username+'&api_key='+api_key,
            headers:{'Content-Type': 'application/json'}
          }).success(function(response){
            angular.copy(response.lab_journal_steps, steps);
            deferred.resolve(response.lab_journal_steps);
          }).error(function(err){
            deferred.reject('ERRROR');
          });

        return deferred.promise;
      };


  this.get_step = function(idx) {
    var deferred = $q.defer();
    if(idx === steps.length) {
      deferred.reject('Reached end');
    } else {
      deferred.resolve(steps[idx]);
      //} else if(storage.get(idx.toString())) {
      //  deferred.resolve( storage.get(idx.toString()) );
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

/*
"{
""GUID"": ""guid2"",
""lab_journal"": ""/api/v1/labjournal/2/""
}"

/api/v1/labjournalinstance/?username=student1&api_key=53580…
*/
  
  this.curr_journal = [];

  this.start_journal = function(lab_journal) {
        var call = '/labjournalinstance/';
        var GUID = 'x';//username + ':' + new Date().getTime().toString();

        var data = {
          "GUID": GUID,
          "lab_journal":lab_journal
        };

        this.curr_journal = angular.copy(data);

        return $http({
          method: 'POST',
          url:dev_server+call+'?username='+username+'&api_key='+api_key,
          headers:{'Content-Type': 'application/json'},
          data:data
        }).success(function(data){
          console.log("Successfully started journal");
          return data;
        }).error(function(data){
          return data;
        });
  };

  this.post_lab_journal_question_resonse = function(data) {
    var call = '/labjournalquestionresponse/';
    var x = {objects:data};
    console.log(x);
    return $http({
      url:dev_server+call+'?username='+username+'&api_key='+api_key,
      method:"PATCH",
      data:x
    }).success(function(data){
      console.log("successful patch");
      return data;
    }).error( function(data){
      console.log("error");
      return data;
    });
  };

// api/v1/labjournalquestionresponse/?username=student1&api_key=53580…

  this.post_lab_journal_parameter_response = function(data) {
    var call = '/labjournalparameterresponse/';
    var x = {objects:data};
    return $http({
      url:dev_server+call+'?username='+username+'&api_key='+api_key,
      method:"PATCH",
      data:x
    }).success(function(data){
      console.log("successful patch");
      return data;
    }).error( function(data){
      console.log("error");
      return data;
    });
  };

  // this.post_experiment = function() {
  //   var call = '/experiment/'

  //   return $http({
  //     url:dev_server+call+'?username='+username+'&api_key='+api_key,
  //     method:'POST',

  //   })


  // }

// /api/v1/favoritelabjournal/?username=student1&api_key=53580…

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

  // this.unsuscribe_journal = function(data) {
  //   var call = '/favoritelabjournal/';
  //   return $http({
  //     url:dev_server+call+'?username='+username+'&api_key='+api_key,
  //     method:"DELETE"
  //     date
  //   });
  // }


  this.suscribe_journal = function(data) {
    var call = '/favoritelabjournal/';
    return $http({
      url:dev_server+call+'?username='+username+'&api_key='+api_key,
      method:"POST",
      data:data
    }).success(function(data){
      console.log("successfully suscribed");
      return data;
    }).error( function(data){
      console.log("could not suscribe");
      return data;
    });
  };

  // /api/v1/experiment/result/251/?username=student1&api_key=53580…
  this.get_experiment_result = function(experiment_id) {
    var deferred = $q.defer();
    var call = '/experiment/result/'+experiment_id +'/';
    
    $http({
      url:dev_server+call+'?username='+username+'&api_key='+api_key,
      method:"GET"
    }).then(function(response){
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
    return deferred.promise;
  };


  // /api/v1/experiment/estTime/GUID/guidxrd/parameter_group_id/11/?username=student1&api_key=53580…
  this.get_estimated_time = function() {
    var call = '/experiment/estTime/GUID/' + 'x' + '/parameter_group_id/11/';
    return $http({
      url:dev_server+call+'?username='+username+'&api_key='+api_key,
      method:"GET"
    });
  };


// /api/v1/student/?username=student1&api_key=53580…
  this.get_student_info = function() {
    var call = '/student/';
    return $http({
      url:dev_server+call+'?username='+username+'&api_key='+api_key,
      method:"GET"
    }).then(function(response) {
      return response.data.objects;
    });
  };


  this.get_launched_instances = function () {
    var call = '/labjournalinstance/';
    return $http({
      url:dev_server+call+'?username='+username+'&api_key='+api_key,
      method:"GET"
    }).then(function(response) {
      return response.data.objects;
    });
  };


  ///api/v1/experiment/status/251/?username=student1&api_key=53580…

  // TODO
  /* Combine all 3 calls for the home page */
  // this.get_home = function() {
  //   var params = '?username=' + username + '&api_key=' + api_key;


  //   /* ASSIGNMENTS PROMISE */
  //   var call_assignments = '/labjournalassignment/';
  //   var assignments = $http({
  //     url:dev_server+call_assignments+params,
  //     method:"GET",
  //     headers:{'Content-Type': 'application/json'}
  //   });
  //   /* SUSCRIPTIONS PROMISE */
  //   var call_suscriptions = '/favoritelabjournal/';
  //   var suscriptions = $http({
  //     method:'GET',
  //     url:dev_server + call_suscriptions +params,
  //     headers:{'Content-Type': 'application/json'}
  //   });
  //   /* LAUNCHED LAB INSTANCES PROMISE */
  //   var call_launched = '/labjournalinstance/';
  //   var launched = $http({
  //     url:dev_server+call_launched+params,
  //     method:"GET",
  //     headers:{'Content-Type': 'application/json'}
  //   });

  //   $q.all([assignments,suscriptions,launched]).then(function(response){
  //     var assignments = response[0].data.objects;
  //     var suscriptions = response[1].data.objects;
  //     var launched_instances = response[2].data.objects;
  //     console.log(assignments);
  //     console.log(suscriptions);
  //     console.log(launched_instances);

  //     /* need to merge the reponses to see which ones are in progress / completed */
  //     // angular.forEach(launched_instances, function(instance, key){
  //     //   angular.forEach(assignments, function(assignment, key){
  //     //     if(instance.lab_journal === assignment.lab_journal ) {

  //     //     }
  //     //   });
  //     //   angular.forEach(suscriptions, function(suscription, key){
          
  //     //   });

  //     // });


  //   });

  // };

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


  // this.get_steps = function(type,idx) {
  //       var deferred = $q.defer();

  //       var x;

  //       if(type === 'assignments') {
  //         x = assignments[idx].lab_journal;
  //       } else if (type === 'suscriptions') {
  //         x = suscriptions[idx].lab_journal;
  //       }

  //       console.log(x);

  //       var call;
  //       var _steps;
  //       /* first check if we have the reponse stored in local storage */
  //       var _type = storage.get(type);
  //       var _idx = parseInt(storage.get('idx'),10);
  //       console.log(storage.get(x));

  //       /* check to see if we already launched the journal before */
  //       if( storage.get(x) != null ) {
  //           console.log(x);
  //           storage.set('idx',idx);
  //           //call = _type[idx].lab_journal;
  //           _steps = storage.get(x);
  //           angular.copy(_steps,steps); // copy the current steps
  //           deferred.resolve(_steps);
  //       } else if(angular.isDefined(_type) && angular.isNumber(_idx) && !isNaN(_idx) ) {
  //         console.log("IN LOCAL STORAGE IN GET STEPS");
  //         call = _type[_idx].lab_journal; // find the key
  //         console.log(call);
  //         _steps = storage.get(call);
  //         angular.copy(_steps,steps); // copy the current steps
  //         deferred.resolve(_steps);
  //       } else {

  //         if(type === 'assignments') {
  //           call = assignments[idx].lab_journal;
  //         } else if (type === 'suscriptions') {
  //           call = suscriptions[idx].lab_journal;
  //         }

  //         $http({
  //           method: 'GET',
  //           url:'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com'+call+'?username='+username+'&api_key='+api_key,
  //           headers:{'Content-Type': 'application/json'}
  //         }).success(function(response){
  //           angular.copy(response.lab_journal_steps, steps);
  //           storage.set(call,response.lab_journal_steps);
  //           storage.set('idx',idx);
  //           deferred.resolve(response.lab_journal_steps);
  //         }).error(function(err){
  //           deferred.reject('ERRROR');
  //         });

  //       }

  //       return deferred.promise;

  // };

// http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournal/?username=student1&api_key=91eb6ee778f194eae706732b55bcef8171afb22f57363d3cdd1bd4e2 