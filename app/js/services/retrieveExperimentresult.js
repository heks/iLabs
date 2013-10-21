var mobileapp = angular.module('services.retrieveExperimentresult',[]);
mobileapp.service('retrieveExperimentresult', function(){
    /**
    * @ngdoc function 
    * @name retrieveExperimentresult
    * @description
    * Get the experiment result from the API and stored in the local storage
    */

    this.retrieveExperimentresult = function(){
      var username = localStorage.getItem('Username');
      var api_key = localStorage.getItem('API_KEY');
      var parameters = 'username='+username+'&api_key='+api_key;
      var empty_data = JSON.stringify({});
      $.ajax({
        url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/experiment/test/result/6/?'+parameters,
        crossDomain: 'false',
        type: 'GET',
        data: empty_data,
        contentType: 'application/json',
        cache: false,
        dataType: 'json',
        async: false,
        processData: false,
        success: function(data){
          console.log(data);
          var stringify_result = JSON.stringify(data);
          localStorage.setItem('EXPERIMENT_RESULT', stringify_result);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          alert('XMLHttpRequest: '+XMLHttpRequest.responseText);
          alert('Error Message: '+textStatus);
          alert('HTTP Error: '+errorThrown);
        }
      });
    }
});