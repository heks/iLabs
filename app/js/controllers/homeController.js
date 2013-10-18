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