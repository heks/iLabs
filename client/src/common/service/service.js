angular.module('service', ['angularLocalStorage'])
.constant('dev_server','http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1')
.constant('other_server','http://54.200.25.203')
.service('api', ['$http','$q','dev_server','other_server','$rootScope','storage', function ($http,$q,dev_server,other_server,$rootScope,storage) {
	
  var username;
  var api_key;
  var assignments = [];
  var suscriptions = [];
  var explore_journals = [];
  var steps = [];

  this.login = function(_username,_password) {
    username = _username;
		var parameters = 'username=' + _username + '&password=' + _password;
    var url = dev_server + '/login/?' + parameters;
    return $http({
      method:'POST',
      url:url,
      headers:{'Content-Type': 'application/json'},
      data:{}
    }).success(function(data){
      api_key = data.api_key;
      console.log(data);
      return data;
    }).error(function(error){
      console.log(error);
      return error;
    }); 
	};

  this.get_assignment = function(idx,type) {
    if(type==='assignments') {
      return assignments[idx];
    }
    else if(type==='subscriptions') {
      return subscriptions[idx];
    }
  };

	this.get_assignments = function() {
    var parameters = 'username=' + username + '&api_key=' + api_key;
    return $http({
      method:'GET',
      url: dev_server + '/labjournalassignment/?'+parameters,
      headers:{'Content-Type': 'application/json'}
    }).then(function(response){
      angular.copy(response.data.objects,assignments);
      storage.set('assignments',response.data.objects);
      return response.data.objects;
    }, function(error){
      if(storage.get('assignments')) {
        return storage.get('assignments');
      } else {
        // not in local storage so FUCK
        console.log(error);
        return 'error';
      }
    });
	};

	this.get_suscriptions = function() {
    var parameters = 'username=' + username + '&api_key=' + api_key;
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


        var call;

        /* first check if we have the reponse stored in local storage */
        var _type = storage.get(type);
        var _idx = parseInt(storage.get('idx'),10);

        if(angular.isDefined(_type) && angular.isNumber(_idx) && !isNaN(_idx) ) {
          call = _type[_idx].lab_journal; // find the key
          var _steps = storage.get(call);
          angular.copy(_steps,steps); // copy the current steps
          deferred.resolve(_steps);
        } else {

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
            storage.set(call,response.lab_journal_steps);
            storage.set('idx',idx);
            deferred.resolve(response.lab_journal_steps);
          }).error(function(err){
            deferred.reject('ERRROR');
          });

        }

        return deferred.promise;

  };

  this.get_step = function(idx) {
    var deferred = $q.defer();
    if(idx === steps.length) {
      deferred.reject('Reached end');
    } else {
      console.log(steps[idx]);
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
  this.start_journal = function(lab_journal) {
        var call = '/labjournalinstance/';
        var GUID = 'x';//username + ':' + new Date().getTime().toString();

        var data = {
          "GUID": GUID,
          "lab_journal":lab_journal
        };

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

// /api/v1/favoritelabjournal/?username=student1&api_key=53580…

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


}]);


// http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournal/?username=student1&api_key=91eb6ee778f194eae706732b55bcef8171afb22f57363d3cdd1bd4e2 