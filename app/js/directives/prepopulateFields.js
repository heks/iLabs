// Initializing the module for the directives
var directives = angular.module('directives.prepopulateFields', []);

/**
* @ngdoc directive
* @name ng.directive:prepopulateQuestionfields
* @description
* This directive retains the previous step question values in the appropriate question input fields 
* once the user moves to the next step
*/

directives.directive('prepopulateQuestionfields', function($compile, $location, $http){
  return{
    scope: {},
    link: function(scope, element, attrs){
      var total_steps = localStorage.getItem('Totalsteps');
      var step_name = $location.path().substring($location.path().lastIndexOf('/') + 1);
      var index = step_name.charAt(step_name.length-1); //eg: step_no = 1
      var getstep_inputs = JSON.parse(localStorage.getItem(step_name));
      var GUID = localStorage.getItem('GUID');
      if (getstep_inputs){
        if (getstep_inputs.questions){
          var instance_split = getstep_inputs.questions[0].instance.split('/');
          var instance_GUID = instance_split[instance_split.length - 2];
          if (GUID == instance_GUID){
            var getquestion_length = getstep_inputs.questions.length;
            for (var ques = 0; ques < getquestion_length; ques++){
              var instance = getstep_inputs.questions[ques].instance.split('/');
              var getGUID = instance[instance.length - 2];
              var splitGUID = getGUID.split('_');
              var instance_GUID = splitGUID[1];
              var question_uri = getstep_inputs.questions[ques].question.split('/');
              var question_ID = question_uri[question_uri.length -2];
              var field_ID = instance_GUID+'_'+question_ID;
              var field_value = getstep_inputs.questions[ques].response;
              if (document.getElementById(field_ID) != null){
                document.getElementById(field_ID).value = field_value;
              }
            }
           }else{ /* nothing to execute */ }
        }
      }
    }
  }
});

/**
* @ngdoc directive
* @name ng.directive:prepopulateParameterfields
* @description
* This directive retains the previous step parameter values in the appropriate parameter input fields 
* once the user moves to the next step
*/

directives.directive('prepopulateParameterfields', function($compile, $location, $http){
  return{
    scope: {},
    link: function(scope, element, attrs){
      var total_steps = localStorage.getItem('Totalsteps');
      var step_name = $location.path().substring($location.path().lastIndexOf('/') + 1);
      var index = step_name.charAt(step_name.length-1); //eg: step_no = 1
      var getstep_inputs = JSON.parse(localStorage.getItem(step_name));
      var GUID = localStorage.getItem('GUID');
      if (getstep_inputs){
        if (getstep_inputs.parameters){
          var instance_split = getstep_inputs.parameters[0].instance.split('/');
          var instance_GUID = instance_split[instance_split.length - 2];
          if (GUID == instance_GUID){
            var getparameter_length = getstep_inputs.parameters.length;
            for (var param = 0; param < getparameter_length; param++){
              var instance = getstep_inputs.parameters[param].instance.split('/');
              var getGUID = instance[instance.length - 2];
              var splitGUID = getGUID.split('_');
              var instance_GUID = splitGUID[1];
              var parameter_uri = getstep_inputs.parameters[param].parameter.split('/');
              var question_ID = parameter_uri[parameter_uri.length -2];
              var field_ID = instance_GUID+'_'+question_ID;
              var field_value = getstep_inputs.parameters[param].response;
              if(document.getElementById(field_ID) != null){
                document.getElementById(field_ID).value = field_value;
              }
            }
          }else{ /* nothing to execute */ }
        }
      }
    }
  }
});


