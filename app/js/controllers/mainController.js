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
      console.log(parameters)
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
            $location.path('experiment/'+step_title+'/'+step_name);
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