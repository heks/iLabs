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
      var labtitle = scope.Labtitle;
      var path = $location.path();
      var step_name = path.substring(path.lastIndexOf('/') + 1);
      var index = step_name.charAt(step_name.length-1); //eg: step_no = 1
      var getstep_inputs = JSON.parse(localStorage.getItem(step_name));
      var GUID = localStorage.getItem('GUID');
      if (getstep_inputs){
        if (getstep_inputs.questions){
          var instance = getstep_inputs.questions[0].instance;
          var instance_split = instance.split('/');
          var instance_GUID = instance_split[instance_split.length - 2];
          if (GUID == instance_GUID){
            var getquestion_length = getstep_inputs.questions.length;
            for (var ques = 0; ques < getquestion_length; ques++){
              var d1 = getstep_inputs.questions[ques].instance;
              var d2 = d1.split('/');
              var s1 = d2[d2.length - 2];
              var s2 = s1.split('_');
              var instance_GUID = s2[1];
              var d3 = getstep_inputs.questions[ques].question;
              var d4 = d3.split('/');
              var question_ID = d4[d4.length -2];
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
      var labtitle = scope.Labtitle;
      var path = $location.path();
      var step_name = path.substring(path.lastIndexOf('/') + 1);
      var index = step_name.charAt(step_name.length-1); //eg: step_no = 1
      var getstep_inputs = JSON.parse(localStorage.getItem(step_name));
      var GUID = localStorage.getItem('GUID');
      if (getstep_inputs){
        if (getstep_inputs.parameters){
          var instance = getstep_inputs.parameters[0].instance;
          var instance_split = instance.split('/');
          var instance_GUID = instance_split[instance_split.length - 2];
          if (GUID == instance_GUID){
            var getparameter_length = getstep_inputs.parameters.length;
            for (var param = 0; param < getparameter_length; param++){
              var d1 = getstep_inputs.parameters[param].instance;
              var d2 = d1.split('/');
              var s1 = d2[d2.length - 2];
              var s2 = s1.split('_');
              var instance_GUID = s2[1];
              var d3 = getstep_inputs.parameters[param].parameter;
              var d4 = d3.split('/');
              var question_ID = d4[d4.length -2];
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


