/**
* Controllers 
* @description
* The behavior of the application is located in the controller. 
*/

/**************************************************/
/************* LOGIN PAGE CONTROLLER **************/
/**************************************************/

/**
* @function loginCtrl
* @description
* Define all the functionalities have to be performed in the login template
* @param $scope {ngService} An angular service - This service let the controller give objects and functions to the views
* that can later be manipulated with expressions and directives.
* @param $location {ngService} An angular service - It parses the URL in the browser adddress bar and makes the URL
* available to the application. Changes to the URL in the address bar reflected into $location service and viceversa.
*/

mobileApp.controller('loginCtrl',
  function loginCtrl ($scope, $location) {
    /**
    * @function submit
    * @description 
    * Get the username and password and inject into the 'login' function
    */

    $scope.submit = function(){
      // Display the loading image while authenticating the user
      $('#waiting').show();
      var username = $scope.loginform.username;
      var password = $scope.loginform.password;
      $scope.login(username, password);
    }

    /**
    * @function login
    * @description 
    * Authenticate the user and let them to login to the application by making an ajax call to the REST API
    * @param username {String | Number | Special charcters} Username of the user
    * @param password {String | Number | Special charcters} Password of the user
    */

    $scope.login = function(username, password){
      var parameters = 'username='+username+'&password='+password;
      var emptyString = JSON.stringify({});
      $.ajax({
        url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/login/?username='+username+'&password='+password,
        crossDomain: 'false',
        type: 'POST',
        data: emptyString,
        contentType: 'application/json',
        cache: false,
        dataType: 'json',
        async: false,
        processData: false,
        success: function(data) {
          //$scope.$apply(function(){
            $scope.result=data.message;
              if (data['error']) {
                alert('Credentials Invalid');
                return;
              }
              console.log(data);
              localStorage.setItem('CouponID', data['couponId']);
              localStorage.setItem('PassKey', data['passKey']);
              localStorage.setItem('Username', username);
              localStorage.setItem('API_KEY', data['api_key']);
              // If the authentication is successfull, then it redirects to the Homepage
              $location.path('home');
              //$scope.foobar = true;
              sessionStorage.setItem('loggedIn', 'true');
          //});
        },
        error: function() { 
          alert('Error');
        }
      }).done(function () {
          $('#waiting').hide();
        });
    }
});

/**************************************************/
/************* HOME PAGE CONTROLLER ***************/
/**************************************************/

/**
* @function homeCtrl
* @description
* Define all the functionalities have to be performed in the home template
* @param $scope {ngService} An angular service - This service let the controller give objects and functions to the views
* that can later be manipulated with expressions and directives.
* @param $location {ngService} An angular service - It parses the URL in the browser adddress bar and makes the URL
* available to the application. Changes to the URL in the address bar reflected into $location service and viceversa.
* @param $http {ngService} - It takes a single argument that is used to generate an HTTP request and 
* returns response with two $http methods: success and error
*/

mobileApp.controller('homeCtrl',
  function homeCtrl($scope, $location, $http){

    var username = localStorage.getItem('Username');
    var api_key = localStorage.getItem('API_KEY');
    var parameters = 'username='+username+'&api_key='+api_key;

    /**
    * @function loadDynamicContents
    * @description
    * Render the Groups (the group which the student belongs), Labjournal Assignments (assignments assigned to the student by the teacher) and 
    * Labjournal Subscription (subscriptions owned by the student) via REST API 
    */

    $scope.loadDynamicContents = function(){
      $scope.retrieveGroups();  
      $scope.retrieveAssignments();  
      $scope.retrieveSubscriptions();  
      $scope.retrieveLabjournals();  
    }
    
    /**
    * @function retrieveGroups
    * @description
    * Retrieve the groups, the student belongs to
    * @returns {jsonObject} contains a list of groups
    */

    $scope.retrieveGroups = function(){
      var group_url = 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/journalgroup/?'+parameters;
      $.ajax({
        url: group_url,
        crossDomain: 'false',
        type: 'GET',
        data: {
                format: 'jsonp'
        },
        cache: false,
        dataType: 'jsonp',
        async: false,
        success: function(json){
          var groupjson = JSON.stringify(json);
          localStorage.setItem('LABJOURNAL_GROUPS', groupjson);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          alert('XMLHttpRequest: '+XMLHttpRequest.responseText);
          alert('Error Message: '+textStatus);
          alert('HTTP Error: '+errorThrown);
        }
      });
    }

    /**
    * @function retrieveAssignments
    * @description
    * Retrieve the assignments assigned to the student by the teacher
    * @returns {jsonObject} contains a list of assignments
    */

    $scope.retrieveAssignments = function(){
      
      var assignment_url = 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalassignment/?'+parameters;
      $.ajax({
        url: assignment_url,
        crossDomain: 'false',
        type: 'GET',
        data: {
                format: 'jsonp'
        },
        cache: false,
        dataType: 'jsonp',
        async: false,
        success: function(json){
          var assignmentjson = JSON.stringify(json);
          localStorage.setItem('LABJOURNAL_ASSIGNMENT', assignmentjson);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          alert('XMLHttpRequest: '+XMLHttpRequest.responseText);
          alert('Error Message: '+textStatus);
          alert('HTTP Error: '+errorThrown);
        }
      });

    }

    /**
    * @function retrieveSubscriptions
    * @description
    * Retrieve the lab journal subscriptions owned by the student
    * @returns {jsonObject} contains a list of subscriptions
    */
    
    $scope.retrieveSubscriptions = function(){
      
      var subscription_url = 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalsubscription/?'+parameters;
      $.ajax({
        url: subscription_url,
        crossDomain: 'false',
        type: 'GET',
        data: {
                format: 'jsonp'
        },
        cache: false,
        dataType: 'jsonp',
        async: false,
        success: function(json){
          var subscriptionjson = JSON.stringify(json);
          localStorage.setItem('LABJOURNAL_SUBSCRIPTION', subscriptionjson);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          alert('XMLHttpRequest: '+XMLHttpRequest.responseText);
          alert('Error Message: '+textStatus);
          alert('HTTP Error: '+errorThrown);
        }
      });
    }

    /**
    * @function retrievelabjournals
    * @description
    * Retrieve the lab journals, those are not assigned and not subscribed
    * @returns {jsonObject} contains a list of labjournals
    */
    
    $scope.retrieveLabjournals = function(){
      
      var labjournal_url = 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/browselabjournal/?'+parameters;
      $.ajax({
        url: labjournal_url,
        crossDomain: 'false',
        type: 'GET',
        data: {
                format: 'jsonp'

        },
        //data: parameters,
        cache: false,
        dataType: 'jsonp',
        async: false,
        success: function(json){
          var labjournaljson = JSON.stringify(json);
          localStorage.setItem('LABJOURNALS_BROWSE', labjournaljson);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          alert('XMLHttpRequest: '+XMLHttpRequest.responseText);
          alert('Error Message: '+textStatus);
          alert('HTTP Error: '+errorThrown);
        }
      });  
    }

    /**
    * @function startLab
    * @description
    * When the user attempt to start the Lab, then it will download the appropriate labjournal through the API and 
    * begin to start the experiment flow
    * @param labjounal_uri {String} - The resource of the labjournal
    */

    $scope.startLab = function(labjournal_uri){
      var labjournal_url = 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com'+labjournal_uri;
      $.ajax({
        url: labjournal_url,
        crossDomain: 'false',
        type: 'GET',
        data: {
                format: 'jsonp'
        },
        cache: false,
        dataType: 'jsonp',
        async: false,
        success: function(json){
          var dataToStore = JSON.stringify(json);
          localStorage.setItem('LABJOURNAL_JSON_DATA', dataToStore);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          alert('XMLHttpRequest: '+XMLHttpRequest.responseText);
          alert('Error Message: '+textStatus);
          alert('HTTP Error: '+errorThrown);
        }
      }).done(function () {
          $scope.sendLabjournalinstance(); 
        }); 
    }

    /**
    * @function sendLabjournalinstance
    * @description
    * Whenever a the experiment begins, then it will send the some data regarding that particula instance
    * to the REST API 
    * 1.{GUID} - A unique id generated, which is a combination of (username+hash(timestamp+labjournalid)),
    * 2.{labjournal} - Labjournal resource of that particular instance and
    * 3.{user} - Username resource of that particular instance
    */

    $scope.sendLabjournalinstance = function(){
      var getLabjournal = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
      var labjournalID = getLabjournal.id;
      localStorage.setItem('LABJOURNAL_ID', labjournalID);
      var timestamp = new Date().getTime();
      localStorage.setItem('TIMESTAMP', timestamp);
      var getTimestamp = localStorage.getItem('TIMESTAMP');
      var uniqueID = '' + timestamp + labjournalID;
      var hashValue = hex_md5(uniqueID);
      localStorage.setItem('HASH_VALUE', hashValue);
      var getHash = localStorage.getItem('HASH_VALUE');
      var username = localStorage.getItem('Username');
      var GUID = username+'_'+getHash;
      localStorage.setItem('GUID', GUID);
      var instance_jsonObject = {"GUID": GUID, "lab_journal": "/api/v1/labjournal/"+labjournalID+"/", "user": "/api/v1/user/"+username+"/"};
      console.log(instance_jsonObject)
      var instance_data = JSON.stringify(instance_jsonObject);
          
      $.ajax({
        url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalinstance/',
        crossDomain: 'false',
        type: 'POST',
        data: instance_data,
        contentType: 'application/json',
        cache: false,
        dataType: 'json',
        async: false,
        processData: false,
        success: function(data){
          $scope.$apply(function(){
            var getLabjournal = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
            console.log(getLabjournal)
            var labjournalID = getLabjournal.id;
            if (getLabjournal.labjournalsteps[1] != undefined){
              var step_name = 'step1';
              var step_title = getLabjournal.labjournalsteps[1].journal_step_title.toLowerCase();
            }
            //Launch the experiment
            $location.path('template/'+step_title+'/'+step_name);
          });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          alert('XMLHttpRequest: '+XMLHttpRequest.responseText);
          alert('Error Message: '+textStatus);
          alert('HTTP Error: '+errorThrown);
        }
      });
    }
});

/******************************************************/
/************* MYGROUP PAGE CONTROLLER ***************/
/******************************************************/
mobileApp.controller('groupCtrl',
  function groupCtrl($scope, $location, $http){
          var get_groupjson = JSON.parse(localStorage.getItem('LABJOURNAL_GROUPS'));
          var total_count = get_groupjson.meta.total_count;
          if (total_count != 0){
            var group_data = '[';
            for (var group_count = 0; group_count < total_count; group_count++){
              group_data += '{';
              group_data += '"title" : "'+get_groupjson.objects[group_count].title+'",';
              var splitowner = get_groupjson.objects[group_count].owner.split("/");
              var owner = splitowner[splitowner.length - 2];
              group_data += '"owner" : "'+owner+'"';
              group_data += '},'
            }
              group_data = group_data.slice(0, -1);
              group_data += ']';
                 
              //$scope.$apply(function(){
                $scope.groups = JSON.parse(group_data);
             // });
          }else{
                  var groups_content = 'No more groups available';
                  $('#groups_content').replaceWith('<div>'+groups_content+'</div>');
          }
});

/******************************************************/
/************* ASSIGNMENT PAGE CONTROLLER ***************/
/******************************************************/
mobileApp.controller('assignmentCtrl',
  function assignmentCtrl($scope, $location, $http){
    var get_assignmentjson = JSON.parse(localStorage.getItem('LABJOURNAL_ASSIGNMENT'));
          var total_count = get_assignmentjson.meta.total_count;
          if (total_count != 0){
            var assignment_data = '[';
            for (var assignment_count = 0; assignment_count < total_count; assignment_count++){
              assignment_data += '{';
              assignment_data += '"lab_journal_title" : "'+get_assignmentjson.objects[assignment_count].lab_journal_title+'",';
              assignment_data += '"assigned_date" : "'+get_assignmentjson.objects[assignment_count].assigned_date+'",';
              assignment_data += '"lab_journal" : "'+get_assignmentjson.objects[assignment_count].lab_journal+'"';
              assignment_data += '},'
            }
              assignment_data = assignment_data.slice(0, -1);
              assignment_data += ']';
                  
              //$scope.$apply(function(){
                $scope.assignments = JSON.parse(assignment_data);
              //});
          }else{
              var assignments_content = 'No more assignments available';
              $('#assignments_content').replaceWith('<div>'+assignments_content+'</div>');
          }
});
/******************************************************/
/************* SUBSCRIPTION PAGE CONTROLLER ***************/
/******************************************************/
mobileApp.controller('subscriptionCtrl',
  function subscriptionCtrl($scope, $location, $http){
    var get_subscriptionjson = JSON.parse(localStorage.getItem('LABJOURNAL_SUBSCRIPTION'));
          var total_count = get_subscriptionjson.meta.total_count;
          if (total_count != 0){
            var subscription_data = '[';
            for (var subscription_count = 0; subscription_count < total_count; subscription_count++){
              subscription_data += '{';
              subscription_data += '"lab_journal_title" : "'+get_subscriptionjson.objects[subscription_count].lab_journal_title+'",';
              subscription_data += '"subscribed_date" : "'+get_subscriptionjson.objects[subscription_count].subscribed_date+'",';
              subscription_data += '"lab_journal" : "'+get_subscriptionjson.objects[subscription_count].lab_journal+'"';
              subscription_data += '},'
            }
              subscription_data = subscription_data.slice(0, -1);
              subscription_data += ']';
                
              //$scope.$apply(function(){
                $scope.subscriptions = JSON.parse(subscription_data);
              //});
          }else{
              var subscriptions_content = 'No more subscriptions available';
              $('#subscriptions_content').replaceWith('<div>'+subscriptions_content+'</div>');
          }
});
/******************************************************/
/************* LABJOURNAL PAGE CONTROLLER ***************/
/******************************************************/
mobileApp.controller('labjournalCtrl',
  function labjournalCtrl($scope, $location, $http){
    var get_labjournaljson = JSON.parse(localStorage.getItem('LABJOURNALS_BROWSE'));
          var total_count = get_labjournaljson.meta.total_count;
          if (total_count != 0){
            var labjournal_data = '[';
            for (var labjournal_count = 0; labjournal_count < total_count; labjournal_count++){
              labjournal_data += '{';
              labjournal_data += '"title" : "'+get_labjournaljson.objects[labjournal_count].title+'",';
              labjournal_data += '"subject" : "'+get_labjournaljson.objects[labjournal_count].subject+'",';
              labjournal_data += '"resource_uri" : "'+get_labjournaljson.objects[labjournal_count].resource_uri+'"';
              labjournal_data += '},'
            }
              labjournal_data = labjournal_data.slice(0, -1);
              labjournal_data += ']';
                
              //$scope.$apply(function(){
                $scope.labjournals = JSON.parse(labjournal_data);
              //});
          }else{
              var labjournals_content = 'No more labjournals available';
              $('#labjournals_content').replaceWith('<div>'+labjournals_content+'</div>');
          }
});

/******************************************************/
/************* TEMPLATE PAGE CONTROLLER ***************/
/******************************************************/

/**
* @function templateCtrl
* @description
* Define all the functionalities have to be performed in the lab interface template
* @param $scope {ngService} An angular service - This service let the controller give objects and functions to the views
* that can later be manipulated with expressions and directives.
* @param $location {ngService} An angular service - It parses the URL in the browser adddress bar and makes the URL
* available to the application. Changes to the URL in the address bar reflected into $location service and viceversa.
* @param $http {ngService} - It takes a single argument that is used to generate an HTTP request and 
* returns response with two $http methods: success and error
*/

mobileApp.controller('templateCtrl',
  function templateCtrl($scope, $location, $http){

    /**
    * @function navigatePage
    * @description
    * Navigate to the specified page
    * @param pagename {String} - The name of the page to be navigate
    */

    $scope.navigatePage = function(pagename){
      $location.path(pagename);
    }
   
    /**
    * @function navigateBack
    * @description
    * Navigate to the previous step of the current experiment instance
    */

    $scope.navigateBack = function(){
      // get the resource path (ex: template/{step_title}/{step_name})
      var path = $location.path(); 
      // get the last index of the url path (ex: {step_name} - step1)
      var step_name = path.substring(path.lastIndexOf('/') + 1); 
      // get the index for the previous step data in the labjournal JSONobject. (ex: 1 - 1 = 0 => index)
      var index = parseInt(step_name.charAt(step_name.length-1)) - 1; 

      var getlabjournal = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
      if(index != 0){
        var labtitle_upper = getlabjournal.labjournalsteps[index].journal_step_title;
        var labtitle = labtitle_upper.toLowerCase();
        $location.path('template/'+labtitle+'/step'+index); // Redirects to the first step in the experiment
      }
    }

    /**
    * @function navigateNext
    * @description
    * Navigate to the next step of the current experiment instance
    */
    
    $scope.navigateNext = function(){
      // get the resource path (ex: template/{step_title}/{step_name})
      var path = $location.path();
      // get the last index of the url path (ex: {step_name} - step1)
      var step_name = path.substring(path.lastIndexOf('/') + 1);
      // get the index for the next step data in the labjournal JSONobject. (ex: 1 + 1 = 2 => index)
      var index = parseInt(step_name.charAt(step_name.length-1)) + 1;

      // Check the inputfields are empty or not

      //alert($scope.isTextboxempty());
      //alert($scope.isDropdownempty());
      //alert($scope.isTextareaempty());

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
            // question textarea
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
            console.log(parameter_array)
            console.log(question_array)
             
            // length of parameter & question array   
            var param_array_len = 0;
            for(index in parameter_array){
              param_array_len++;
            }
            var ques_array_len = 0;
            for(index in question_array){
              ques_array_len++;
            }



            // creating JSON object containing parameters & questions
            var GUID = localStorage.getItem('GUID');
            if(param_array_len > 0){
              var paramJSON = "{";
              paramJSON += '"parameters" : [';
              for(var param in parameter_array){
                var split_param = param.split("_");
                var PID = split_param[1];
                var response = parameter_array[param];
                paramJSON += "{";
                paramJSON += '"instance" : "/api/v1/labjournalinstance/'+GUID+'/",';
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
                quesJSON += '"instance" : "/api/v1/labjournalinstance/'+GUID+'/",';
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
            console.log(jsoncomb)
            //console.log(  jsoncomb['parameters'].length);          

            var username = localStorage.getItem('Username');
            var password = localStorage.getItem('Password');


            if(JSON.parse(localStorage.getItem(step_name))){
              var get = JSON.parse(localStorage.getItem(step_name));
              if(jsoncomb['parameters'] != undefined){
                var splitinstance = get.parameters[0].instance.split("/");
                var lsinstance_GUID = splitinstance[splitinstance.length - 2];
              }else if(jsoncomb['questions'] != undefined){
                var splitinstance = get.questions[0].instance.split("/");
                var lsinstance_GUID = splitinstance[splitinstance.length - 2];
              }else{
                var lsinstance_GUID = 0;
              }
              //var lsinstance_GUID = splitinstance[splitinstance.length - 2];
              var currentinstance_GUID = localStorage.getItem('GUID');
              //console.log("inst:"+instance_GUID)
              if(currentinstance_GUID == lsinstance_GUID){
                // UPDATE parameters
                if(jsoncomb['parameters'] != undefined){
                  var parameter_update = new Array();
                  //if(currentinstance_GUID == lsinstance_GUID){
                    for(var param_loop=0; param_loop<jsoncomb['parameters'].length; param_loop++){
                      
                      var lsResponse = get.parameters[param_loop].response;
                      var fResponse = jsoncomb['parameters'][param_loop].response;
                      var splitGUID = jsoncomb['parameters'][param_loop].instance.split('/');
                      var getGUID = splitGUID[splitGUID.length -2];
                      var splitPID = jsoncomb['parameters'][param_loop].parameter.split('/');
                      var getPID = splitPID[splitPID.length -2];
                      console.log("lsfvalue: "+lsResponse+" = fvalue: "+fResponse);
                      

                      if(lsResponse != fResponse){
                        parameter_update.push(1);
                        var JSONobj = {"instance" : "/api/v1/labjournalinstance/"+getGUID+"/", "parameter" : "/api/v1/deviceparameter/"+getPID+"/", "response" : fResponse};
                        var param_data = JSON.stringify(JSONobj);
                        var update_url = 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalparameterresponse/';
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

                if($.inArray(1, parameter_update) != -1){
 
                    //submit experiment design to API
                  /*var instance_GUID = localStorage.getItem('GUID');
                  var parameter_group_id = localStorage.getItem('PARAMETER_GROUP_ID');
                  var submit_data = {"instance": "/api/v1/labjournalinstance/"+instance_GUID+"/", "parameter_group": "/api/v1/deviceparametergroup/"+parameter_group_id+"/", "experiment_id": 26};
                  var stringify_submit_data = JSON.stringify(submit_data);
                  var designsubmit_url = 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/experiment/?username='+username+'&password='+password;
                  
                  if(jsoncomb['parameters'] != undefined){
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
                      success: function(data){console.log("Submit: "+data)},
                      error: function(XMLHttpRequest, textStatus, errorThrown){
                          alert('XMLHttpRequest: '+XMLHttpRequest.responseText);
                          alert('Error Message: '+textStatus);
                          alert('HTTP Error: '+errorThrown);
                      }
                    });
                  }*/
                }
                  //}
                }
                // UPDATE questions
                if(jsoncomb['questions'] != undefined){
                  //if(currentinstance_GUID == lsinstance_GUID){
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
                 // }
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

                  //submit experiment design to API
                  /*var instance_GUID = localStorage.getItem('GUID');
                  var parameter_group_id = localStorage.getItem('PARAMETER_GROUP_ID');
                  var submit_data = {"instance": "/api/v1/labjournalinstance/"+instance_GUID+"/", "parameter_group": "/api/v1/deviceparametergroup/"+parameter_group_id+"/", "experiment_id": 26};
                  var stringify_submit_data = JSON.stringify(submit_data);
                  var designsubmit_url = 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/experiment/?username='+username+'&password='+password;
                  
                  if(jsoncomb['parameters'] != undefined){
                    console.log("step2")
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
                      success: function(data){console.log("Submit: "+data)},
                      error: function(XMLHttpRequest, textStatus, errorThrown){
                          alert('XMLHttpRequest: '+XMLHttpRequest.responseText);
                          alert('Error Message: '+textStatus);
                          alert('HTTP Error: '+errorThrown);
                      }
                    });
                  }*/

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

                  //submit experiment design to API
                  /*var instance_GUID = localStorage.getItem('GUID');
                  var parameter_group_id = localStorage.getItem('PARAMETER_GROUP_ID');
                  var submit_data = {"instance": "/api/v1/labjournalinstance/"+instance_GUID+"/", "parameter_group": "/api/v1/deviceparametergroup/"+parameter_group_id+"/", "experiment_id": 26};
                  var stringify_submit_data = JSON.stringify(submit_data);
                  var designsubmit_url = 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/experiment/?username='+username+'&password='+password;
                  
                  if(jsoncomb['parameters'] != undefined){
                    console.log("step3")
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
                      success: function(data){console.log("Submit: "+data)},
                      error: function(XMLHttpRequest, textStatus, errorThrown){
                          alert('XMLHttpRequest: '+XMLHttpRequest.responseText);
                          alert('Error Message: '+textStatus);
                          alert('HTTP Error: '+errorThrown);
                      }
                    });
                  }*/
            }
                  

            var jsoncomb_string = JSON.stringify(jsoncomb);
            localStorage.setItem(step_name, jsoncomb_string);
            console.log(jsoncomb)

            // navigate to next step
            $location.path("template/"+labtitle+"/step"+step_no);
          }else{
                 alert("Please fill out the empty field( s)");
          }
      }
    }

    $scope.isTextboxempty = function(){
      var textbox_length = document.getElementsByTagName('input').length;
      var textbox_array = new Array();

      if (textbox_length != 0){
        for (var i = 0; i < textbox_length; i++){
          textbox_array[i] = document.getElementsByTagName('input')[i].value;
        }
      }
      if (textbox_array.length > 1){
        var textbox = jQuery.inArray('', textbox_array); 
        if (textbox != -1){ 
            return false;
        }else{
          return true;
        }
      }else{
        if (textbox_array[0] === ''){
          return false;
        }else{
          return true;
        }
      }
    }

    $scope.isDropdownempty = function(){
      var dropdown_length = document.getElementsByTagName('select').length;
      var dropdown_array = new Array();

      if (dropdown_length != 0){
        for (var i = 0; i < dropdown_length; i++){
          dropdown_array[i] = document.getElementsByTagName('select')[i].value;
        }
      }
      if (dropdown_array.length > 1){
        var dropdown = jQuery.inArray('', dropdown_array);
        if (dropdown != -1){
          return false;
        }else{
          return true;
        }
      }else{
        if (dropdown_array[0] === ''){
          return false;
        }else{
          return true;
        }
      }
    }

    $scope.isTextareaempty = function(){
      var textarea_length = document.getElementsByTagName('textarea').length;
      var textarea_array = new Array();

      if (textarea_length != 0){
        for (var i = 0; i < textarea_length; i++){
          textarea_array[i] = document.getElementsByTagName('textarea')[i].value;
        }
      }
      if (textarea_array.length > 1){
        var textarea = jQuery.inArray('', textarea_array);
        if (textarea != -1){
          return false;
        }else{
          return true;
        }
      }else{
        if (textarea_array[0] === ''){
          return false;
        }else{
          return true;
        }
      }
    }

    $scope.renderGraph = function(){
      
      var username = localStorage.getItem('Username');
      var password = localStorage.getItem('Password');
      var params = 'username='+username+'&password='+password;
      //Retrieve results through the API call
        $.ajax({
              url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/experiment/test/result/6/',
              crossDomain: 'false',
              type: 'GET',
              data: params,
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

      /*var jsons= JSON.stringify({ "coupon_id": 145966, "experiment_id": 6, "instance": "/api/v1/labjournalinstance/student1_3821b43303bde356d8e3fa141d8e7588/","parameter_group": "/api/v1/deviceparametergroup/1/",
    "pass_key": "1219483457", "resource_uri": "/api/v1/experiment/test/result/6/", "results": [{  "distance": "20", "result": "176,154,185" }, {  "distance": "30", "result": "118,129,110"
        }, { "distance": "40", "result": "77,75,83" } ],"submitted_date": "2013-09-25T11:17:06.950438"});*/

      // properties of Highchart
      var chart = $("#graph").highcharts({
        colors: ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
        chart: {
                  type: 'line',
                  height: 400,
                  width: 300,
                  backgroundColor: {
                                      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                      stops: [[0, 'rgb(96, 96, 96)'],[1, 'rgb(16, 16, 16)']]
                  },
                  borderColor: '#000000',
                  borderWidth: 2,
                  className: 'dark-container',
                  plotBackgroundColor: 'rgba(255, 255, 255, .1)',
                  plotBorderColor: '#CCCCCC',
                  plotBorderWidth: 1
                },
        title: {
                  style: {
                           color: '#FFF',
                           font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                  },
                  text: 'Radioactivity'
        },
        legend: {
                  itemStyle: { color: '#CCC' },
                  itemHoverStyle: { color: '#FFF' },
                  itemHiddenStyle: { color: '#333' }
                },
        tooltip: {
                    backgroundColor: {
                                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                        stops: [[0, 'rgba(96, 96, 96, .8)'], [1, 'rgba(16, 16, 16, .8)']]
                    },
                    borderWidth: 0,
                    style: { color: '#FFF' },
                    formatter: function(){
                      return 'Distance: <b>'+this.x+'</b><br/>Intensity: <b>'+this.y+'</b> ('+this.series.name+')';
                    }
                  },
        xAxis: {
                    gridLineColor: '#333333',
                    gridLineWidth: 1,
                    labels: {
                              style: { color: '#A0A0A0' }
                    },
                    lineColor: '#A0A0A0',
                    tickColor: '#A0A0A0',
                    categories: [],
                    title: {
                            style: {
                                      color: '#1589ff',
                                      font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                            },
                            text: 'Distance'
                    }
                },
        yAxis: {
                   gridLineColor: '#333333',
                   labels: {
                      style: {
                                color: '#A0A0A0'
                      }
                    },
                    lineColor: '#A0A0A0',
                    minorTickInterval: null,
                    tickColor: '#A0A0A0',
                    tickWidth: 1,
                    title: {
                            style: {
                                      color: '#1589ff',
                                      font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                                   },
                            text: 'Intensity( Particle Counts)'
                    }
                },
        series: []
      });

      var jsons = localStorage.getItem('EXPERIMENT_RESULT');
      var length = JSON.parse(jsons).results.length;
     
      var distance_arr = new Array();var series_arr = new Array();
      for(var loop=0;loop<length;loop++){
        distance_arr[loop] = JSON.parse(jsons).results[loop].distance;
        series_arr[loop] = JSON.parse(jsons).results[loop].result;
      }

      var chart = $("#graph").highcharts();
      chart.xAxis[0].update({categories: distance_arr});
      //var trial_l = JSON.parse(jsons).results[0].result.split(",").length;
      var Trial1 =new Array(); var Trial2 =new Array(); var Trial3 =new Array(); var Trial4 =new Array(); var Trial5 =new Array(); 
      var Trial6 =new Array(); var Trial7 =new Array(); var Trial8 =new Array(); var Trial9 =new Array(); var Trial10 =new Array();
      for(var sl=0; sl<series_arr.length;sl++){
        var trial_l = series_arr[sl].split(",").length;
       
        for(var tl=1; tl<=trial_l;tl++){
          var trial_s = series_arr[sl].split(",")
           
            switch(tl){
              case 1: Trial1.push(parseInt(trial_s[tl-1])); break;
              case 2: Trial2.push(parseInt(trial_s[tl-1])); break;
              case 3: Trial3.push(parseInt(trial_s[tl-1])); break;
              case 4: Trial4.push(parseInt(trial_s[tl-1])); break;
              case 5: Trial5.push(parseInt(trial_s[tl-1])); break;
              case 6: Trial6.push(parseInt(trial_s[tl-1])); break;
              case 7: Trial7.push(parseInt(trial_s[tl-1])); break;
              case 8: Trial8.push(parseInt(trial_s[tl-1])); break;
              case 9: Trial9.push(parseInt(trial_s[tl-1])); break;
              case 10: Trial10.push(parseInt(trial_s[tl-1])); break;
                  
            }
        }
     
      }
      
      var combine = new Array();
      combine.push(Trial1,Trial2,Trial3,Trial4,Trial5);
      //console.log(combine)
      for(key in combine){
        if(combine[key] != ""){
          var trial_name = "Trial"+(parseInt(key)+1);
          chart.addSeries({
              name: trial_name,
              data: combine[key]
          });
          
        }
      }

    }

    $scope.loadTitle = function(){
      var path = $location.path();
      var value = path.substring(path.lastIndexOf('/') + 1);
      var index = parseInt(value.charAt(value.length-1));
      var getJSON = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
      var total_steps = getJSON.number_of_steps;
      var difference = Math.abs(index - total_steps);
      var last_step = total_steps - 1;

      $scope.Stepdesc = "Step "+index+" of "+last_step;
  
      if(getJSON.labjournalsteps[index] != undefined){
        if(index < total_steps && index == 1){
          if(getJSON.labjournalsteps[index+1] != undefined){
                  document.getElementById("nav_next").style.display = "block";
          }else{
                  document.getElementById("nav_back").style.display = "none";
                  document.getElementById("nav_next").style.display = "none";
          }
        }else if(index < total_steps && difference == 1){
                  document.getElementById("nav_back").style.display = "block";
        }else{
                  document.getElementById("nav_back").style.display = "block";
                  document.getElementById("nav_next").style.display = "block";
        }         
      }

      var step_title = getJSON.labjournalsteps[index].journal_step_title;
      $scope.Labtitle = step_title;

      if(step_title == 'Analyze'){
        $scope.renderGraph();
      }

    }

    $scope.stopblink = function(){
      $scope.blink(0);
    }

    $scope.loadContent = function(content){
      $(".compile_content").append(content);
    }

    $scope.createPDF = function(){
      var can = document.getElementById('canvas');
      //var image = canvas.toDataURL("image/png");
      var img = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\"><rect width=\"300\" height=\"100\" style=\"fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)\" /></svg>";
      //alert(image)
      canvg(can, img);

      //document.write("<img src=\""+image+"\"/>");
     //var img = "<img src=\"http://localhost:8000/Mobile-iLab/apptest/img/no.png\">"
     //var img = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\"><rect width=\"300\" height=\"100\" style=\"fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)\" /></svg>";
     //document.location="mailto:rasmiroy@yahoo.com?"+
    //"subject=This%20is%20the%20subject&body=This%20is%20the%20body</br>"+img;
    }
    $scope.getcan = function(){
      var can = document.getElementById('canvas');
      var image = new Image();
      image = can.toDataURL("image/png");
      //alert(image);
      var send = "<img src=\""+image+"\"/>";
      //document.getElementById("dimage").appendChild(image);
      document.location="mailto:rasmiroy@yahoo.com?"+
    "subject=This%20is%20the%20subject&body=This%20is%20the%20body</br>"+send;
    }

    $scope.downloadPdf = function(){
      
          var doc = new jsPDF();
          doc.setFontSize(22);
          doc.text(20, 20, "My First PDF");
          doc.addPage();
          doc.setFontSize(16);
          doc.text(20, 30, "This is some normal sized text underneath."); 
         // Making Data URI
var out = doc.output();
//alert(out)
//doc.save('js.pdf');
$http.post('alert.php', {content: out}).success(function(data, status, headers, config){
  alert("success : "+ data)
}).error(function(data, status, headers, config){
  alert("error : "+status)
});
//document.location="mailto:rasmiroy@yahoo.com?"+
//    "subject=This%20is%20the%20subject&body=This%20is%20the%20body</br>"+out;
 //doc.output('save', 'pdf/js.pdf');
//var url = 'data:application/pdf;base64,' + Base64.encode(out);
//document.location.href = url;

    }
});

//simulation Controller
mobileApp.controller('simCtrl',
  function simCtrl($scope, $location){

    $scope.navigate_back = function(div_id){
      var url = $('#'+div_id).text();
      var value = url.substring(url.lastIndexOf('/') + 1);
      $location.path(value);
    }
});

//wecam Controller
mobileApp.controller('webCtrl',
  function simCtrl($scope, $location){

    $scope.navigate_back = function(div_id){
      var url = $('#'+div_id).text();
      var value = url.substring(url.lastIndexOf('/') + 1);
      $location.path(value);
    }
});

//message Controller
mobileApp.controller('msgCtrl',
  function simCtrl($scope, $location){

    $scope.navigate_back = function(div_id){
      var url = $('#'+div_id).text();
      var value = url.substring(url.lastIndexOf('/') + 1);
      $location.path(value);
    }
});

//account Controller
mobileApp.controller('accCtrl',
  function simCtrl($scope, $location){

    $scope.navigate_back = function(div_id){
      var url = $('#'+div_id).text();
      var value = url.substring(url.lastIndexOf('/') + 1);
      $location.path(value);
    }
});

//Main Controller
mobileApp.controller('appController',
  function appController($scope, $location, $http){

    $scope.showMenu1 = function(){
       $(document).ready(function(){
      var pagebody = $("#pagebody");
      var themenu  = $("#navmenu");
      var topbar   = $("#toolbarnav");
      var content  = $("#homecontent");
      var viewport = {
          width  : $(window).width(),
          height : $(window).height()
      };

       $("a.navlink").live("click", function(e){
        e.preventDefault();
        var linkurl     = $(this).attr("href");
        var linkhtmlurl = linkurl.substring(1, linkurl.length);
        
        var imgloader   = '<center style="margin-top: 60px;"><img src="img/preloader.gif" alt="loading..." /></center>';
        
        closeme();
        
        $(function() {
          topbar.css("top", "0px");
          window.scrollTo(0, 1);
        });
        
        content.html(imgloader);
        content.load(linkhtmlurl);
        //setTimeout(function() { content.load(linkhtmlurl, function() {  }) }, 1200);
      });

       function closeme() {
        var closeme = $(function() {
            topbar.animate({
                  left: "0px"
            }, { duration: 180, queue: false });
            pagebody.animate({
                  left: "0px"
            }, { duration: 180, queue: false });
        });
      }
      
     /* function openme() { 
        $(function () {
            topbar.animate({
               left: "290px"
            }, { duration: 300, queue: false });
            pagebody.animate({
               left: "290px"
            }, { duration: 300, queue: false });
        });
      }
      
      function closeme() {
        var closeme = $(function() {
            topbar.animate({
                  left: "0px"
            }, { duration: 180, queue: false });
            pagebody.animate({
                  left: "0px"
            }, { duration: 180, queue: false });
        });
      }
      var leftval = pagebody.css('left');
        //alert(leftval)
        if(leftval == "0px") {
          alert(leftval)
          openme();
        }
        else { 
          alert(leftval)
          closeme(); 
        }*/
      });
    }

    $scope.showMenu = function(){
        $(document).ready(function(){
      var pagebody = $("#pagebody");
      var themenu  = $("#navmenu");
      var topbar   = $("#toolbarnav");
      var content  = $("#homecontent");
      var viewport = {
          width  : $(window).width(),
          height : $(window).height()
      };
      
      function openme() { 
        $(function () {
            topbar.animate({
               left: "290px"
            }, { duration: 300, queue: false });
            pagebody.animate({
               left: "290px"
            }, { duration: 300, queue: false });
        });
      }
      
      function closeme() {
        var closeme = $(function() {
            topbar.animate({
                  left: "0px"
            }, { duration: 180, queue: false });
            pagebody.animate({
                  left: "0px"
            }, { duration: 180, queue: false });
        });
      }

      // checking whether to open or close nav menu
      $("#menu-button").live("click", function(e){
        e.preventDefault();
        var leftval = pagebody.css('left');
        //alert(leftval)
        if(leftval == "0px") {
          openme();
        }
        else { 
          closeme(); 
        }
      });

      $("#pagebody").click(function(){
        closeme();
      });
      
      // loading page content for navigation
      $("a.navlink").live("click", function(e){
        e.preventDefault();
        var linkurl     = $(this).attr("href");
        var linkhtmlurl = linkurl.substring(1, linkurl.length);
        
        var imgloader   = '<center style="margin-top: 30px;"><img src="img/preloader.gif" alt="loading..." /></center>';
        
        closeme();
        
        $(function() {
          topbar.css("top", "0px");
          window.scrollTo(0, 1);
        });
        
        content.html(imgloader);
        
        setTimeout(function() { content.load(linkhtmlurl, function() {  }) }, 1200);
      });
    });
}

$scope.navigatePage = function(pagename){
      $location.path(pagename);
    }

    $scope.checkSession = function(){
      var session = sessionStorage.getItem("loggedIn");
      if(session == null || session == "false"){
        $location.path('login');
      }
    }

    $scope.clear = function(textarea_ID){
      document.getElementById(textarea_ID).value = "";
    }
});
