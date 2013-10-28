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
var directives = angular.module('directives.compileContent', []);

/**
* @ngdoc directive
* @name ng.directive:myCallback
* @description
* This custom directive is used to render and manipulate the appropriate DOM elements for each step
* of the experiment. 
*/

directives.directive('compileContent', function($compile, $location, $http, checkInputfields, parameterquestionValues, 
    postupdateParameters, postupdateQuestions, updateInstance){
  return{
    scope: {scopeCtrlFn: '&callbackFn'},
    controller: 'experimentCtrl',
    link: function(scope, element, attrs){
      var total_steps = localStorage.getItem('Totalsteps');
      var step_name = $location.path().substring($location.path().lastIndexOf('/') + 1);
      var index = step_name.charAt(step_name.length-1); //eg: step_no = 1

      var getlabjournal = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
      var labjournalID = getlabjournal.id;
      var total_steps = getlabjournal.number_of_steps;

      // Parse through the labjournal jsonobject and convert the markdown content to HTML
      var body_content = '';
      if (content != undefined){
        var converter  = new Markdown.Converter(),
        markdownToHtml = converter.makeHtml;
        var markdowndata = getlabjournal.labjournalsteps[index].journal_step_content;
        body_content += markdownToHtml(markdowndata);
      }

      // Dynamically creating the experiment design form elements
      var deviceform = getlabjournal.labjournalsteps[index].journal_parameter_group;
      if (deviceform != null){
        localStorage.setItem('PARAMETER_GROUP_ID', deviceform.id);
        var deviceform_fields_length = deviceform.number_of_parameters;
        body_content += '<div class=\'designform\' id=\'device_form\'><div class=\'designform_header\'>';
        body_content += '<h1 class=\'designform_title\'>'+deviceform.title+'</h1></div>';
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
        var step = $location.path().substring($location.path().lastIndexOf('/') + 1);
        var index = parseInt(step.charAt(step.length-1));
	      var parameters = 'username='+localStorage.getItem('Username')+'&api_key='+localStorage.getItem('API_KEY');

	      // Check the inputfields are empty or not
	      var textbox = checkInputfields.isTextboxempty();
	      var dropdown = checkInputfields.isDropdownempty();
	      var textarea = checkInputfields.isTextareaempty();

	      var getLabjournal = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
	      var total_steps = getLabjournal.number_of_steps;
	      if (index < total_steps){ var step_no = index; }
	        if (step_no < total_steps){
	          var title = getLabjournal.labjournalsteps[index].journal_step_title;
	          var labtitle = title.toLowerCase();
	          if (textbox == true && dropdown == true && textarea == true){
              // grab the parameter values from the appropriate inputfields
              var parameter_array = parameterquestionValues.getParametervalues(); 
              // grab the question values from the appropriate inputfields
              var question_array = parameterquestionValues.getQuestionvalues(); 
	            // Create a JSON object containing parameter and question data using the parameter and question arrays
              var JSONcombined_data  = parameterquestionValues.parameterquestion_JSON(parameter_array, question_array);
	            // POST and UPDATE the experiment data on each step
	            scope.postupdateExperimentdata(JSONcombined_data, parameters, step_name);
	            var JSONcombined_data_string = JSON.stringify(JSONcombined_data);
	            localStorage.setItem(step_name, JSONcombined_data_string);
              updateInstance.updateInstance(parameters, index);
	          }else{
	            alert('Please fill out the empty field(s)');
	          }
	        }
	      }
	    }
    }
});
