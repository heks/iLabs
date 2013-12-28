angular.module('service', [])
.constant('dev_server','http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com')
.constant('other_server','http://54.200.25.203')
.service('api', ['$http','dev_server','other_server','$rootScope', function ($http,dev_server,other_server,$rootScope) {
	
  var username;
  var api_key;
  var assignments = [];
  var suscriptions = [];
  var explore_journals = [];
  var steps = [];

  this.login = function(_username,_password) {
    username = _username;
		var parameters = 'username=' + _username + '&password=' + _password;
    var url = dev_server + '/api/v1/login/?' + parameters;
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
      url: dev_server + '/api/v1/labjournalassignment/?'+parameters,
      headers:{'Content-Type': 'application/json'}
    }).success(function(data){
      console.log(data);
      angular.copy(data.objects,assignments);
      return data;
    }).error(function(data){
      return "Error in server call";
    });
	};

	this.get_suscriptions = function() {
    var parameters = 'username=' + username + '&api_key=' + api_key;
    return $http({
      method:'GET',
      url:dev_server + '/api/v1/labjournalsubscription/?'+parameters,
      headers:{'Content-Type': 'application/json'}
    }).success(function(data){
      console.log(data);
      angular.copy(data.objects,subscriptions);
      return data;
    }).error(function(data){
      return data;
    });
  };

  this.get_steps = function(type,idx) {
        var call = '';
        console.log(assignments);
        if(type === 'assignments') {
          call = assignments[idx].lab_journal;
        } else if ($stateParams.type === 'suscriptions') {
          call = suscriptions[idx].lab_journal;
        }

        return $http({
          method: 'GET',
          url:dev_server+call+'?username='+username+'&api_key='+api_key,
          headers:{'Content-Type': 'application/json'}
        }).success(function(data){
          console.log(data);
          angular.copy(data.lab_journal_steps, steps);
          return data;
        }).error(function(data){
          return data;
        });
  };

  this.get_step = function(idx) {
    // angular.forEach(steps[idx].questions, function(value, key){
    //   angular.forEach(value.question, function(question, key){
    //     angular.forEach(question.options,function(option,key) {
    //       option = parseInt(option,10);
    //     });
    //   });
    // });
    // if(steps[idx].journal_parameter_group != null) {
    //   angular.forEach(steps[idx].journal_parameter_group.parameters, function(parameter, key){
    //     console.log(parameter);
    //     if(parameter.field_type === 'SB' || parameter.field_type === 'DD') {
    //       angular.forEach(parameter.options,function(option,key){
    //         console.log(option);
    //         angular.copy(parseInt(option,10).option);
    //       });
    //     }
    //   });
    // }
    return steps[idx];
  };

  this.get_explore_journals = function(username,api_key) {
    var parameters = 'username=' + username + '&api_key=' + api_key;
    var promise;

    if(promise) {
      return promise;
    } else {
      promise = $http({
        method:'GET',
        url: dev_server + '/api/v1/browselabjournal/?'+parameters,
        headers:{'Content-Type': 'application/json'}
      }).success(function(response){
        console.log(response.data);
        return response.data; 
      }).error(function(data){
        return "Error in server call";
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
        var call = '/api/v1/labjournalinstance/';
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

  this.post_lab_journal_resonse = function(data) {
    var call = '/api/v1/labjournalquestionresponse/';
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


}]);


// http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournal/?username=student1&api_key=91eb6ee778f194eae706732b55bcef8171afb22f57363d3cdd1bd4e2 