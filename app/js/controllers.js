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
                        //$('#coupon_Id').html(data['couponId']);
                        //$('#coupon_Key').html(data['passKey']);
                        localStorage.setItem('CouponID', data['couponId']);
                        localStorage.setItem('PassKey', data['passKey']);
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
  function homeCtrl($scope, $location){
      $scope.experiments = function(){
        $location.path("mygroups");
      }
});

// Group Controller
mobileApp.controller('groupCtrl',
  function groupCtrl($scope, $location){

      $scope.open = function () {
        $scope.shouldBeOpen = true;
      };

      $scope.close = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.shouldBeOpen = false;
      };

      $scope.start = function () {
        $scope.shouldBeOpen = false;
        $location.path("research");
      };

      $scope.openP = function () {
        $scope.shouldBeOpenP = true;
      };

      $scope.closeP = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.shouldBeOpenP = false;
      };

      $scope.openOffersDialog = function(){
          $('#overlay').fadeIn('fast', function() {
            $('#boxpopup').css('display','block');
            $('#boxpopup').animate({'left':'5%'},400);
          });
      }

      $scope.closeOffersDialog = function(prospectElementID){
            $(function($) {
                $(document).ready(function() {
                    $('#' + prospectElementID).css('position','absolute');
                    $('#' + prospectElementID).animate({'left':'-100%'}, 500, function() {
                        $('#' + prospectElementID).css('position','fixed');
                        $('#' + prospectElementID).css('left','100%');
                        $('#overlay').fadeOut('fast');
                    });
                });
            });
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

// research Controller
mobileApp.controller('researchCtrl',
  function researchCtrl($scope, $location){

      $scope.RB = function(){
        $location.path("mygroups");
      }

      $scope.RN = function(){
        $location.path("question");
      }

      $scope.simulation = function(path){
        $location.path("simulation/"+path);
      }

      $scope.account = function(path){
        $location.path("account/"+path);
      }

      $scope.messages = function(path){
        $location.path("messages/"+path);
      }

      $scope.webcam = function(path){
        $location.path("webcam/"+path);
      }

      $scope.qtns = [
        {"question": "How does this lab work?"},{"question": "What is radiation?"},
        {"question": "What is radioactivity, or radioactive decay?"},{"question": "How is radioactivity measured?"},
        {"question": "What is Strontium-90?"}

       ];

      $scope.open = function () {
        $scope.shouldBeOpen = true;
      }

      $scope.close = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.shouldBeOpen = false;
      }

      $scope.items = ['item1', 'item2'];

      $scope.opts = {
        backdropFade: true,
        dialogFade:true
      };
});

// question Controller
mobileApp.controller('questionCtrl',
  function questionCtrl($scope, $location){

      $scope.QB = function(){
        $location.path("research");
      }

      $scope.QN = function(){
          if($scope.Qtxt == undefined){
            alert("Please fill out the empty fields");
          }else{
            var text = document.getElementById('question').value;
            localStorage.setItem('Question1', text);
            $location.path("design");
          }
      }

      $scope.onLoad = function(){
        var ques1 = localStorage.getItem('Question1');
        $scope.Qtxt = ques1;
      }

      $scope.simulation = function(path){
        $location.path("simulation/"+path);
      }

      $scope.account = function(path){
        $location.path("account/"+path);
      }

      $scope.messages = function(path){
        $location.path("messages/"+path);
      }

      $scope.webcam = function(path){
        $location.path("webcam/"+path);
      }
});

// design Controller
mobileApp.controller('designCtrl',
  function designCtrl($scope, $location){

      $scope.htmlTooltip1 = "The distances from the Strontium-90 source that the Geiger counter will measure radiation. For example, you could enter: 15, 45, 60. The minimum distance is 15mm, and the maximum is 90mm.";
      $scope.htmlTooltip2 = "The number of seconds that each measurement of radiation will last, at each of the distance you chose above";
      $scope.htmlTooltip3 = "The number of times you wish for the experiment to repeat, according to the values you set for the previous variables";

      $scope.DB = function(){
        $location.path("question");
      }

      $scope.DN = function(){
        //var cid = $("#coupon_Id").text();
        //var ckey = $("#coupon_Key").text();
        var cid = localStorage.getItem('CouponID');
        var ckey = localStorage.getItem('PassKey');
        var distances = $scope.distances;
        var times = $scope.m_times;
        var trials = $scope.nof_trials;
        localStorage.setItem('loading','show');
        $scope.submitDesign(cid, ckey, distances, times, trials);
        if($scope.Dtxt == undefined){
          alert("Please fill out the empty fields");
        }else{
          var text = document.getElementById('design').value;
          //$('#D1').html(text);
          localStorage.setItem('Design1', text);
          $location.path("investigate");
        }
      }

       $scope.onLoad = function(){
        var des1 = localStorage.getItem('Design1');
        $scope.Dtxt = des1;
      }

      $scope.simulation = function(path){
        $location.path("simulation/"+path);
      }

      $scope.account = function(path){
        $location.path("account/"+path);
      }

      $scope.messages = function(path){
        $location.path("messages/"+path);
      }

      $scope.webcam = function(path){
        $location.path("webcam/"+path);
      }

      $scope.submitDesign = function(cid, ckey, distances, duration, repeat){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "http://ilabs.sesp.northwestern.edu/iLabServiceBroker/ilabServiceBroker.asmx", true);

        var data  =  '<?xml version="1.0" encoding="utf-8"?>' +
                     '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:s="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'+
                     '<SOAP-ENV:Header>'+
                     '<tns:sbAuthHeader xmlns:tns="http://ilab.mit.edu">'+
                     '<tns:couponID>'+cid+'</tns:couponID>'+
                     '<tns:couponPassKey>'+ckey+'</tns:couponPassKey>' +
                     '</tns:sbAuthHeader>'+  
                     '</SOAP-ENV:Header>'+  
                     '<SOAP-ENV:Body>'+  
                     '<i0:Submit xmlns:i0="http://ilab.mit.edu">'+  
                     '<i0:labServerID>9164ebd6edfd46f2b09dd7175af45ad8</i0:labServerID>'+  
                     '<i0:experimentSpecification>'+ 
                     '&lt;experimentSpecification&gt;'+  
                     '&lt;setupId&gt;RadioactivityVsDistance&lt;/setupId&gt;'+  
                     '&lt;setupName&gt;Radioactivity versus Distance&lt;/setupName&gt;'+  
                     '&lt;sourceName&gt;Strontium-90&lt;/sourceName&gt;'+  
                     '&lt;absorberName&gt;None&lt;/absorberName&gt;'+  
                     '&lt;distance&gt;'+distances+'&lt;/distance&gt;'+  
                     '&lt;duration&gt;'+duration+'&lt;/duration&gt;'+  
                     '&lt;repeat&gt;'+repeat+'&lt;/repeat&gt;'+  
                     '&lt;/experimentSpecification&gt;'+ 
                     '</i0:experimentSpecification>'+  
                     '<i0:priorityHint>0</i0:priorityHint>'+  
                     '<i0:emailNotification>false</i0:emailNotification>'+  
                     '</i0:Submit>'+  
                     '</SOAP-ENV:Body>'+  
                     '</SOAP-ENV:Envelope>'

                   xmlhttp.onreadystatechange = function(){
                        if(xmlhttp.readyState ==4){
                              if (xmlhttp.status == 200){
                                  var xmlDoc = xmlhttp.responseXML;
                                  //alert(xmlhttp.responseText);
                                  
                                  runtime = $(xmlDoc).find("estRuntime").text();
                                  timer = parseInt(runtime) + parseInt(10);
                                  if(timer > 0){
                                  $("#loading").hide();
                                  display_timer = "Your result will be available in "+timer+"seconds!!!";
                                  $("#timer").html(display_timer);
                                  localStorage.setItem('RunTime', display_timer);
                                  }else{
                                  display_timer = "";
                                  $("#timer").html(display_timer);
                                  }
                                  $scope.countDown(timer);
                                  experimentID = $(xmlDoc).find("experimentID").text();
                                  /*$('#exp_Id').html(experimentID);
                                  $('#distances').html(distances);
                                  $('#duration').html(duration);
                                  $('#repeat').html(repeat);*/
                                  localStorage.setItem('ExpID', experimentID);
                                  localStorage.setItem('Distances', distances);
                                  localStorage.setItem('Duration', duration);
                                  localStorage.setItem('Repeat', repeat);
                              }else{
                                  alert("Error: "+ xmlhttp.status + " : "+xmlhttp.responseText)
                              }
                        }
                    }
                   xmlhttp.setRequestHeader('Content-Type', 'text/xml');
                   xmlhttp.send(data);
      }

      $scope.countDown = function(timer){
          if(timer > 0){
            var count = timer;
            countdown = setInterval(function(){
                  
                  $('#countdown').html("Remaining time : "+count+ " seconds");
                  if(count == 0){
                        //window.location = "http://google.com";
                        $('#timer').hide();
                        $('#countdown').hide();
                        clearInterval(countdown);
                        
                        alert("Result is ready to view");
                  }
                  count--;
            },1000);
          }
      }
});

// investigate Controller
mobileApp.controller('investigateCtrl',
  function investigateCtrl($scope, $location){
      $scope.InvesB = function(){
        $location.path("design");
      }

      $scope.InvesN = function(){
        if($scope.Investxt1 == undefined){
          alert("Please fill out the empty fields");
        }else if($scope.Investxt2 == undefined){
          alert("Please fill out the empty fields");
        }else{
          var text1 = document.getElementById('invest1').value;
          var text2 = document.getElementById('invest2').value;
          //$('#I1').html(text1);
          //$('#I2').html(text2);
          localStorage.setItem('Investigate_txt1',text1);
          localStorage.setItem('Investigate_txt2',text2);
          $location.path("analyze");
        }
        //$('#Investigate1').html($scope.Investxt1);
        //$('#Investigate2').html($scope.Investxt2);
      }
      var getloading = localStorage.getItem('loading');
      if(getloading == "show"){
        document.getElementById("loading").style.display = "block";
      }else{
        document.getElementById("loading").style.display = "none";
      }

      $scope.onLoad = function(){
        var vest1 = localStorage.getItem('Investigate_txt1');
        var vest2 = localStorage.getItem('Investigate_txt2');
        $scope.Investxt1 = vest1;
        $scope.Investxt2 = vest2;
      }

      $scope.simulation = function(path){
        $location.path("simulation/"+path);
      }

      $scope.account = function(path){
        $location.path("account/"+path);
      }

      $scope.messages = function(path){
        $location.path("messages/"+path);
      }

      $scope.webcam = function(path){
        $location.path("webcam/"+path);
      }

      $scope.retrieveResult = function(div_id){
        /*var cid = $("#coupon_Id").text();
        var ckey = $("#coupon_Key").text();
        var expid = $('#exp_Id').text();*/

        var cid = localStorage.getItem('CouponID');
        var key = localStorage.getItem('PassKey');
        var expid = localStorage.getItem('ExpID');
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "http://ilabs.sesp.northwestern.edu/iLabServiceBroker/ilabServiceBroker.asmx", true);

        var data = '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">'+
                   '<soap12:Header>' +
                   '<sbAuthHeader xmlns="http://ilab.mit.edu">' +
                   '<couponID>'+cid+'</couponID>' +
                   '<couponPassKey>'+ckey+'</couponPassKey>' +
                   '</sbAuthHeader>' +
                   '</soap12:Header>' +
                   '<soap12:Body>' +
                   '<RetrieveResult xmlns="http://ilab.mit.edu">' +
                   '<experimentID>'+expid+'</experimentID>' +
                   '</RetrieveResult>' +
                   '</soap12:Body>' +
                   '</soap12:Envelope>'   

        xmlhttp.onreadystatechange = function(){
              if(xmlhttp.readyState == 4){
                  if(xmlhttp.status == 200){
                      xmlDoc = xmlhttp.responseXML;
                      Distances = $(xmlDoc).find("distance").text();
                      Duration = $(xmlDoc).find("duration").text();
                      Trial = $(xmlDoc).find("repeat").text();
                      alert(xmlhttp.responseText);
                      //$scope.popup(div_id);
                      
                  }
              }
        }
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(data);
      }
});

// analyze Controller
mobileApp.controller('analyzeCtrl',
  function analyzeCtrl($scope, $location){

      $scope.AB = function(){
        $('#timer').hide();
        $('#countdown').hide();
        $location.path("investigate");
        localStorage.setItem('loading','hide');
      }

      $scope.AN = function(){
        $location.path("interpret");
      }

      $scope.simulation = function(path){
        $location.path("simulation/"+path);
      }

      $scope.account = function(path){
        $location.path("account/"+path);
      }

      $scope.messages = function(path){
        $location.path("messages/"+path);
      }

      $scope.webcam = function(path){
        $location.path("webcam/"+path);
      }

      $scope.Graph = function(){
        /*var cid = $("#coupon_Id").text();
        var ckey = $("#coupon_Key").text();
        var expid = $('#exp_Id').text();*/

        var cid = localStorage.getItem('CouponID');
        var ckey = localStorage.getItem('PassKey');
        var expid = localStorage.getItem('ExpID');

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://ilabs.sesp.northwestern.edu/iLabServiceBroker/ilabServiceBroker.asmx', true);

        // Build SOAP request
        var data = '<?xml version="1.0" encoding="utf-8"?>' +
               '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">'+
               '<soap12:Header>' +
               '<sbAuthHeader xmlns="http://ilab.mit.edu">' +
               '<couponID>'+cid+'</couponID>' +
               '<couponPassKey>'+ckey+'</couponPassKey>' +
               '</sbAuthHeader>' +
               '</soap12:Header>' +
               '<soap12:Body>' +
               '<RetrieveResult xmlns="http://ilab.mit.edu">' +
               '<experimentID>'+expid+'</experimentID>' +
               '</RetrieveResult>' +
               '</soap12:Body>' +
               '</soap12:Envelope>'

        xmlhttp.onreadystatechange = function(){
                if(xmlhttp.readyState == 4){
                      if(xmlhttp.status == 200){
                            xmlDoc = xmlhttp.responseXML;
                            //alert(xmlhttp.responseText);
                            //var response = xmlToJson(xmlDoc);
                            result = $(xmlDoc).find("experimentResults").text();
                            /*var distance = $(result).find("dataVector")[0].getAttribute('distance');*/
                            vector1 = $(result).find("dataVector").length;
                            /*vecdata = $(result).find("dataVector").text();
                            var data = $(result).find("dataVector")[2];
                            var d2 = data.childNodes[0];
                            var d3 = d2.nodeValue;*/
                            //alert(vector1);
                            //txt = $(result).find("dataVector")[0].getAttributeNode('distance');
                            //var arr = array();
                            var dist_arr = new Array();
                            for(var k=0; k<vector1; k++){
                              var distance = $(result).find("dataVector")[k].getAttribute('distance');
                              dist_arr[k] = distance;
                            }

                            $("#graph").highcharts({
                                   chart: {
                                      type: 'line',
                                      backgroundColor: '#FCFFC5',
                                      height: 400,
                                      width: 290
                                    },
                                    title: {
                                      text: "Radioactivity"
                                    },
                                    
                                    xAxis: {
                                      categories: dist_arr,
                                      title: {
                                        text: 'Distances( mm)'
                                      }
                                    },
                                    yAxis: {
                                      title: {
                                        text: 'Radioactivity Intensity( Particle Counts)'
                                      }
                                    },
                                    series: []
                          });

                          var value = new Array(); var tr1 = new Array(); var tr2 = new Array(); var data = new Array();var tr3 = new Array();var tr4 = new Array();
                          var tr5 = new Array();var tr6 = new Array();var tr7 = new Array();var tr8 = new Array();var tr9 = new Array();var tr10 = new Array();
                          var chart = $('#graph').highcharts();
                          for(var i=0; i < vector1; i++){
                                  var distance = $(result).find("dataVector")[i].getAttribute('distance');
                                  var d11 = $(result).find("dataVector")[i];
                                  var d2 = d11.childNodes[0];
                                  var d3 = d2.nodeValue;
                                  value[i] = d3;
                                  var split = value[i].split(",");
                                  var length = split.length;
                                  
                                  switch(length){
                                    case 1:
                                            tr1[i] = parseInt(split[0]);
                                            break;
                                    case 2:
                                            tr1[i] = parseInt(split[0]);tr2[i] = parseInt(split[1]);
                                            break;
                                    case 3:
                                            tr1[i] = parseInt(split[0]);tr2[i] = parseInt(split[1]);tr3[i] = parseInt(split[2]);
                                            break;
                                    case 4:
                                            tr1[i] = parseInt(split[0]);tr2[i] = parseInt(split[1]);tr3[i] = parseInt(split[2]);
                                            tr4[i] = parseInt(split[3]);
                                            break;
                                    case 5:
                                            tr1[i] = parseInt(split[0]);tr2[i] = parseInt(split[1]);tr3[i] = parseInt(split[2]);
                                            tr4[i] = parseInt(split[3]);tr5[i] = parseInt(split[4]);
                                            break;
                                    case 6:
                                            tr1[i] = parseInt(split[0]);tr2[i] = parseInt(split[1]);tr3[i] = parseInt(split[2]);
                                            tr4[i] = parseInt(split[3]);tr5[i] = parseInt(split[4]);tr6[i] = parseInt(split[5]);
                                            break;
                                    case 7:
                                            tr1[i] = parseInt(split[0]);tr2[i] = parseInt(split[1]);tr3[i] = parseInt(split[2]);
                                            tr4[i] = parseInt(split[3]);tr5[i] = parseInt(split[4]);tr6[i] = parseInt(split[5]);
                                            tr7[i] = parseInt(split[6]);
                                            break;
                                    case 8:
                                            tr1[i] = parseInt(split[0]);tr2[i] = parseInt(split[1]);tr3[i] = parseInt(split[2]);
                                            tr4[i] = parseInt(split[3]);tr5[i] = parseInt(split[4]);tr6[i] = parseInt(split[5]);
                                            tr7[i] = parseInt(split[6]);tr8[i] = parseInt(split[7]);
                                            break;
                                    case 9:
                                            tr1[i] = parseInt(split[0]);tr2[i] = parseInt(split[1]);tr3[i] = parseInt(split[2]);
                                            tr4[i] = parseInt(split[3]);tr5[i] = parseInt(split[4]);tr6[i] = parseInt(split[5]);
                                            tr7[i] = parseInt(split[6]);tr8[i] = parseInt(split[7]);tr9[i] = parseInt(split[8]);
                                            break;
                                    case 10:
                                            tr1[i] = parseInt(split[0]);tr2[i] = parseInt(split[1]);tr3[i] = parseInt(split[2]);
                                            tr4[i] = parseInt(split[3]);tr5[i] = parseInt(split[4]);tr6[i] = parseInt(split[5]);
                                            tr7[i] = parseInt(split[6]);tr8[i] = parseInt(split[7]);tr9[i] = parseInt(split[8]);
                                            tr10[i] = parseInt(split[9]);
                                            break;

                                    }
                                  
                              }
                                
                              var chart = $('#graph').highcharts();
                              switch(length){
                                    case 1: 
                                    var combine = new Array(tr1);
                                    chart.addSeries({
                                                      name: "Trial1",
                                                      data: combine[0]
                                                      
                                                    });

                                    var trials = tr1[0]+","+tr1[1];
                                    //$("#trials").html(trials);
                                    localStorage.setItem('Trials', trials);
                                    
                                    break;
                                    case 2:
                                    var combine = new Array(tr1,tr2);
                                    for(var j=0; j<combine.length;j++){
                                      chart.addSeries({
                                                      name: "Trial"+(j+1),
                                                      data: combine[j]
                                                      
                                                    });
                                    }
                                    var trials = combine[0]+";"+combine[1];
                                    //$("#trials").html(trials);
                                    localStorage.setItem('Trials', trials);
                                    break;
                                    case 3:
                                    var combine = new Array(tr1,tr2,tr3);
                                    for(var j=0; j<combine.length;j++){
                                      chart.addSeries({
                                                      name: "Trial"+(j+1),
                                                      data: combine[j]
                                                      
                                                    });
                                    }
                                    var trials = combine[0]+";"+combine[1]+";"+combine[2];
                                    //$("#trials").html(trials);
                                    localStorage.setItem('Trials', trials);
                                    break;
                                    case 4:
                                    var combine = new Array(tr1,tr2,tr3,tr4);
                                    for(var j=0; j<combine.length;j++){
                                      chart.addSeries({
                                                      name: "Trial"+(j+1),
                                                      data: combine[j]
                                                      
                                                    });
                                    }
                                    var trials = combine[0]+";"+combine[1]+";"+combine[2]+";"+combine[3];
                                    //$("#trials").html(trials);
                                    localStorage.setItem('Trials', trials);
                                    break;
                                    case 5:
                                    var combine = new Array(tr1,tr2,tr3,tr4,tr5);
                                    for(var j=0; j<combine.length;j++){
                                      chart.addSeries({
                                                      name: "Trial"+(j+1),
                                                      data: combine[j]
                                                      
                                                    });
                                    }
                                    var trials = combine[0]+";"+combine[1]+";"+combine[2]+";"+combine[3]+";"+combine[4];
                                    //$("#trials").html(trials);
                                    localStorage.setItem('Trials', trials);
                                    break;
                                    case 6:
                                    var combine = new Array(tr1,tr2,tr3,tr4,tr5,tr6);
                                    for(var j=0; j<combine.length;j++){
                                      chart.addSeries({
                                                      name: "Trial"+(j+1),
                                                      data: combine[j]
                                                      
                                                    });
                                    }
                                    var trials = combine[0]+";"+combine[1]+";"+combine[2]+";"+combine[3]+";"+combine[4]+";"+combine[5];
                                    //$("#trials").html(trials);
                                    localStorage.setItem('Trials', trials);
                                    break;
                                    case 7:
                                    var combine = new Array(tr1,tr2,tr3,tr4,tr5,tr6,tr7);
                                    for(var j=0; j<combine.length;j++){
                                      chart.addSeries({
                                                      name: "Trial"+(j+1),
                                                      data: combine[j]
                                                      
                                                    });
                                    }
                                    var trials = combine[0]+";"+combine[1]+";"+combine[2]+";"+combine[3]+";"+combine[4]+";"+combine[5]+";"+combine[6];
                                    //$("#trials").html(trials);
                                    localStorage.setItem('Trials', trials);
                                    break;
                                    case 8:
                                    var combine = new Array(tr1,tr2,tr3,tr4,tr5,tr6,tr7,tr8);
                                    for(var j=0; j<combine.length;j++){
                                      chart.addSeries({
                                                      name: "Trial"+(j+1),
                                                      data: combine[j]
                                                      
                                                    });
                                    }
                                    var trials = combine[0]+";"+combine[1]+";"+combine[2]+";"+combine[3]+";"+combine[4]+";"+combine[5]+";"+combine[6]+";"+combine[7];
                                    //$("#trials").html(trials);
                                    localStorage.setItem('Trials', trials);
                                    break;
                                    case 9:
                                    var combine = new Array(tr1,tr2,tr3,tr4,tr5,tr6,tr7,tr8,tr9);
                                    for(var j=0; j<combine.length;j++){
                                      chart.addSeries({
                                                      name: "Trial"+(j+1),
                                                      data: combine[j]
                                                      
                                                    });
                                    }
                                    var trials = combine[0]+";"+combine[1]+";"+combine[2]+";"+combine[3]+";"+combine[4]+";"+combine[5]+";"+combine[6]+";"+combine[7]+";"+combine[8];
                                    //$("#trials").html(trials);
                                    localStorage.setItem('Trials', trials);
                                    break;
                                    case 10:
                                    var combine = new Array(tr1,tr2,tr3,tr4,tr5,tr6,tr7,tr8,tr9,tr10);
                                    for(var j=0; j<combine.length;j++){
                                      chart.addSeries({
                                                      name: "Trial"+(j+1),
                                                      data: combine[j]
                                                      
                                                    });
                                    }
                                    var trials = combine[0]+";"+combine[1]+";"+combine[2]+";"+combine[3]+";"+combine[4]+";"+combine[5]+";"+combine[6]+";"+combine[7]+";"+combine[8]+";"+combine[9];
                                    //$("#trials").html(trials);
                                    localStorage.setItem('Trials', trials);
                                    break;
                              }
                              //Chart Functionalities
                              var chart = $('#graph').highcharts();
                              $('#buttonExport').click(function() {
                                  var e = document.getElementById("ExportOption");
                                  var ExportAs = e.options[e.selectedIndex].value;   
                                  
                                  if(ExportAs == 'PNG')
                                  {
                                      chart.exportChart({type: 'image/png', filename: 'my-png'}, {subtitle: {text:''}});
                                  }
                                  if(ExportAs == 'JPEG')
                                  {
                                      chart.exportChart({type: 'image/jpeg', filename: 'my-jpg'}, {subtitle: {text:''}});
                                  }
                                  if(ExportAs == 'PDF')
                                  {
                                      chart.exportChart({type: 'application/pdf', filename: 'my-pdf'}, {subtitle: {text:''}});
                                  }
                                  if(ExportAs == 'SVG')
                                  {
                                      chart.exportChart({type: 'image/svg+xml', filename: 'my-svg'}, {subtitle: {text:''}});
                                  }
                              }); 

                              $('#buttonPrint').click(function() {
                                  chart.setTitle(null, { text: ' ' });
                                  chart.print();
                                  chart.setTitle(null, { text: 'Click and drag in the plot area to zoom in' });
                              });

                              canvg(document.getElementById('canvas'), chart.getSVG())
                              var canvas = document.getElementById("canvas");
                              var img = canvas.toDataURL("image/jpeg");
                              //document.write('<img src="'+img+'"/>');
                              localStorage.setItem('Data_URI',img);
                              //$('#data_URI').html(img);

                      }else{
                              alert("Error: " + xmlhttp.status + ":" + xmlhttp.responseText);
                        }
                }
        }
        // Send the POST request
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send(data);
      }
});

// interpret Controller
mobileApp.controller('interpretCtrl',
  function interpretCtrl($scope, $location){

      $scope.InterB = function(){
        $location.path("analyze");
      }

      $scope.onLoad = function(){
        var inter1 = localStorage.getItem('Interpret_txt1');
        var inter2 = localStorage.getItem('Interpret_txt2');
        $scope.Intertxt1 = inter1;
        $scope.Intertxt2 = inter2;
      }

      $scope.simulation = function(path){
        $location.path("simulation/"+path);
      }

      $scope.account = function(path){
        $location.path("account/"+path);
      }

      $scope.messages = function(path){
        $location.path("messages/"+path);
      }

      $scope.webcam = function(path){
        $location.path("webcam/"+path);
      }

      $scope.createpdf = function(){
        /*Downloadify.create('downloadify',{
          filename: 'iLab.pdf',
          data:  function(){*/
        // You'll need to make your image into a Data URL
        // Use http://dataurl.net/#dataurlmaker
        var text1 = document.getElementById('inter1').value;
        var text2 = document.getElementById('inter2').value;
        //$('#IF1').html(text1);
        //$('#IF2').html(text2);
        localStorage.setItem('Interpret_txt1',text1);
        localStorage.setItem('Interpret_txt2',text2);

        /*var imgData = $('#data_URI').text();
        var Ques1 = $('#Q1').text();
        var Des1 = $('#D1').text();
        var Invest1 = $('#I1').text();
        var Invest2 = $('#I2').text();
        var Inter1 = $('#IF1').text();
        var Inter2 = $('#IF2').text();
        var runtime = $('#runtime').text();
        var expId = $('#exp_Id').text();
        var distances = $("#distances").text();
        var duration = $("#duration").text();
        var repeat = $("#repeat").text();*/
        var imgData = localStorage.getItem('Data_URI');
        var Ques1 = localStorage.getItem('Question1');
        var Des1 = localStorage.getItem('Design1');
        var Invest1 = localStorage.getItem('Investigate_txt1');
        var Invest2 = localStorage.getItem('Investigate_txt2');
        var Inter1 = localStorage.getItem('Interpret_txt1');
        var Inter2 = localStorage.getItem('Interpret_txt2');
        var runtime = localStorage.getItem('RunTime');
        var expId = localStorage.getItem('ExpID');
        var distances = localStorage.getItem('Distances');
        var duration = localStorage.getItem('Duration');
        var repeat = localStorage.getItem('Repeat');
        //var trials = $("#trials").text();
        var trials = localStorage.getItem('Trials');
        var split = trials.split(";");
        var length = split.length;
        var trial_nos = length.toString();
        var jpegBase64Data = imgData.split(',')[1];
        var jpegBinary = atob(jpegBase64Data);
        var doc = new jsPDF();


        doc.setFontSize(40);
        doc.text(60, 20, 'Radioactivity');
        doc.setFontSize(20);
        doc.text(20, 40, 'Step1: Research');
        doc.setFontSize(20);
        doc.text(20, 60, 'Step2: Question');
        doc.setFontSize(16);
        doc.text(20,70,'Q: What are you trying to find out in this lab? What question are you trying ');
        doc.text(27,77,'to answer? This question is called your research question, which guides ');
        doc.text(27,84,'your experimental design in the next step. Write your research question ');
        doc.text(27,91,'below.');
        doc.text(20,100,'A: '+Ques1);
        doc.setFontSize(20);
        doc.text(20, 110, 'Step3: Design');
        doc.setFontSize(16)
        doc.text(20,120,'Q: Why did you choose these distances, measurement time, and number of ');
        doc.text(27,127,'trials?');
        doc.text(20,136,'A: '+Des1);
        doc.setFontSize(20);
        doc.text(20, 146, 'Step4: Investigate');
        doc.setFontSize(16);
        doc.text(20,156,'Q: What do you predict will happen in this experiment? What do you think ');
        doc.text(27,163,'you will see in your results?');
        doc.text(20,172,'A: '+Invest1);
        doc.text(20,182,'Q: What are your initial observations about your results?');
        doc.text(20,191,'A: '+Invest2);
        doc.setFontSize(20);
        doc.text(20, 201, 'Step5: Analyze');

        doc.addPage();
        doc.addImage(jpegBinary,'JPEG',20,20,150,150);
        doc.setFontSize(20);
        doc.text(20, 190, 'Step6: Interpret');
        doc.setFontSize(16);
        doc.text(20,200,'Q: What type of relationship exists between radiation and distance? Is it ');
        doc.text(20,207,'linear or non-linear, positive or negative? How do you know?');
        doc.text(20,216,'A: '+Inter1);
        doc.text(20,226,'Q: Does the data you collected give you a definite answer to your research ');
        doc.text(27,233,'question? Why or why not? If not, how would you change your ');
        doc.text(27,240,'experimental design to better investigate your research question?');
        doc.text(20,249,'A: '+Inter2);

        doc.addPage();
        doc.setFontSize(20);
        doc.text(20,20,'Experiment Specification:');
        doc.setFontSize(16);
        doc.text(20,30,'Experiment ID:'+expId);
        doc.text(20,37,'Estimated Experiment Run Time: '+runtime+' seconds');
        doc.setFontSize(20);
        doc.text(20,47,'Setup:');
        doc.setFontSize(16);
        doc.text(20,57,'Distances (mm): '+distances);
        doc.text(20,64,'Measurement Time (s): '+duration);
        doc.text(20,71,'Number of Trials: '+repeat);
        doc.setFontSize(20);
        doc.text(20,81,'Results:');
        doc.setFontSize(16);
        doc.text(20,91,'Distances (mm): '+distances);

        switch(length){
                  case 1:
                  doc.text(20,97,'Trial1: '+split[0]);
                  break;
                  case 2:
                  doc.text(20,97,'Trial1: '+split[0]);doc.text(20,104,'Trial2: '+split[1]);
                  break;
                  case 3:
                  doc.text(20,97,'Trial1: '+split[0]);doc.text(20,104,'Trial2: '+split[1]);doc.text(20,111,'Trial3: '+split[2]);
                  break;
                  case 4:
                  doc.text(20,97,'Trial1: '+split[0]);doc.text(20,104,'Trial2: '+split[1]);doc.text(20,111,'Trial3: '+split[2]);
                  doc.text(20,118,'Trial4: '+split[3]);
                  break;
                  case 5:
                  doc.text(20,97,'Trial1: '+split[0]);doc.text(20,104,'Trial2: '+split[1]);doc.text(20,111,'Trial3: '+split[2]);
                  doc.text(20,118,'Trial4: '+split[3]);doc.text(20,125,'Trial5: '+split[4]);
                  break;
                  case 6:
                  doc.text(20,97,'Trial1: '+split[0]);doc.text(20,104,'Trial2: '+split[1]);doc.text(20,111,'Trial3: '+split[2]);
                  doc.text(20,118,'Trial4: '+split[3]);doc.text(20,125,'Trial5: '+split[4]);doc.text(20,132,'Trial6: '+split[5]);
                  break;
                  case 7:
                  doc.text(20,97,'Trial1: '+split[0]);doc.text(20,104,'Trial2: '+split[1]);doc.text(20,111,'Trial3: '+split[2]);
                  doc.text(20,118,'Trial4: '+split[3]);doc.text(20,125,'Trial5: '+split[4]);doc.text(20,132,'Trial6: '+split[5]);
                  doc.text(20,139,'Trial7: '+split[6]);
                  break;
                  case 8:
                  doc.text(20,97,'Trial1: '+split[0]);doc.text(20,104,'Trial2: '+split[1]);doc.text(20,111,'Trial3: '+split[2]);
                  doc.text(20,118,'Trial4: '+split[3]);doc.text(20,125,'Trial5: '+split[4]);doc.text(20,132,'Trial6: '+split[5]);
                  doc.text(20,139,'Trial7: '+split[6]);doc.text(20,146,'Trial8: '+split[7]);
                  break;
                  case 9:
                  doc.text(20,97,'Trial1: '+split[0]);doc.text(20,104,'Trial2: '+split[1]);doc.text(20,111,'Trial3: '+split[2]);
                  doc.text(20,118,'Trial4: '+split[3]);doc.text(20,125,'Trial5: '+split[4]);doc.text(20,132,'Trial6: '+split[5]);
                  doc.text(20,139,'Trial7: '+split[6]);doc.text(20,146,'Trial8: '+split[7]);doc.text(20,153,'Trial9: '+split[8]);
                  break;
                  case 10:
                  doc.text(20,97,'Trial1: '+split[0]);doc.text(20,104,'Trial2: '+split[1]);doc.text(20,111,'Trial3: '+split[2]);
                  doc.text(20,118,'Trial4: '+split[3]);doc.text(20,125,'Trial5: '+split[4]);doc.text(20,132,'Trial6: '+split[5]);
                  doc.text(20,139,'Trial7: '+split[6]);doc.text(20,146,'Trial8: '+split[7]);doc.text(20,153,'Trial9: '+split[8]);
                  doc.text(20,160,'Trial10: '+split[9]);
                  break;
        }

        // Output as Data URI
        doc.output('datauri');
        /*          },
        onComplete: function(){ alert('Your File Has Been Saved!'); },
              onCancel: function(){ alert('You have cancelled the saving of this file.'); },
              onError: function(){ alert('You must put something in the File Contents or there will be nothing to save!'); },
              downloadImage: './img/download_red.png',
              swf: './img/downloadify.swf',
              width: 100,
              height: 30,
              transparent: true,
              append: false
                })*/
      }

      $scope.Exitlab = function(){
          if($scope.Intertxt1 == undefined){
            alert("Please fill out the empty fields");
          }else if($scope.Intertxt2 == undefined){
            alert("Please fill out the empty fields");
          }else{

            sessionStorage.setItem("loggedIn", "false");
            //var url = "http://ilabcentral.org/radioactivity/";    
            //$(location).attr('href',url);
            var text1 = document.getElementById('inter1').value;
            var text2 = document.getElementById('inter2').value;
            //$('#IF1').html(text1);
            //$('#IF2').html(text2);
            localStorage.setItem('CouponID', '');
            localStorage.setItem('PassKey', '');
            localStorage.setItem('Distances', '');
            localStorage.setItem('Duration', '');
            localStorage.setItem('Repeat', '');
            localStorage.setItem('ExpID', '');
            localStorage.setItem('RunTime', '');
            localStorage.setItem('Trials', '');
            localStorage.setItem('Question1', '');
            localStorage.setItem('Design1', '');
            localStorage.setItem('Investigate_txt1', '');
            localStorage.setItem('Investigate_txt2', '');
            localStorage.setItem('Interpret_txt1', '');
            localStorage.setItem('Interpret_txt2', '');
            localStorage.setItem('Data_URI', '');

            $location.path("mygroups");
          }
      }
});

//simulation Controller
mobileApp.controller('simCtrl',
  function simCtrl($scope, $location){

     $scope.navigate_back = function(div_id){
        var url = $('#'+div_id).text();
        var value = url.substring(url.lastIndexOf('/') + 1);
        //alert(url);
        $location.path(value);
      }
});

//wecam Controller
mobileApp.controller('webCtrl',
  function simCtrl($scope, $location){

     $scope.navigate_back = function(div_id){
        var url = $('#'+div_id).text();
        var value = url.substring(url.lastIndexOf('/') + 1);
        //alert(value);
        $location.path(value);
      }
});

//message Controller
mobileApp.controller('msgCtrl',
  function simCtrl($scope, $location){

     $scope.navigate_back = function(div_id){
        var url = $('#'+div_id).text();
        var value = url.substring(url.lastIndexOf('/') + 1);
        //alert(value);
        $location.path(value);
      }
});

//account Controller
mobileApp.controller('accCtrl',
  function simCtrl($scope, $location){

     $scope.navigate_back = function(div_id){
        var url = $('#'+div_id).text();
        var value = url.substring(url.lastIndexOf('/') + 1);
        //alert(value);
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
