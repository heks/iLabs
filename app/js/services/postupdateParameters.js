var mobileapp = angular.module('services.postupdateParameters',[]);
mobileapp.service('postupdateParameters', function(){
	/**
    * @ngdoc function 
    * @name postParametervalues
    * @description
    * Post the parameter value to the API
    * @param JSONcombined_data {jsonObject} - Containing parameters and questions input values
    * @param parameters {String} - Additional data to pass to the query string(API post url)
    */

    this.postParametervalues = function(JSONcombined_data, parameters){
      if (JSONcombined_data['parameters'] != undefined){
        for (var param_loop = 0; param_loop < JSONcombined_data['parameters'].length; param_loop++){
          var param_data = JSON.stringify(JSONcombined_data['parameters'][param_loop]);
          $.ajax({
            url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalparameterresponse/?'+parameters,
            crossDomain: 'false',
            type: 'POST',
            data: param_data,
            contentType: 'application/json',
            cache: false,
            dataType: 'json',
            async: false,
            processData: false,
            success: function(data){},
            error: function(XMLHttpRequest, textStatus, errorThrown){
              alert('XMLHttpRequest: '+XMLHttpRequest.responseText);
              alert('Error Message: '+textStatus);
              alert('HTTP Error: '+errorThrown);
            }
          });
        }
      }
    }

     /**
    * @ngdoc function 
    * @name updateParametervalues
    * @description
    * Update the parameter value, if we change the parameter value of the same experiment instance
    * @param JSONcombined_data {jsonObject} - Containing parameters and questions input values
    * @param parameters {String} - Additional data to pass to the query string(API update url)
    * @param step_name {String} - The name of the current step( eg: step1)
    */

    this.updateParametervalues = function(JSONcombined_data, parameters, step_name){
      if (JSONcombined_data['parameters'] != undefined){
        var get = JSON.parse(localStorage.getItem(step_name));
        var parameter_update = new Array();
        for (var param_loop = 0; param_loop < JSONcombined_data['parameters'].length; param_loop++){
          var lsResponse = get.parameters[param_loop].response;
          var fResponse = JSONcombined_data['parameters'][param_loop].response;
          var splitGUID = JSONcombined_data['parameters'][param_loop].instance.split('/');
          var getGUID = splitGUID[splitGUID.length -2];
          var splitPID = JSONcombined_data['parameters'][param_loop].parameter.split('/');
          var getPID = splitPID[splitPID.length -2];
          console.log("lsfvalue: "+lsResponse+" = fvalue: "+fResponse);
                      
          if (lsResponse != fResponse){
            parameter_update.push(1);
            var JSONobj = {"instance" : "/api/v1/labjournalinstance/"+getGUID+"/", "parameter" : "/api/v1/deviceparameter/"+getPID+"/", "response" : fResponse};
            var param_data = JSON.stringify(JSONobj);
            var update_url = 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalparameterresponse/?'+parameters;
            $.ajax({
              url: update_url,
              crossDomain: 'false',
              type: 'POST',
              data: param_data,
              contentType: 'application/json',
              cache: false,
              dataType: 'json',
              async: false,
              processData: false,
              success: function(data){},
              error: function(XMLHttpRequest, textStatus, errorThrown){
                alert('XMLHttpRequest: '+XMLHttpRequest.responseText);
                alert('Error Message: '+textStatus);
                alert('HTTP Error: '+errorThrown);
              }
            });
          }else{
            parameter_update.push(0);
          }
        }
        // Check if the parameter values are updated or not
        if($.inArray(1, parameter_update) != -1){
          //submit the experiment design to the API
          localStorage.setItem('SUBMIT_DESIGN',1);
          //$scope.submitExperimentdesign(JSONcombined_data, parameters);
        }
      }
    }
});