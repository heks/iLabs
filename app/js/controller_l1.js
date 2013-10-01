/* Controllers */

//Login Controller
mobileApp.controller('loginCtrl',
  function loginCtrl ($scope, $location) {

    $scope.submit = function(){
    // show loading graphic
      $('#waiting').show();
        var username = $scope.mobform.username;
        var password = $scope.mobform.password;
        $scope.login(username, password);
    }

    $scope.login = function(username, password){
      //var params = "username=rasmiroy&password=Pichuaug18";
      var params = "username="+username+"&password="+password;
      $.ajax({
        url: 'http://ilabs.sesp.northwestern.edu/sbapi/login.php',
        crossDomain: 'false',
        type: 'GET',
        data: params,
        dataType: 'jsonp',
        async: false,
        success: function(data) {
          $scope.$apply(function(){
            $scope.result=data.message;
              if (data['error']) {
                alert("Credentials Invalid");
                return;
              }
              console.log(data);
              localStorage.setItem('CouponID', data['couponId']);
              localStorage.setItem('PassKey', data['passKey']);
              localStorage.setItem('Username', username);
              $location.path("home");
              $scope.foobar = true;
              sessionStorage.setItem("loggedIn", "true");
          });
        },
        error: function() { 
          alert('Error');
        }
      }).done(function () {
          $('#waiting').hide();
        });
    }
});

//Home Controller
mobileApp.controller('homeCtrl',
  function homeCtrl($scope, $location, $http){

    $scope.experiments = function(){
      $location.path("mygroups");
    }
});

// Group Controller
mobileApp.controller('groupCtrl',
  function groupCtrl($scope, $location, $http){

    $scope.open = function () {
      $scope.shouldBeOpen = true;
    };

    $scope.close = function () {
      $scope.closeMsg = 'I was closed at: ' + new Date();
      $scope.shouldBeOpen = false;
    };

    $scope.openP = function () {
      $scope.shouldBeOpenP = true;
    };

    $scope.closeP = function () {
      $scope.closeMsg = 'I was closed at: ' + new Date();
      $scope.shouldBeOpenP = false;
    };

    $scope.openOffersDialog = function(labTitle){
      var converter  = new Markdown.Converter(),
      markdownToHtml = converter.makeHtml;
      //localStorage.setItem('LABTITLE', labTitle);

      if(labTitle == 'Radioactivity'){
        var labjournal_url = "http://129.105.107.134/api/v1/labjournal/2/";
        //var jsontemplate = "labjournal_latest.json";
        //var content = "**What is this lab about?**\nIn this lab, you can investigate the intensity of radiation over distance using a radioactive strontium-90 sample and a Geiger counter, which is an instrument used to measure radioactive radiation.\n\n**How does the lab equipment work?**\nAs the strontium-90 sample decays, it emits radioactive beta particles. The Geiger counter detects the number of radioactive particles that are present at a given distance from the strontium-90 source. This equipment is located at the University of Queensland in Australia. Click on the webcam to see this equipment live in Australia.\n\n**What can I do in this lab?**\nYou can investigate how radiation changes over distance by collecting measurements of radiation at different distances from the source of radiation (strontium-90). When you're ready to begin the lab, click Start below.\n";
      }
      if(labTitle == 'PowderXRD'){
        localStorage.setItem('LABJOURNAL_JSON_DATA', "");
      }

      /*var markdowndata = content;
      var htmlcontent = markdownToHtml(markdowndata);
      
      if($.trim($("#popupcontent").text()) == ""){
        $("#popupcontent").append(htmlcontent);
      }*/

      // Template JSON
      /*$http.get("template/"+jsontemplate).success(function(data){
        var dataToStore = JSON.stringify(data);
        localStorage.setItem('LABJOURNAL_JSON_DATA', dataToStore);
      });
      var getJSON = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
      var content = getJSON.labjournalsteps[0].journal_step_content;

      var markdowndata = content;
      var htmlcontent = markdownToHtml(markdowndata);
      $("#popupcontent").append(htmlcontent);*/
            
      // Rendering Labjournal through the REST API
      $.ajax({
        url: labjournal_url,
        crossDomain: "false",
        type: "GET",
        data: {
                format : 'jsonp'
              },
        cache: false,
        dataType: "jsonp",
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
          var getJSON = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
          console.log(getJSON)
          var content = getJSON.labjournalsteps[0].journal_step_content;

          var markdowndata = content;
          var htmlcontent = markdownToHtml(markdowndata);
          $("#popupcontent").append(htmlcontent);
        }); 

      if(labTitle != 'PowderXRD'){
        $('#overlay').fadeIn('fast', function() {
          $('#boxpopup').css('display','block');
          $('#boxpopup').animate({'left':'5%'},400);
        });
      }
    }

    $scope.closeOffersDialog = function(prospectElementID){
      $(function($) {
        $(document).ready(function() {
          $('#' + prospectElementID).css('position','absolute');
            $('#' + prospectElementID).animate({'left':'-100%'}, 500, function() {
              $('#overlay').fadeOut('fast');
            });
        });
      });
    }

    $scope.startLab = function(){
      /*var getlabTitle = localStorage.getItem;
      if(getlabTitle == 'Radioactivity'){
        var labjournal_url = "http://129.105.107.134/api/v1/labjournal/2/";
      }*/

      var getJSON = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
      var labjournalID = getJSON.id;
      if(getJSON.labjournalsteps[1] != undefined){
        var step_no = "step1";
        var step_title = getJSON.labjournalsteps[1].journal_step_title.toLowerCase();
      }
          
      var timestamp = new Date().getTime();
      localStorage.setItem('TIMESTAMP', timestamp);
      var getTimestamp = localStorage.getItem('TIMESTAMP');
      var unique = "" + timestamp + labjournalID;
      var hash = hex_md5(unique);
      localStorage.setItem('HASH_VALUE', hash);
      var getHash = localStorage.getItem('HASH_VALUE');
      var username = localStorage.getItem('Username');
      var GUID = username+"_"+getHash;
      localStorage.setItem('GUID', GUID);
      var jsonObject = {"GUID" : GUID, "lab_journal" : "/api/v1/labjournal/"+labjournalID+"/", "user" : "/api/v1/user/"+username+"/"};
      console.log(jsonObject)
      var data = JSON.stringify(jsonObject);

      // POST data to REST API
      $.ajax({
        url: 'http://129.105.107.134/api/v1/labjournalinstance/',
        crossDomain: 'false',
        type: 'POST',
        data: data,
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

      //Launch Experiment
      $location.path("template/"+step_title+"/"+step_no);
    }

    $scope.opts = {
      backdropFade: true,
      dialogFade:true
    };
      
    $scope.optsP = {
      backdropFade: true,
      dialogFade:true
    };

    $scope.labs = [{"header": "Radioactivity iLab", "desc": "A lab to investigate the intensity of radiation over distance." }];
    $scope.foos = [{"header": "PowderXRD Lab Client", "desc": "PowderXRD iLabs Client" }];
});

//Template Controller
mobileApp.controller('templateCtrl',
  function templateCtrl($scope, $location, $http, $compile){

    $scope.Back = function(){
      var path = $location.path();
      var value = path.substring(path.lastIndexOf('/') + 1);
      var step_no = parseInt(value.charAt(value.length-1));
      var index = step_no - 1;

      var getJSON = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
      if(index != 0){
        var title = getJSON.labjournalsteps[index].journal_step_title;
        var labtitle = title.toLowerCase();
        $location.path("template/"+labtitle+"/step"+index);
      }
    }

    $scope.Next = function(){
      var path = $location.path();
      var step = path.substring(path.lastIndexOf('/') + 1);
      var index = parseInt(step.charAt(step.length-1)) + 1;

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
            var jsoncomb_string = JSON.stringify(jsoncomb);
            localStorage.setItem(step, jsoncomb_string);
            console.log(jsoncomb)

            // if the parameters exist, then send to the REST API
            if(jsoncomb['parameters'] != undefined){
              for(var param_loop=0; param_loop<jsoncomb['parameters'].length; param_loop++){
                var param_data = JSON.stringify(jsoncomb['parameters'][param_loop]);
                $.ajax({
                  url: 'http://129.105.107.134/api/v1/labjournalparameterresponse/',
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
                  url: 'http://129.105.107.134/api/v1/labjournalquestionresponse/',
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

            // navigate to next step
            $location.path("template/"+labtitle+"/step"+step_no);
          }else{
                 alert("Please fill out the empty field( s)");
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
    }

    $scope.loadContent = function(content){
      $(".test2").append(content);
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
  function appController($scope, $location){

    $scope.sidebar = function(){
      $('#navigation a').stop().animate({'marginLeft':'-85px'},1000);
        $('#navigation > li').hover(
          function () {
            $('a',$(this)).stop().animate({'marginLeft':'-2px'},200);
          },
          function () {
            $('a',$(this)).stop().animate({'marginLeft':'-85px'},200);
          }
        );
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
