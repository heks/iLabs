/**
* Directives are used to make custom HTML elements and simplify DOM manipulation.
*
* Advantage: Standard HTML elements have fixed behavior. To make the element behave 
* like some other element, it takes custom CSS and JS call from the Javascript code.
* Angularjs makes this easier by wrapping all this in a directive
* 
* @description
* The directive() function is used to create custom directive. It returns an object 
* in its callback function. 
* @param $compile {ngMethod} An angular method - It traverses the DOM and matches the directives. 
* If the match is found it is added to the list of directives associated with the given DOM element. 
* Once all the directives for a given DOM element have been identified they are sorted by priority 
* and their compile() functions are executed.
* @param $location {ngService} An angular service - It parses the URL in the browser adddress bar and makes the URL
* available to the application. Changes to the URL in the address bar reflected into $location service and viceversa.
* @param $http {ngService} - It takes a single argument that is used to generate an HTTP request and 
* returns response with two $http methods: success and error
* 
* The link() function is used to register all listeners on a specific DOM element
* @param scope -  Directives can be given their own scopes
* Note: Without declaring an isolated scope from the rest of the DOM, the directive could mishandle with the
* local controller scope and cause unexpected behavior
* @param element - An element the directive is bound to
* @param attrs - A list of attributes associated with the element
*/

// Initializing the module for the directives
var directives = angular.module('mobileApp.directives', []);

/**
* @ngdoc directive
* @name ng.directive:myCallback
* @description
* This custom directive is used to render and manipulate the appropriate DOM elements for each step
* of the experiment. 
*/

directives.directive('myCallback', function($compile, $location, $http){
  return{
    scope: {scopeCtrlFn: '&callbackFn'},
    controller: 'experimentCtrl',
    link: function(scope, element, attrs){
      var total_steps = localStorage.getItem('Totalsteps');
      var labtitle = scope.Labtitle;
      var path = $location.path();
      var step_name = path.substring(path.lastIndexOf('/') + 1);
      var index = step_name.charAt(step_name.length-1); //eg: step_no = 1
      var getlabjournal = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
      var labjournalID = getlabjournal.id;
      var total_steps = getlabjournal.number_of_steps;

      // Parse through the labjournal jsonobject and convert the markdown content to HTML
      var body_content = '';
      var content = getlabjournal.labjournalsteps[index].journal_step_content;
      if (content != undefined){
        var converter  = new Markdown.Converter(),
        markdownToHtml = converter.makeHtml;
        var markdowndata = content;
        var htmlcontent = markdownToHtml(markdowndata);
        body_content += htmlcontent;
      }

      // Dynamically creating the experiment design form elements
      var deviceform = getlabjournal.labjournalsteps[index].journal_parameter_group;
      if (deviceform != null){
        var parameter_group_id = deviceform.id;
        localStorage.setItem('PARAMETER_GROUP_ID', parameter_group_id);
        var deviceform_title = deviceform.title;
        var deviceform_fields_length = deviceform.number_of_parameters;
        body_content += '<div class=\'designform\' id=\'device_form\'><div class=\'designform_header\'>';
        body_content += '<h1 class=\'designform_title\'>'+deviceform_title+'</h1></div>';
        for (var i = 0; i < deviceform_fields_length; i++){
          var label = deviceform.parameters[i].title;
          var description = deviceform.parameters[i].help_text;
          var formfieldID = deviceform.parameters[i].id;
          var field_type = deviceform.parameters[i].field_type.field_type;
          var form_fields = '<label>'+label+'<a  tooltip-placement=\'top\' tooltip-html-unsafe=\''+description+'\'>';
          form_fields += '<img class=\'info\' src=\'./img/information.png\'></a></label>';
          var getHash = localStorage.getItem('HASH_VALUE');
          var forminputID = getHash+'_'+formfieldID;
          // Textbox input                
          if (field_type == 'Text Field'){
            form_fields += '<input type=\'text\' style=\'width:215px;height:30px\' id=\''+forminputID+'\'></br>';
          }
          // Sliderbar input
          if (field_type == 'Slider Bar'){
            var min_value = deviceform.parameters[i].min_value;
            var max_value = deviceform.parameters[i].max_value;
            var step_value = deviceform.parameters[i].increment_value;
            var model = label.replace('(', '').replace(')','').replace(' ','');
            form_fields += '<input style=\'width:100px\' type=\'range\'  value=\'0\' ng-model=\''+model+'\'';
            form_fields += 'id=\'slider\' min=\''+min_value+'\' max=\''+max_value+'\' step=\''+step_value+'\' >';
            form_fields += '<input type=\'text\'  id=\''+forminputID+'\' value=\'{{'+model+'}}\' style=\'width:60px;height:30px\'/>';
          }
          // Dropdown input
          if (field_type == 'Drop Down'){
            var min_value = deviceform.parameters[i].min_value;
            var max_value = deviceform.parameters[i].max_value;
            var step_value = deviceform.parameters[i].increment_value;
            form_fields += '<select id=\''+forminputID+'\'>';
            for (var j = 1; j <= max_value; j++){
              form_fields += '<option>'+j+'</option>';
            }
            form_fields += '</select></br>';
          }
            body_content += form_fields;
        }
        body_content += '</div></br>';
      }

      // Dynamically creating the question elements 
      var questions = getlabjournal.labjournalsteps[index].questions;
      if (questions != undefined){
        var number_of_questions = getlabjournal.labjournalsteps[index].number_of_questions;
          for (var k = 0; k < questions.length; k++){
            var questionID = questions[k].id;
            var getHash = localStorage.getItem('HASH_VALUE');
            var questionInputID = getHash+'_'+questionID;
            var question = '<p id=\''+questionID+'\'>'+questions[k].question.question_text+'</p>\n';
            if (questions[k].question.answer_field_type.field_type == 'Text Area'){
              question += '<textarea placeholder=\'Please enter your answer here...\' id=\''+questionInputID+'\'>';
              question += '</textarea><a ng-click=\'clearTextarea(\''+questionInputID+'\')\'><img src=\'./img/no.png\'></a></br></br>';
            }
            if (questions[k].question.answer_field_type.field_type == 'Text Field'){
              question += '<input type=\'text\' style=\'width:215px;height:30px\' id=\''+questionInputID+'\'></br>';
            }
              body_content += question;
          }
      }

      // Dynamically adding the Exit button to the last step of the experiment
      var final_step = parseInt(index) +1;
      if (final_step == total_steps){
        body_content += '<button id=\'exitLab\' ng-click=\'exitLab()\'>Exit Lab</button>'
      }
      console.log('HTML : '+body_content)
      
      // Compile the finally created HTML content using the angular compile method and append that HTML
      // content to each step template 
      if (body_content != ''){                                
        var compilehtml = $compile(body_content)(scope);
        scope.scopeCtrlFn({content: compilehtml});
      }

      // Clear the textarea input field value
      scope.clearTextarea = function(inputID){
        document.getElementById(inputID).value = '';
      }

      // Exit the lab at the end of the experiment
      scope.exitLab = function(){
	      var path = $location.path();
        var step = path.substring(path.lastIndexOf('/') + 1);
        var index = parseInt(step.charAt(step.length-1));
	      var username = localStorage.getItem('Username');
	      var api_key = localStorage.getItem('API_KEY');
	      var parameters = 'username='+username+'&api_key='+api_key;

	      // Check the inputfields are empty or not
	      var textbox = scope.isTextboxempty();
	      var dropdown = scope.isDropdownempty();
	      var textarea = scope.isTextareaempty();

	      var getLabjournal = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
	      var total_steps = getLabjournal.number_of_steps;
	      if (index < total_steps){ var step_no = index; }
	        if (step_no < total_steps){
	          var title = getLabjournal.labjournalsteps[index].journal_step_title;
	          var labtitle = title.toLowerCase();
	          if (textbox == true && dropdown == true && textarea == true){
              // grab the parameter values from the appropriate inputfields
	            var parameter_array = scope.getParametervalues(); 
              // grab the question values from the appropriate inputfields
	            var question_array = scope.getQuestionvalues(); 
	            console.log(parameter_array); console.log(question_array);
	            // Create a JSON object containing parameter and question data using the parameter and question arrays
	            var JSONcombined_data  = scope.parameterquestion_JSON(parameter_array, question_array);
	            console.log(JSONcombined_data);
	            // POST and UPDATE the experiment data on each step
	            scope.postupdateExperimentdata(JSONcombined_data, parameters, step_name);
	            var JSONcombined_data_string = JSON.stringify(JSONcombined_data);
	            localStorage.setItem(step_name, JSONcombined_data_string);
	            scope.updateInstance(parameters, index);
	          }else{
	            alert('Please fill out the empty field(s)');
	          }
	        }
	      }
	    }
    }
});

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


