var mobileapp = angular.module('services.submitExperimentdesign',[]);
mobileapp.service('submitExperimentdesign', function(){
	/**
    * @ngdoc function 
    * @name sumbitExperimentdesign
    * @description
    * Submit the experiment design values to the API
    * @param parameters {String} - Additional data to pass to the query string(submit url)
    */

    this.submitExperimentdesign = function(JSONcombined_data, parameters){
      var instance_GUID = localStorage.getItem('GUID');
      var parameter_group_id = localStorage.getItem('PARAMETER_GROUP_ID');
      var submit_data = {"instance": "/api/v1/labjournalinstance/"+instance_GUID+"/", "parameter_group": "/api/v1/deviceparametergroup/"+parameter_group_id+"/", "experiment_id": 26};
      var stringify_submit_data = JSON.stringify(submit_data);
      var designsubmit_url = 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/experiment/?'+parameters;
                  
      if (JSONcombined_data['parameters'] != undefined){
        console.log("step1")
        console.log(submit_data);console.log(designsubmit_url)
        $.ajax({
          url: designsubmit_url,
          crossDomain: 'false',
          type: 'POST',
          data: stringify_submit_data,
          contentType: 'application/json',
          cache: false,
          dataType: 'json',
          async:  false,
          processData: false,
          success: function(data){console.log('Submit: '+data); localStorage.setItem('SUBMIT_DESIGN',1); },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            alert('XMLHttpRequest: '+XMLHttpRequest.responseText);
            alert('Error Message: '+textStatus);
            alert('HTTP Error: '+errorThrown);
          }
        });
      }
    }
});