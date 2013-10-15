/**
* Controllers 
* @description
* The behavior of the application is located in the controller. 
*/

/**************************************************/
/************* LOGIN PAGE CONTROLLER **************/
/**************************************************/

/**
* @ngdoc function 
* @name loginCtrl
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
    * @ngdoc function 
    * @name submit
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
    * @ngdoc function 
    * @name login
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
            $scope.result=data.message;
              if (data['error']) {
                alert('Credentials Invalid');
                return;
              }
              console.log(data);
              localStorage.setItem('Username', username);
              localStorage.setItem('API_KEY', data['api_key']);
              // If the authentication is successfull, then it redirects to the Homepage
              $location.path('home');
              sessionStorage.setItem('loggedIn', 'true');
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
* @ngdoc function 
* @name homeCtrl
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
    * @ngdoc function 
    * @name loadDynamicContents
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
    * @ngdoc function 
    * @name retrieveGroups
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
    * @ngdoc function 
    * @name retrieveAssignments
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
    * @ngdoc function 
    * @name retrieveSubscriptions
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
    * @ngdoc function 
    * @name retrievelabjournals
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
});

/******************************************************/
/************* MYGROUP PAGE CONTROLLER ****************/
/******************************************************/

/**
* @ngdoc function 
* @name groupCtrl
* @description
* Define all the functionalities have to be performed in the mygroup template
* @param $scope {ngService} An angular service - This service let the controller give objects and functions to the views
* that can later be manipulated with expressions and directives.
* @param $location {ngService} An angular service - It parses the URL in the browser adddress bar and makes the URL
* available to the application. Changes to the URL in the address bar reflected into $location service and viceversa.
* @param $http {ngService} - It takes a single argument that is used to generate an HTTP request and 
* returns response with two $http methods: success and error
*/

mobileApp.controller('groupCtrl',
  function groupCtrl($scope, $location, $http){

    /**
    * @ngdoc function 
    * @name loadgroupContent
    * @description
    * Retrieve the groups, in which the student belongs to, through the API and dynamically render those data
    * in the mobile app interface
    */

    $scope.loadgroupContent = function(){
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
          $scope.groups = JSON.parse(group_data);
      }else{
          var groups_content = 'No more groups available';
          $('#groups_content').replaceWith('<div>'+groups_content+'</div>');
      }
  }
});

/********************************************************/
/************* ASSIGNMENT PAGE CONTROLLER ***************/
/********************************************************/

/**
* @ngdoc function 
* @name assignmentCtrl
* @description
* Define all the functionalities have to be performed in the assignment template
* @param $scope {ngService} An angular service - This service let the controller give objects and functions to the views
* that can later be manipulated with expressions and directives.
* @param $location {ngService} An angular service - It parses the URL in the browser adddress bar and makes the URL
* available to the application. Changes to the URL in the address bar reflected into $location service and viceversa.
* @param $http {ngService} - It takes a single argument that is used to generate an HTTP request and 
* returns response with two $http methods: success and error
*/

mobileApp.controller('assignmentCtrl',
  function assignmentCtrl($scope, $location, $http){

    /**
    * @ngdoc function 
    * @name loadassignmentContent
    * @description
    * Retrieve the assignments, those have been assigned to the student by the teacher, through the API and dynamically render those data
    * in the mobile app interface
    */

    $scope.loadassignmentContent = function(){
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
          $scope.assignments = JSON.parse(assignment_data);
      }else{
          var assignments_content = 'No more assignments available';
          $('#assignments_content').replaceWith('<div>'+assignments_content+'</div>');
      }
  }
});

/**********************************************************/
/************* SUBSCRIPTION PAGE CONTROLLER ***************/
/**********************************************************/

/**
* @ngdoc function 
* @name subscriptionCtrl
* @description
* Define all the functionalities have to be performed in the subscription template
* @param $scope {ngService} An angular service - This service let the controller give objects and functions to the views
* that can later be manipulated with expressions and directives.
* @param $location {ngService} An angular service - It parses the URL in the browser adddress bar and makes the URL
* available to the application. Changes to the URL in the address bar reflected into $location service and viceversa.
* @param $http {ngService} - It takes a single argument that is used to generate an HTTP request and 
* returns response with two $http methods: success and error
*/

mobileApp.controller('subscriptionCtrl',
  function subscriptionCtrl($scope, $location, $http){

    /**
    * @ngdoc function 
    * @name loadsubscriptionContent
    * @description
    * Retrieve the subscriptions, those have been subscribed by the student, through the API and dynamically render those data
    * in the mobile app interface
    */

    $scope.loadsubscriptionContent = function(){
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
          $scope.subscriptions = JSON.parse(subscription_data);
      }else{
          $("#subscriptions_content").hide();
          $("#default_content").show();
      }
    }
});

/********************************************************/
/************* LABJOURNAL PAGE CONTROLLER ***************/
/********************************************************/

/**
* @ngdoc function 
* @name labjournalCtrl
* @description
* Define all the functionalities have to be performed in the labjournal template
* @param $scope {ngService} An angular service - This service let the controller give objects and functions to the views
* that can later be manipulated with expressions and directives.
* @param $location {ngService} An angular service - It parses the URL in the browser adddress bar and makes the URL
* available to the application. Changes to the URL in the address bar reflected into $location service and viceversa.
* @param $http {ngService} - It takes a single argument that is used to generate an HTTP request and 
* returns response with two $http methods: success and error
*/

mobileApp.controller('labjournalCtrl',
  function labjournalCtrl($scope, $location, $http){
    var username = localStorage.getItem('Username');
    var api_key = localStorage.getItem('API_KEY');
    var parameters = 'username='+username+'&api_key='+api_key;

    /**
    * @ngdoc function 
    * @name loadjournalContent
    * @description
    * Retrieve the labjournals, those haven't been assigned and subscribed, through the API and dynamically render those data
    * in the mobile app interface
    */

    $scope.loadlabjournalContent = function(){
      var get_labjournaljson = JSON.parse(localStorage.getItem('LABJOURNALS_BROWSE'));
      var total_count = get_labjournaljson.meta.total_count;
      if (total_count != 0){
        var labjournal_data = '[';
        for (var labjournal_count = 0; labjournal_count < total_count; labjournal_count++){
          labjournal_data += '{';
          labjournal_data += '"title" : "'+get_labjournaljson.objects[labjournal_count].title+'",';
          labjournal_data += '"subject" : "'+get_labjournaljson.objects[labjournal_count].subject+'",';
          labjournal_data += '"author" : "'+get_labjournaljson.objects[labjournal_count].author+'",';
          labjournal_data += '"modified_date" : "'+get_labjournaljson.objects[labjournal_count].modified_date+'",';
          labjournal_data += '"resource_uri" : "'+get_labjournaljson.objects[labjournal_count].resource_uri+'"';
          labjournal_data += '},'
        }
          labjournal_data = labjournal_data.slice(0, -1);
          labjournal_data += ']';
          $scope.labjournals = JSON.parse(labjournal_data);
      }else{
          $("#labjournals_content").hide();
          $("#default_content").show();
      }
    }

    /**
    * @ngdoc function 
    * @name subscribeLabjournal
    * @description
    * Can be able to subscribe the labjournals, those haven't been assigned and subscribed
    * @param labjournal_uri {String} - The resource of the labjournal
    */

    $scope.subscribeLabjournal = function(labjournal_uri){
      var subscribe_data = JSON.stringify({"lab_journal": labjournal_uri});
      $.ajax({
        url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalsubscription/?'+parameters,
        crossDomain: 'false',
        type: 'POST',
        data: subscribe_data,
        contentType: 'application/json',
        cache: false,
        dataType: 'json',
        async: false,
        processData: false,
        success: function(data){ },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          alert('XMLHttpRequest: '+XMLHttpRequest.responseText);
          alert('Error Message: '+textStatus);
          alert('HTTP Error: '+errorThrown);
        }
      });
    }
});

/******************************************************/
/************* TEMPLATE PAGE CONTROLLER ***************/
/******************************************************/

/**
* @ngdoc function 
* @name templateCtrl
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
    * @ngdoc function 
    * @name navigatePage
    * @description
    * Navigate to the specified page
    * @param pagename {String} - The name of the page to be navigate
    */

    $scope.navigatePage = function(pagename){
      $location.path(pagename);
    }

    /**
    * @ngdoc function 
    * @name navigateBack
    * @description
    * Navigate to the previous step of the current experiment instance
    */

    $scope.navigateBack = function(){
      var path = $location.path(); // Get the resource path (ex: template/{step_title}/{step_name})
      // Get the last index of the url path (ex: {step_name} - step1)
      var step_name = path.substring(path.lastIndexOf('/') + 1); 
      // Get the index for the previous step data in the labjournal JSONobject. (ex: 1 - 1 = 0 => index)
      var index = parseInt(step_name.charAt(step_name.length-1)) - 1; 
      localStorage.setItem('SUBMIT_DESIGN', 0);
      var getlabjournal = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
      if(index != 0){
        var labtitle_upper = getlabjournal.labjournalsteps[index].journal_step_title;
        var labtitle = labtitle_upper.toLowerCase();
        $location.path('template/'+labtitle+'/step'+index); // Redirects to the first step in the experiment
      }
    }

    /**
    * @ngdoc function 
    * @name navigateNext
    * @description
    * Navigate to the next step of the current experiment instance
    */
    
    $scope.navigateNext = function(){
      var path = $location.path(); // Get the resource path (ex: template/{step_title}/{step_name})
      // Get the last index of the url path (ex: {step_name} - step1)
      var step_name = path.substring(path.lastIndexOf('/') + 1); 
      // Get the index for the next step data in the labjournal JSONobject. (ex: 1 + 1 = 2 => index)
      var index = parseInt(step_name.charAt(step_name.length-1)) + 1; 
      var username = localStorage.getItem('Username');
      var api_key = localStorage.getItem('API_KEY');
      var parameters = 'username='+username+'&api_key='+api_key;

      // Check the inputfields are empty or not
      var textbox = $scope.isTextboxempty();
      var dropdown = $scope.isDropdownempty();
      var textarea = $scope.isTextareaempty();

      var getLabjournal = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
      var total_steps = getLabjournal.number_of_steps;
      if (index < total_steps){ var step_no = index; }
      if (step_no < total_steps){
        var title = getLabjournal.labjournalsteps[index].journal_step_title;
        var labtitle = title.toLowerCase();

        if (textbox == true && dropdown == true && textarea == true){
          var parameter_array = $scope.getParametervalues(); // grab the parameter values from the appropriate inputfields
          var question_array = $scope.getQuestionvalues(); // grab the question values from the appropriate inputfields
          console.log(parameter_array); console.log(question_array);
          // Create a JSON object containing parameter and question data using the parameter and question arrays
          var JSONcombined_data  = $scope.parameterquestion_JSON(parameter_array, question_array);
          console.log(JSONcombined_data);

          // POST and UPDATE the experiment data on each step
          $scope.postupdateExperimentdata(JSONcombined_data, parameters, step_name);
          var JSONcombined_data_string = JSON.stringify(JSONcombined_data);
          localStorage.setItem(step_name, JSONcombined_data_string);

          // After performing all the above operations, then navigate to the next step
          $location.path('template/'+labtitle+'/step'+step_no);
        }else{
          alert('Please fill out the empty field( s)');
        }
      }
    }

    /**
    * @ngdoc function 
    * @name isTextboxempty
    * @description
    * Iterate through all the textboxes in the current step and check if they're empty or not
    * @returns {Boolean}
    */

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

    /**
    * @ngdoc function 
    * @name isDropdownempty
    * @description
    * Iterate through all the dropdowns in the current step and check if they're empty or not
    * @returns {Boolean}
    */

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

    /**
    * @ngdoc function 
    * @name isTextareaempty
    * @description
    * Iterate through all the textareas in the current step and check if they're empty or not
    * @returns {Boolean}
    */

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

    /**
    * @ngdoc function 
    * @name getParametervalues
    * @description
    * Grab all the parameter values from the experiment design form
    * Returns all the parameter values
    * @returns {Array}
    */

    $scope.getParametervalues = function(){
      if (document.getElementById('device_form') != null){
        var parameter_array = new Array();
        var childNodes_length = document.getElementById('device_form').childNodes.length;
        for (var i = 0; i < childNodes_length; i++){
          var childNodes_type = document.getElementById('device_form').childNodes[i].type;
          var childNodes_value = document.getElementById('device_form').childNodes[i].value;
          var childNodes_id = document.getElementById('device_form').childNodes[i].id;
          if (childNodes_type != undefined && childNodes_type != 'range'){
            parameter_array[childNodes_id] = childNodes_value;
          }
        }
      }
      return parameter_array;
    }

    /**
    * @ngdoc function 
    * @name getQuestionvalues
    * @description
    * Grab all the question values in the current step
    * Returns all the question values
    * @returns {Array}
    */

    $scope.getQuestionvalues = function(){
      var textbox_length = document.getElementsByTagName('input').length;
      var textbox_array = new Array();
      for (var textbox = 0; textbox < textbox_length; textbox++){
        var parentNodeID = document.getElementsByTagName('input')[textbox].parentNode.id;
        if (parentNodeID != 'device_form'){
          var key  = document.getElementsByTagName('input')[textbox].id;
          var value = document.getElementsByTagName('input')[textbox].value;
          textbox_array[key] = value;
        }
      }
            
      var textarea_length = document.getElementsByTagName('textarea').length;
      var textarea_array = new Array();
      for (var textarea = 0; textarea < textarea_length; textarea++){
        var parentNodeID = document.getElementsByTagName('textarea')[textarea].parentNode.id;
        if (parentNodeID != 'device_form'){
          var key  = document.getElementsByTagName('textarea')[textarea].id;
          var value = document.getElementsByTagName('textarea')[textarea].value;
          textarea_array[key] = value;
        }
      }
      var question_array = $.extend(textbox_array, textarea_array);
      return question_array;  
    }

    /**
    * @ngdoc function 
    * @name parameterquestion_JSON
    * @description
    * Creates a JSON object containing all the parameters and questions values inorder to send to the API
    * @param parameter_array {Array} An array, which contains all the relevant information regarding the parameters
    * @param question_array {Array} An array, which contains all the relevant information regarding the questions
    * @returns {jsonObject}
    */

    $scope.parameterquestion_JSON = function(parameter_array, question_array){
      var GUID = localStorage.getItem('GUID');
      var parameter_array_length = 0;
      for (index in parameter_array){
        parameter_array_length++;
      }
      var question_array_length = 0;
      for (index in question_array){
        question_array_length++;
      }
      if (parameter_array_length > 0){
        var parameterJSON = "{";
        parameterJSON += '"parameters" : [';
        for (var param in parameter_array){
          var split_param = param.split("_");
          var PID = split_param[1];
          var response = parameter_array[param];
          parameterJSON += "{";
          parameterJSON += '"instance" : "/api/v1/labjournalinstance/'+GUID+'/",';
          parameterJSON += '"parameter" : "/api/v1/deviceparameter/'+PID+'/",';
          parameterJSON += '"response" : "'+response+'"'
          parameterJSON += "},";
        }
          parameterJSON = parameterJSON.slice(0, -1);
          parameterJSON += "]";
          parameterJSON += "}";
          var parameter = JSON.parse(parameterJSON);
      }
      if (question_array_length > 0){
        var questionJSON = "{";
        questionJSON += '"questions" : [';
        for (var ques in question_array){
          var split_ques = ques.split("_");
          var QID = split_ques[1];
          var response = question_array[ques];
          questionJSON += "{";
          questionJSON += '"instance" : "/api/v1/labjournalinstance/'+GUID+'/",';
          questionJSON += '"question" : "/api/v1/labjournalquestion/'+QID+'/",';
          questionJSON += '"response" : "'+response+'"'
          questionJSON += "},";
        }
          questionJSON = questionJSON.slice(0, -1);
          questionJSON += "]";
          questionJSON += "}";
          var question = JSON.parse(questionJSON);
      }
        var jsoncombined  = $.extend(parameter, question);
        return jsoncombined;
    }

    /**
    * @ngdoc function 
    * @name postupdateExperimentdata
    * @description
    * Manipulate all the POST and UPDATE operations on each data in each steps of the experiment
    * based on several conditions
    * @param JSONcombined_data {jsonObject} - Containing parameters and questions input values
    * @param parameters {String} - Additional data to pass to the query string
    * @param step_name {String} - The name of the current step( eg: step1)
    */

    $scope.postupdateExperimentdata = function(JSONcombined_data, parameters,step_name){
      if (JSON.parse(localStorage.getItem(step_name))){
        var get_stepdata = JSON.parse(localStorage.getItem(step_name));
        if (JSONcombined_data['parameters'] != undefined){
          var splitinstance = get_stepdata.parameters[0].instance.split('/');
          var lsinstance_GUID = splitinstance[splitinstance.length - 2];
        }else if(JSONcombined_data['questions'] != undefined){
          var splitinstance = get_stepdata.questions[0].instance.split('/');
          var lsinstance_GUID = splitinstance[splitinstance.length - 2];
        }else{
          var lsinstance_GUID = 0;
        }
              
        var currentinstance_GUID = localStorage.getItem('GUID');
        if(currentinstance_GUID == lsinstance_GUID){
          // if the current instance GUID and localstorage instance GUID are equal, 
          // then update the parameters & questions values via API
          $scope.updateParametervalues(JSONcombined_data, parameters, step_name);
          //$scope.submitExperimentdesign(JSONcombined_data, parameters);
          $scope.updateQuestionvalues(JSONcombined_data, parameters, step_name);
        }else{
          // if the current instance GUID and localstorage instance GUID are not equal, 
          // then post the parameters & questions values via API
          $scope.postParametervalues(JSONcombined_data, parameters);
          localStorage.setItem('SUBMIT_DESIGN',1);
          //$scope.submitExperimentdesign(JSONcombined_data, parameters);
          $scope.postQuestionvalues(JSONcombined_data, parameters);
        }
      }else{
          // if there is no step data regarding the current instance stored in the localstorage, 
          // then post the parameters & questions values via API
          $scope.postParametervalues(JSONcombined_data, parameters);
          localStorage.setItem('SUBMIT_DESIGN',1);
          //$scope.submitExperimentdesign(JSONcombined_data, parameters);
          $scope.postQuestionvalues(JSONcombined_data, parameters); 
      }
    }

    /**
    * @ngdoc function 
    * @name sumbitExperimentdesign
    * @description
    * Submit the experiment design values to the API
    * @param parameters {String} - Additional data to pass to the query string(submit url)
    */

    $scope.submitExperimentdesign = function(JSONcombined_data, parameters){
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

    /**
    * @ngdoc function 
    * @name updateParametervalues
    * @description
    * Update the parameter value, if we change the parameter value of the same experiment instance
    * @param JSONcombined_data {jsonObject} - Containing parameters and questions input values
    * @param parameters {String} - Additional data to pass to the query string(API update url)
    * @param step_name {String} - The name of the current step( eg: step1)
    */

    $scope.updateParametervalues = function(JSONcombined_data, parameters, step_name){
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

    /**
    * @ngdoc function 
    * @name updateQuestionvalues
    * @description
    * Update the question value, if we change the question value of the same experiment instance
    * @param JSONcombined_data {jsonObject} - Containing parameters and questions input values
    * @param parameters {String} - Additional data to pass to the query string(API update url)
    * @param step_name {String} - The name of the current step( eg: step1)
    */

    $scope.updateQuestionvalues = function(JSONcombined_data, parameters, step_name){
      if (JSONcombined_data['questions'] != undefined){
        var get = JSON.parse(localStorage.getItem(step_name));
        for (var ques_loop = 0; ques_loop < JSONcombined_data['questions'].length; ques_loop++){
          var lsResponse = get.questions[ques_loop].response;
          var fResponse = JSONcombined_data['questions'][ques_loop].response;
          var splitGUID = JSONcombined_data['questions'][ques_loop].instance.split('/');
          var getGUID = splitGUID[splitGUID.length -2];
          var splitQID = JSONcombined_data['questions'][ques_loop].question.split('/');
          var getQID = splitQID[splitQID.length -2];

          if (lsResponse != fResponse){
            var JSONobj = {"instance" : "/api/v1/labjournalinstance/"+getGUID+"/", "question" : "/api/v1/labjournalquestion/"+getQID+"/", "response" : fResponse};
            var ques_data = JSON.stringify(JSONobj);
            var update_url = 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalquestionresponse/?'+parameters;
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
    }

    /**
    * @ngdoc function 
    * @name postParametervalues
    * @description
    * Post the parameter value to the API
    * @param JSONcombined_data {jsonObject} - Containing parameters and questions input values
    * @param parameters {String} - Additional data to pass to the query string(API post url)
    */

    $scope.postParametervalues = function(JSONcombined_data, parameters){
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
    * @name postQuestionvalues
    * @description
    * Post the question value to the API
    * @param JSONcombined_data {jsonObject} - Containing parameters and questions input values
    * @param parameters {String} - Additional data to pass to the query string(API post url)
    */

    $scope.postQuestionvalues = function(JSONcombined_data, parameters){
      if (JSONcombined_data['questions'] != undefined){
        for (var ques_loop = 0; ques_loop < JSONcombined_data['questions'].length; ques_loop++){
          var ques_data = JSON.stringify(JSONcombined_data['questions'][ques_loop]);
          $.ajax({
            url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalquestionresponse/?'+parameters,
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

    /**
    * @ngdoc function 
    * @name renderResults
    * @description
    * Get the experiment result from the local storage, which is retrieved from the API
    * and deployed the values inside the HTMl grid
    */

    $scope.renderResult = function(){
      $scope.stopBlink();
      $scope.retrieveExperimentresult();
      var getresult = localStorage.getItem('EXPERIMENT_RESULT');
      var resultparse = JSON.parse(getresult);
      var resultlength = resultparse.results.length;
      var keynames = []; 
      for (var key in resultparse.results[0]){
        keynames.push(key);
      }
      var header = new Array(keynames[0]);
      var distance_array = []; var result_array = [];
      for (var t1 = 0;t1 < resultlength; t1++){
       distance_array.push(resultparse.results[t1].distance);
       result_array.push(resultparse.results[t1].result);
      }
      var combined_array = new Array();
      for (var t2=0; t2 < resultlength; t2++){
      combined_array.push(distance_array[t2]+','+result_array[t2]);
      }
      var no_of_trials = resultparse.results[0].result;
      no_of_trials = no_of_trials.split(',');

      for (var trial = 1; trial <= no_of_trials.length; trial++){
        header.push('Trial'+trial)
      }
      var container = '<div class=\'containerDiv\'>';
      container += '<div class=\'rowDivHeader\'>';
      for (var i = 0;i < header.length; i++){
            container += '<div class=\'cellDivHeader\'>'+header[i]+'</div>';
      }
      container += '</div>';
      for (var j = 0; j < combined_array.length; j++){
        container += '<div class=\'rowDiv\'>';
          for(var k = 0; k < header.length; k++){
            var split_combined_array = combined_array[j].split(',');
            container += '<div class=\'cellDiv\'>'+split_combined_array[k]+'</div>';
          }
        container += '</div>';
      }
      container += '</div>';
      $('#experiment_result').html(container);
      $('#graph_button').show();

      $(document).ready(function(){
        $('.slider-button').toggle(function(){
          $(this).addClass('on').html('ON');
          $('#graph').show();
          $scope.renderGraph();
        },function(){
        $(this).removeClass('on').html('OFF');
          $('#graph').hide();
        });
      });
    }

    /**
    * @ngdoc function 
    * @name retrieveExperimentresult
    * @description
    * Get the experiment result from the API and stored in the local storage
    */

    $scope.retrieveExperimentresult = function(){
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

    /**
    * @ngdoc function 
    * @name highchartsGraph
    * @description
    * Define the properties of the highgraph thrid party library to deploy the graph
    */

    $scope.highchartsGraph = function(distance){
      $scope.retrieveExperimentresult();
      var chart = $("#graph").highcharts({
        colors: ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
        chart: {
                  type: 'line',
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
                    categories: distance,
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
    }

    /**
    * @ngdoc function 
    * @name renderGraph
    * @description
    * Define the properties of the highgraph thrid party library to deploy the graph
    */

    $scope.renderGraph = function(){
      $scope.highchartsGraph();
      var getresult = localStorage.getItem('EXPERIMENT_RESULT');
      var resultlength = JSON.parse(getresult).results.length;
     
      var distance_array = new Array();var series_array = new Array();
      for (var loop = 0; loop < resultlength; loop++){
        distance_array[loop] = JSON.parse(getresult).results[loop].distance;
        series_array[loop] = JSON.parse(getresult).results[loop].result;
      }

      var chart = $('#graph').highcharts();
      // Dynamically assign the array of xAxis values into the highchart graph object
      chart.xAxis[0].update({categories: distance_array}); 
      var Trial1 =new Array(); var Trial2 =new Array(); var Trial3 =new Array(); var Trial4 =new Array(); var Trial5 =new Array(); 
      var Trial6 =new Array(); var Trial7 =new Array(); var Trial8 =new Array(); var Trial9 =new Array(); var Trial10 =new Array();
      for (var sl = 0; sl < series_array.length; sl++){
        var trial_l = series_array[sl].split(',').length;
        for (var tl = 1; tl <= trial_l; tl++){
          var trial_s = series_array[sl].split(',');
          switch (tl){
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
      combine.push(Trial1,Trial2,Trial3,Trial4,Trial5,Trial6,Trial7,Trial8,Trial9,Trial10);
      for(key in combine){
        if(combine[key] != ''){
          var trial_name = 'Trial'+(parseInt(key)+1);
          // Dynamically assign the array of yAxis values along with the trial name into the highchart graph object
          chart.addSeries({
              name: trial_name,
              data: combine[key]
          });
        }
      }
    }

    /**
    * @ngdoc function 
    * @name loadAdditionaldata
    * @description
    * Load additional data on page load in each step of the experiment
    */

    $scope.loadAdditionaldata = function(){
      var path = $location.path();
      var value = path.substring(path.lastIndexOf('/') + 1);
      var index = parseInt(value.charAt(value.length-1));
      var getlabjournal = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
      var total_steps = getlabjournal.number_of_steps;
      var difference = Math.abs(index - total_steps);
      var last_step = total_steps - 1;

      $scope.Stepdesc = 'Step '+index+' of '+last_step;
  
      if (getlabjournal.labjournalsteps[index] != undefined){
        if (index < total_steps && index == 1){
          if(getlabjournal.labjournalsteps[index+1] != undefined){
            document.getElementById('nav_next').style.display = 'block';
            document.getElementById('home').style.display = 'block';
          }else{
            document.getElementById('nav_back').style.display = 'none';
            document.getElementById('nav_next').style.display = 'none';
            document.getElementById('home').style.display = 'none';
          }
        }else if (index < total_steps && difference == 1){
            document.getElementById('nav_back').style.display = 'block';
        }else{
            document.getElementById('nav_back').style.display = 'block';
            document.getElementById('nav_next').style.display = 'block';
            document.getElementById('home').style.display = 'block';
        }         
      }
      var step_title = getlabjournal.labjournalsteps[index].journal_step_title;
      $scope.Labtitle = step_title;
      if (step_title == 'Analyze'){
        if (localStorage.getItem('SUBMIT_DESIGN') == 1){
          var runTime = 10;
          $scope.runtimeInfotext = 'Your result will be available in '+runTime+' seconds!!!';
          $scope.countDownTimer(runTime);
        }
        if (localStorage.getItem('SUBMIT_DESIGN') == 0){
          $('#viewresult').show();
        }
      }
    }

    /**
    * @ngdoc function 
    * @name countDownTimer
    * @description
    * Count down the estimated runtime to get the result back after the submission 
    * of the experiment design to the API
    * @param timer {Number} - The estimated runtime 
    */

    $scope.countDownTimer = function(timer){
      if (timer > 0){
        var count = timer;
        $scope.startBlink('timercount');
        countdown = setInterval(function(){
          $('#timercountspan').html(count);
          $('#timercount').show();
          if (count == 0){
            $scope.stopBlink();
            $('#timercount').hide();
            clearInterval(countdown);
            $('#runtimemsg').hide();
            $('#viewresult').show();
            alert("Result is ready to view");
            $scope.startBlink('viewresult')
          }
          count--;
        },1000);
      }
    }

    /**
    * @ngdoc function 
    * @name startBlink
    * @description
    * Activate the blinking functionality to the specified HTML element
    * @param identity {String} - The identity of the specified HTML element
    */

    $scope.startBlink = function(identity) { 
      $('#'+identity).blink(100,900); 
    }

    /**
    * @ngdoc function 
    * @name stopBlink
    * @description
    * Deactivate the blinking functionality to the HTML element
    */

    $scope.stopBlink = function () {  
      $('.blink').blink();  
    }

    /**
    * @ngdoc function 
    * @name loadContent
    * @description
    * Compile the HTML markup content and render inside the custom directive DOM element
    * @param content {HTML} - Compiled HTML DOM
    */

    $scope.loadContent = function(content){
      $('.compile_content').append(content);
    }

    /**
    * @ngdoc function
    * @name updateInstance
    * @description
    * Update the instance data in the API on exit once the user completed the experiment 
    */

    $scope.updateInstance = function(parameters, index){
      var GUID = localStorage.getItem('GUID');
      var labjournalID = localStorage.getItem('LABJOURNAL_ID');
      var username = localStorage.getItem('Username');
      var getlabjournal = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
      var labjournal_stepid = getlabjournal.labjournalsteps[index].id;
      var labjournal_uri = getlabjournal.resource_uri;
      var jsonObject = {"GUID" : GUID,  "last_step_completed" : labjournal_stepid, "lab_journal": labjournal_uri};
      console.log(jsonObject)
      var data = JSON.stringify(jsonObject);

      $.ajax({
        url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalinstance/?'+parameters,
        crossDomain: 'false',
        type: 'POST',
        data: data,
        contentType: 'application/json',
        cache: false,
        dataType: 'json',
        async: false,
        processData: false,
        success: function(data){
          $location.path("home");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          alert('XMLHttpRequest: '+XMLHttpRequest.responseText);
          alert('Error Message: '+textStatus);
          alert('HTTP Error: '+errorThrown);
        }
      });
    }
});

/*********************************************/
/************* MAIN CONTROLLER ***************/
/*********************************************/

/**
* @ngdoc function 
* @name appController
* @description
* Define all the common functionalities have to be performed in the mobile interface
* @param $scope {ngService} An angular service - This service let the controller 
* give objects and functions to the views that can later be manipulated with expressions and directives.
* @param $location {ngService} An angular service - It parses the URL in the browser adddress bar and makes the URL
* available to the application. Changes to the URL in the address bar reflected into $location service and viceversa.
* @param $http {ngService} - It takes a single argument that is used to generate an HTTP request and 
* returns response with two $http methods: success and error
*/

mobileApp.controller('appController',
  function appController($scope, $location, $http){
    var username = localStorage.getItem('Username');
    var api_key = localStorage.getItem('API_KEY');
    var parameters = 'username='+username+'&api_key='+api_key;

    /**
    * @ngdoc function 
    * @name startLab
    * @description
    * When the user attempt to start the Lab, then it will download the appropriate labjournal through the API and 
    * begin to start the experiment flow
    * @param labjounal_uri {String} - The resource of the labjournal
    */

    $scope.startLab = function(labjournal_uri){
      var labjournal_url = 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com'+labjournal_uri+'?'+parameters;
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
    * @ngdoc function 
    * @name sendLabjournalinstance
    * @description
    * Whenever a the experiment begins, then it will send the instance data regarding that particula instance
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
      var instance_jsonObject = {"GUID": GUID, "lab_journal": "/api/v1/labjournal/"+labjournalID+"/"};
      console.log(instance_jsonObject)
      var instance_data = JSON.stringify(instance_jsonObject);
          
      $.ajax({
        url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalinstance/?'+parameters,
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
            // Launch the experiment
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

    /**
    * @ngdoc function 
    * @name showMainmenu
    * @description
    * It displays the main navigation menu in the home page
    */

    $scope.showMainmenu = function(){
      $(document).ready(function(){
        var pagebody = $('#pagebody');
        var themenu  = $('#navmenu');
        var topbar   = $('#toolbarnav');
        var content  = $('#homecontent');
        var viewport = {
          width  : $(window).width(),
          height : $(window).height()
        };
        function closeme() {
          var closeme = $(function() {
            topbar.animate({
              left: '0px'
            }, 
            { duration: 180, queue: false });
            pagebody.animate({
              left: '0px'
            },
            { duration: 180, queue: false });
          });
        }
      });
    }

    /**
    * @ngdoc function 
    * @name showTemplatemenu
    * @description
    * It displays the template navigation menu in the template page
    */

    $scope.showTemplatemenu = function(){
      $(document).ready(function(){
        var pagebody = $('#pagebody');
        var themenu  = $('#navmenu');
        var topbar   = $('#toolbarnav');
        var content  = $('#homecontent');
        var viewport = {
          width  : $(window).width(),
          height : $(window).height()
        };
        function openme() { 
          $(function () {
            topbar.animate({
              left: '290px'
            }, 
            { duration: 300, queue: false });
            pagebody.animate({
              left: '290px'
            }, { duration: 300, queue: false });
          });
        }
        function closeme() {
          var closeme = $(function() {
            topbar.animate({
              left: '0px'
            }, { duration: 180, queue: false });
            pagebody.animate({
                  left: '0px'
            }, 
            { duration: 180, queue: false });
          });
        }
        // Checking whether to open or close nav menu
        $('#menu-button').live('click', function(e){
          e.preventDefault();
          var leftval = pagebody.css('left');
          if(leftval == '0px') { openme(); }
          else { closeme(); }
        });
        $('#pagebody').click(function(){ closeme(); });
        // Loading page content for navigation
        $('a.navlink').live('click', function(e){
          e.preventDefault();
          var linkurl  = $(this).attr('href');
          var linkhtmlurl = linkurl.substring(1, linkurl.length);
          var imgloader  = '<center style=\'margin-top: 30px;\'>';
          imgloader += '<img src=\'img/preloader.gif\' alt=\'loading...\'/></center>';
          closeme();
          $(function() { topbar.css('top', '0px'); window.scrollTo(0, 1); });
          content.html(imgloader);
          setTimeout(function() { content.load(linkhtmlurl, function() {  }) }, 1200);
        });
      });
    }

    /**
    * @ngdoc function 
    * @name navigatePage
    * @description
    * Navigate to the specified page
    * @param pagename {String} - The name of the page to be navigate
    */

    $scope.navigatePage = function(pagename){
      $location.path(pagename);
    }

    /**
    * @ngdoc function 
    * @name checkSession
    * @description
    * Checks whether the session variable is set to true or false
    * If it sets to true, then it stays in the specified page template. 
    * Otherwise it redirects the user to the login page
    */

    $scope.checkSession = function(){
      var session = sessionStorage.getItem('loggedIn');
      if(session == null || session == 'false'){
        $location.path('login');
      }
    }

    /**
    * @ngdoc function 
    * @name clearTextarea
    * @description
    * It displays the template navigation menu in the template page
    * @param textarea_ID {Number|String} - The identity of the specified textarea
    */

    $scope.clearTextarea = function(textarea_ID){
      document.getElementById(textarea_ID).value = '';
    }
});
