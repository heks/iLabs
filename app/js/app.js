var mobileApp = angular.module('mobileApp', ['ui.bootstrap', 'mobileApp.directives']);
//var translate = angular.module('mobileApp',['pascalprecht.translate']);
mobileApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'loginCtrl'
  })
  .when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'homeCtrl'
  })
  .when('/home1', {
    templateUrl: 'partials/home1.html',
    controller: 'homeCtrl'
  })
  .when('/mygroups', {
    templateUrl: 'partials/mygroups.html',
    controller: 'groupCtrl'
  })
  .when('/assignments', {
    templateUrl: 'partials/assignments.html',
    controller: 'assignmentCtrl'
  })
  .when('/subscriptions', {
    templateUrl: 'partials/subscriptions.html',
    controller: 'subscriptionCtrl'
  })
  .when('/labjournals', {
    templateUrl: 'partials/labjournals.html',
    controller: 'labjournalCtrl'
  })
  .when('/partial1', {
    templateUrl: 'partials/partial1.html',
    controller: 'labCtrl'
  })
  .when('/research', {
    templateUrl: 'steps/research.html',
    controller: 'researchCtrl'
  })
  .when('/question', {
    templateUrl: 'steps/question.html',
    controller: 'questionCtrl'
  })
  .when('/design', {
    templateUrl: 'steps/design.html',
    controller: 'designCtrl'
  })
  .when('/investigate', {
    templateUrl: 'steps/investigate.html',
    controller: 'investigateCtrl'
  })
  .when('/analyze', {
    templateUrl: 'steps/analyze.html',
    controller: 'analyzeCtrl'
  })
  .when('/interpret', {
    templateUrl: 'steps/interpret.html',
    controller: 'interpretCtrl'
  })
  .when('/simulation/:Id',{
    templateUrl: 'steps/simulation.html',
    controller: 'simCtrl'
  })
  .when('/account/:Id',{
    templateUrl: 'steps/account.html',
    controller: 'accCtrl'
  })
  .when('/messages/:Id',{
    templateUrl: 'steps/messages.html',
    controller: 'msgCtrl'
  })
  .when('/webcam/:Id',{
    templateUrl: 'steps/webcam.html',
    controller: 'webCtrl'
  })
  .when('/template/:Id',{
    templateUrl: 'partials/template.html',
    controller: 'templateCtrl'
  })
   .when('/template/:Key/:Id',{
    templateUrl: 'partials/template.html',
    controller: 'templateCtrl'
  })
  .when('/tempcontent/:Id',{
    templateUrl: 'partials/tempcontent.html',
    controller: 'templateCtrl'
  })
  .otherwise({
    redirectTo: '/login'
  });
}).run(function($rootScope, $location) {
  $rootScope.location = $location;
});
// Home Content

      
//Template Content Directive
mobileApp.directive('myCallback', function($compile, $location, $http){
  return{
    scope: {scopeCtrlFn: '&callbackFn'},
    link: function(scope, element, attrs){
      var couponId = localStorage.getItem('CouponID');
      var total_steps = localStorage.getItem('Totalsteps');
      var labtitle = scope.Labtitle;
      var path = $location.path();
      var value = path.substring(path.lastIndexOf('/') + 1);
      var index = value.charAt(value.length-1); //eg: step_no = 1
                                
      //$http.get('template/'+jsontemplate).success(function(data){
      // Load the labjournal from the Local Storage
      var getJSON = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
      var labjournalID = getJSON.id;
      var total_steps = getJSON.number_of_steps;

      //parse through the json object and retrieve the data
      var body_content = "";
      var content = getJSON.labjournalsteps[index].journal_step_content;
      if(content != undefined){
        var converter  = new Markdown.Converter(),
        markdownToHtml = converter.makeHtml;

        var markdowndata = content;
        var htmlcontent = markdownToHtml(markdowndata);
        body_content += htmlcontent;
      }

      // Device form 
      var deviceform = getJSON.labjournalsteps[index].journal_parameter_group;
      if(deviceform != null){
        var parameter_group_id = deviceform.id;
        localStorage.setItem('PARAMETER_GROUP_ID', parameter_group_id);
        var deviceform_title = deviceform.title;
        var deviceform_fields_length = deviceform.number_of_parameters;
       // body_content += "<div class=\"designform\" id=\"device_form\"><h1 class=\"designform_title\">"+deviceform_title+"</h1>";
       body_content += "<div class=\"designform\" id=\"device_form\"><div class=\"designform_header\"><h1 class=\"designform_title\">"+deviceform_title+"</h1></div>";
        for(var i=0; i < deviceform_fields_length; i++){
          var label = deviceform.parameters[i].title;
          var description = deviceform.parameters[i].help_text;
          var formfieldID = deviceform.parameters[i].id;
          var field_type = deviceform.parameters[i].field_type.field_type;
          var form_fields = "<label>"+label+"<a  tooltip-placement=\"top\" tooltip-html-unsafe=\""+description+"\"><img class=\"info\" src=\"./img/information.png\"></a></label>";
          /*<img class=\"info\" src=\"./img/question.png\">*/
          var getHash = localStorage.getItem('HASH_VALUE');
          var forminputID = getHash+"_"+formfieldID;

          // Textbox input                
          if(field_type == "Text Field"){
            form_fields += "<input type=\"text\" style=\"width:215px;height:30px\" id=\""+forminputID+"\"></br>";
          }
          // Sliderbar input
          if(field_type == "Slider Bar"){
            var min_value = deviceform.parameters[i].min_value;
            var max_value = deviceform.parameters[i].max_value;
            var step_value = deviceform.parameters[i].increment_value;
            var model = label.replace('(', '').replace(')','').replace(' ','');
            form_fields += "<input style=\"width:100px\" type=\"range\"  value=\"0\" ng-model=\""+model+"\" id=\"slider\" min=\""+min_value+"\" max=\""+max_value+"\" step=\""+step_value+"\" ><input type=\"text\"  id=\""+forminputID+"\" value=\"{{"+model+"}}\" style=\"width:60px;height:30px\"/>"
          }
          // Dropdown input
          if(field_type == "Drop Down"){
            var min_value = deviceform.parameters[i].min_value;
            var max_value = deviceform.parameters[i].max_value;
            var step_value = deviceform.parameters[i].increment_value;
            form_fields += "<select id=\""+forminputID+"\">";
            for(var j=1; j <= max_value; j++){
              form_fields += "<option>"+j+"</option>";
            }
            form_fields += "</select></br>";
          }
            body_content += form_fields;
        }
        body_content += "</div></br>";
        // Submit Design //
        var step_title = getJSON.labjournalsteps[index].journal_step_title;
        if(deviceform != undefined && step_title != 'Analyze'){
          body_content += "<button id=\"submit_design\"  ng-click=\"submitDesign()\">Submit Design</button>";
        }
      }

      // Questions 
      var questions = getJSON.labjournalsteps[index].questions;
      if(questions != undefined){
        var number_of_questions = getJSON.labjournalsteps[index].number_of_questions;
          for(var k=0; k < questions.length; k++){
            var questionID = questions[k].id;
            var getHash = localStorage.getItem('HASH_VALUE');
            var questionInputID = getHash+"_"+questionID;
            var question = "<p id=\""+questionID+"\">"+questions[k].question.question_text+"</p>\n";
            if(questions[k].question.answer_field_type.field_type == "Text Area"){
              question += "<textarea placeholder=\"Please enter your answer here...\" id=\""+questionInputID+"\"></textarea><a ng-click=\"clear('"+questionInputID+"')\"><img src=\"./img/no.png\"></a></br></br>";
            }
            if(questions[k].question.answer_field_type.field_type == "Text Field"){
              question += "<input type=\"text\" style=\"width:215px;height:30px\" id=\""+questionInputID+"\"></br>";
            }
            /*if(questions[k].question.answer_field_type.field_type == "Drop Down"){
                var min_value = deviceform.parameters[i].min_value;
                var max_value = deviceform.parameters[i].max_value;
                var step_value = deviceform.parameters[i].increment_value;
                question += "<select id=\""+questionInputID+"\">";
                for(var j=min_value; j <= max_value; j++){
                  question += "<option>"+j+"</option>";
                }
              question += "</select></br>";
            }*/
              body_content += question;
          }
      }

      // Download and Exit 
      var final_step = parseInt(index) +1;
      if(final_step == total_steps){
        //<button style=\"background:red;color:white;width:150px;height:35px\">Create PDF</button>
        body_content += "<button id=\"exitLab\" ng-click=\"exitLab()\">Exit Lab</button>"
      }
      console.log("HTML : "+body_content)
      
      // compile the finally created HTML content  
      if(body_content != ""){                                
        var compilehtml = $compile(body_content)(scope);
        scope.scopeCtrlFn({content: compilehtml});
      }

      // Prepopulate the input field values if it's available in the Local Storage
      var getstep_inputs = JSON.parse(localStorage.getItem(value));
      var GUID = localStorage.getItem('GUID');
      if(getstep_inputs){
          // questions
          if(getstep_inputs.questions){
            var q1 = getstep_inputs.questions[0].instance;
            var q2 = q1.split('/');
            var instance_GUID = q2[q2.length - 2];
            //alert(GUID+" = "+instance_GUID)
            if(GUID == instance_GUID){
              var getques_len = getstep_inputs.questions.length;
              for(var ques=0; ques<getques_len; ques++){
                var d1 = getstep_inputs.questions[ques].instance;
                var d2 = d1.split('/');
                var s1 = d2[d2.length - 2];
                var s2 = s1.split('_');
                var instance_GUID = s2[1];

                var d3 = getstep_inputs.questions[ques].question;
                var d4 = d3.split('/');
                var question_ID = d4[d4.length -2];

                var field_ID = instance_GUID+"_"+question_ID;
                var field_value = getstep_inputs.questions[ques].response;
                //alert(field_ID+" : "+field_value)
                if(document.getElementById(field_ID) != null){
                  document.getElementById(field_ID).value = field_value;
                }
              }
            }else{
              //nothing
            }
          }
          //parameter
          if(getstep_inputs.parameters){
              var q1 = getstep_inputs.parameters[0].instance;
              var q2 = q1.split('/');
              var instance_GUID = q2[q2.length - 2];
              
              if(GUID == instance_GUID){
              var getparam_len = getstep_inputs.parameters.length;
              for(var param=0; param<getparam_len; param++){
                var d1 = getstep_inputs.parameters[param].instance;
                var d2 = d1.split('/');
                var s1 = d2[d2.length - 2];
                var s2 = s1.split('_');
                var instance_GUID = s2[1];

                var d3 = getstep_inputs.parameters[param].parameter;
                var d4 = d3.split('/');
                var question_ID = d4[d4.length -2];

                var field_ID = instance_GUID+"_"+question_ID;
                var field_value = getstep_inputs.parameters[param].response;
                if(document.getElementById(field_ID) != null){
                  document.getElementById(field_ID).value = field_value;
                }
              }
            }else{
              //nothing
            }
          }
      }

      // clear the input field value
      scope.clear = function(inputID){
        document.getElementById(inputID).value = "";
      }


      // submit experiment design to REST API
      scope.submitDesign = function(){}
                            
      // Exit from lab experiment
      scope.exitLab = function(){
        var path = $location.path();
        var step = path.substring(path.lastIndexOf('/') + 1);
        var index = parseInt(step.charAt(step.length-1));

        var textbox_len = document.getElementsByTagName('input').length;
        var dropdown_len = document.getElementsByTagName('select').length;
        var textarea_len = document.getElementsByTagName('textarea').length;
                                      
        var textbox_arr = new Array();var dropdown_arr = new Array();var textarea_arr = new Array();
        if(textbox_len != 0){
          for(var i=0; i<textbox_len; i++){
            textbox_arr[i] = document.getElementsByTagName('input')[i].value;
          }
        }
        if(dropdown_len != 0){
          for(var j=0; j<dropdown_len; j++){
            dropdown_arr[j] = document.getElementsByTagName('select')[j].value;
          }
        }
        if(textarea_len != 0){
          for(var k=0; k<textarea_len; k++){
            textarea_arr[k] = document.getElementsByTagName('textarea')[k].value;
          }
        }

        if(textbox_arr.length > 1){
          var empty = jQuery.inArray("",textbox_arr); 
          if(empty != -1){ 
            var textbox = false;
          }else{
            textbox = true;
          }
        }else{
          if(textbox_arr[0] === ""){
            textbox = false;
          }else{
            textbox = true;
          }
        }

        if(dropdown_arr.length > 1){
          var empty = jQuery.inArray("",dropdown_arr);
          if(empty != -1){
            var dropdown = false;
          }else{
            dropdown = true;
          }
        }else{
            if(dropdown_arr[0] === ""){
              dropdown = false;
            }else{
              dropdown = true;
            }
        }

        if(textarea_arr.length > 1){
          var empty = jQuery.inArray("",textarea_arr);
          if(empty != -1){
            var textarea = false;
          }else{
            textarea = true;
          }
        }else{
          if(textarea_arr[0] === ""){
            textarea = false;
          }else{
            textarea = true;
          }
        }

        var getJSON = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
        var total_steps = getJSON.number_of_steps;
        if(index < total_steps){
          var step_no = index;
        }
        if(step_no < total_steps){
          var title = getJSON.labjournalsteps[index].journal_step_title;
          var labtitle = title.toLowerCase();
          if(textbox == true && dropdown == true && textarea == true){
            // experiment design form
            if(document.getElementById("device_form") != null){
              var id_array = [];var param_array = new Array();
              var childNodes_len = document.getElementById("device_form").childNodes.length;
              for(var i=0; i<childNodes_len; i++){
                var childNodes_type = document.getElementById("device_form").childNodes[i].type;
                var childNodes_value = document.getElementById("device_form").childNodes[i].value;
                var childNodes_id = document.getElementById("device_form").childNodes[i].id;
                if(childNodes_type != undefined && childNodes_type != "range"){
                  id_array.push(childNodes_id);
                  param_array[childNodes_id] = childNodes_value;
                }
              }
            }
            // question textbox
            var textbox_length = document.getElementsByTagName('input').length;
            var textboxvalue_array = []; var boxid_array = [];var textbox_array = new Array();
            for(var textbox=0; textbox<textbox_length; textbox++){
              var parentNodeID = document.getElementsByTagName('input')[textbox].parentNode.id;
                if(parentNodeID != 'device_form'){
                  var key  = document.getElementsByTagName('input')[textbox].id;
                  var value = document.getElementsByTagName('input')[textbox].value;
                  boxid_array.push(key);
                  textbox_array[key] = value;
                }
            }
            //question textarea
            var textarea_length = document.getElementsByTagName('textarea').length;
            var textareavalue_array = []; var areaid_array = []; var textarea_array = new Array();
            for(var textarea=0; textarea<textarea_length; textarea++){
              var parentNodeID = document.getElementsByTagName('textarea')[textarea].parentNode.id;
              if(parentNodeID != 'device_form'){
                var key  = document.getElementsByTagName('textarea')[textarea].id;
                var value = document.getElementsByTagName('textarea')[textarea].value;
                textarea_array[key] = value;
              }
            }

            // final parameter & question array
            var parameter_array = param_array; 
            var question_array = $.extend(textbox_array, textarea_array);

            // length of parameter & question array
            var param_array_len = 0;
            for(index in parameter_array){
              param_array_len++;
            }
            var ques_array_len = 0;
            for(index in question_array){
              ques_array_len++;
            }
            console.log(parameter_array)
            console.log(question_array)

            // create JSON object containing parameters & questions
            var GUID = localStorage.getItem('GUID');
            if(param_array_len > 0 ){
              var paramJSON = "{";
              paramJSON += '"parameters" : [';
              for(var param in parameter_array){
                var split_param = param.split("_");
                var PID = split_param[1];
                var response = parameter_array[param];
                paramJSON += "{";
                paramJSON += '"instance_GUID" : "/api/v1/labjournalinstance/'+GUID+'/",';
                paramJSON += '"parameter" : "/api/v1/deviceparameter/'+PID+'/",';
                paramJSON += '"response" : "'+response+'"'
                paramJSON += "},";
              }
                paramJSON = paramJSON.slice(0, -1);
                paramJSON += "]";
                paramJSON += "}";
                var parameter = JSON.parse(paramJSON);
            }
            if(ques_array_len > 0){
              var quesJSON = "{";
              quesJSON += '"questions" : [';
                for(var ques in question_array){
                  var split_ques = ques.split("_");
                  var QID = split_ques[1];
                  var response = question_array[ques];
                  quesJSON += "{";
                  quesJSON += '"instance_GUID" : "/api/v1/labjournalinstance/'+GUID+'/",';
                  quesJSON += '"question" : "/api/v1/labjournalquestion/'+QID+'/",';
                  quesJSON += '"response" : "'+response+'"'
                  quesJSON += "},";
                }
                  quesJSON = quesJSON.slice(0, -1);
                  quesJSON += "]";
                  quesJSON += "}";
                  var question = JSON.parse(quesJSON);
            }

            var jsoncomb  = $.extend(parameter, question);
            
            if(JSON.parse(localStorage.getItem(step))){
              var get = JSON.parse(localStorage.getItem(step));
              // UPDATE parameters
              if(jsoncomb['parameters'] != undefined){
                for(var param_loop=0; param_loop<jsoncomb['parameters'].length; param_loop++){
                  var lsResponse = get.parameters[param_loop].response;
                  var fResponse = jsoncomb['parameters'][param_loop].response;
                  var splitGUID = jsoncomb['parameters'][param_loop].instance.split('/');
                  var getGUID = splitGUID[splitGUID.length -2];
                  var splitPID = jsoncomb['parameters'][param_loop].parameter.split('/');
                  var getPID = splitPID[splitPID.length -2];
                  //console.log("lsfvalue: "+lsResponse+" = fvalue: "+fResponse);
                  if(lsResponse != fResponse){
                    var JSONobj = {"instance" : "/api/v1/labjournalinstance/"+getGUID+"/", "parameter" : "/api/v1/deviceparameter/"+getPID+"/", "response" : fResponse};
                    var param_data = JSON.stringify(JSONobj);
                    var update_url = 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalparameterresponse/';
                    $.ajax({
                        //url: 'http://129.105.107.216/api/v1/labjournalparameterresponse/',
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
                  }
                }
              }
              // UPDATE questions
              if(jsoncomb['questions'] != undefined){
                for(var ques_loop=0; ques_loop<jsoncomb['questions'].length; ques_loop++){
                  var lsResponse = get.questions[ques_loop].response;
                  var fResponse = jsoncomb['questions'][ques_loop].response;
                  var splitGUID = jsoncomb['questions'][ques_loop].instance.split('/');
                  var getGUID = splitGUID[splitGUID.length -2];
                  var splitQID = jsoncomb['questions'][ques_loop].question.split('/');
                  var getQID = splitQID[splitQID.length -2];
                  //console.log("lsfvalue: "+lsResponse+" = fvalue: "+fResponse);
                  if(lsResponse != fResponse){
                    var JSONobj = {"instance" : "/api/v1/labjournalinstance/"+getGUID+"/", "question" : "/api/v1/labjournalquestion/"+getQID+"/", "response" : fResponse};
                    var ques_data = JSON.stringify(JSONobj);
                    var update_url = 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalquestionresponse/';
                    $.ajax({
                        url: update_url,
                        crossDomain: 'false',
                        type: 'POST',
                        data: ques_data,
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
            }else{
                  // if the parameters exist, then send to the REST API
                  if(jsoncomb['parameters'] != undefined){
                    for(var param_loop=0; param_loop<jsoncomb['parameters'].length; param_loop++){
                      var param_data = JSON.stringify(jsoncomb['parameters'][param_loop]);
                      $.ajax({
                        //url: 'http://129.105.107.216/api/v1/labjournalparameterresponse/',
                        url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalparameterresponse/',
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
                  // if the questions exist, then send to the REST API
                  if(jsoncomb['questions'] != undefined){
                    for(var ques_loop=0; ques_loop<jsoncomb['questions'].length; ques_loop++){
                      var ques_data = JSON.stringify(jsoncomb['questions'][ques_loop]);
                      $.ajax({
                        url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalquestionresponse/',
                        crossDomain: 'false',
                        type: 'POST',
                        data: ques_data,
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

            var jsoncomb_string = JSON.stringify(jsoncomb);
            localStorage.setItem(step, jsoncomb_string);
            console.log(jsoncomb)

            // UPDATE the labjournal instance, when it is complete
            var GUID = localStorage.getItem('GUID');
            var labjournalID = localStorage.getItem('LABJOURNAL_ID');
            var username = localStorage.getItem('Username');
            var jsonObject = {"GUID" : GUID,  "status" : "C"};
            //var jsonObject = {"status" : "C"};
            console.log(jsonObject)
            var data = JSON.stringify(jsonObject);

            // POST data to REST API
            $.ajax({
              url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalinstance/',
              crossDomain: 'false',
              type: 'POST',
              //type: 'PATCH',
              data: data,
              contentType: 'application/json',
              cache: false,
              dataType: 'json',
              async: false,
              processData: false,
              success: function(data){
                //$scope.$apply(function(){
                    // on exit from the lab experiment, navigate to the groups page
                    $location.path("home");
                //});
              },
              error: function(XMLHttpRequest, textStatus, errorThrown){
                alert('XMLHttpRequest: '+XMLHttpRequest.responseText);
                alert('Error Message: '+textStatus);
                alert('HTTP Error: '+errorThrown);
              }
            });
            
          }else{
            alert("Please fill out the empty field( s)");
          }
        }
      }
    }
  };
});



/*translate.config(['$translateProvider', function ($translateProvider,$scope) {
  $translateProvider.translations('de_DE', {
    'GREETING': 'Hallo Welt!'

  });
  $translateProvider.translations('en_EN', {
    'GREETING': 'Hello World!'
  });
  // which language to use?
  $translateProvider.uses('de_DE');
 
}]);

translate.controller('appController', ['$translate', '$scope', function ($translate, $scope){
  $scope.toggleLanguage =function(){
    $translate.uses(($translate.uses() === 'en_EN') ? 'de_DE' : 'en_EN');
  }

}]);*/