/* Controllers */

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
            var params = "username=rasmiroy&password=Pichuaug18";
            //var params = "username="+username+"&password="+password;
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
                      $('#coupon_Id').html(data['couponId']);
                      $('#coupon_Key').html(data['passKey']);
                      //$location.path("#/home").replace();
                      $location.path("home");
                      $scope.foobar = true;
                    });
                    

                  },
                  error: function() { 
                    alert('Error');
                  }
            }).done(function () {
              $('#waiting').hide();
            });
        }

    $scope.open = function () {
    $scope.shouldBeOpen = true;
  };

  $scope.close = function () {
    $scope.closeMsg = 'I was closed at: ' + new Date();
    $scope.shouldBeOpen = false;
  };

  $scope.items = ['item1', 'item2'];

  $scope.opts = {
    backdropFade: true,
    dialogFade:true
  };

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

       $scope.htmlTooltip1 = "The distances from the Strontium-90 source that the Geiger counter will measure radiation. For example, you could enter: 15, 45, 60. The minimum distance is 15mm, and the maximum is 90mm.";
       $scope.htmlTooltip2 = "The number of seconds that each measurement of radiation will last, at each of the distance you chose above";
       $scope.htmlTooltip3 = "The number of times you wish for the experiment to repeat, according to the values you set for the previous variables";

       
  });

// research Controller
mobileApp.controller('researchCtrl',
  function groupCtrl($scope, $location){
      $scope.RB = function(){
        $location.path("partial1");
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
          $location.path("design");
        }
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
      $scope.DB = function(){
        $location.path("question");
      }

      $scope.DN = function(){
        
        var cid = $("#coupon_Id").text();
        var ckey = $("#coupon_Key").text();
        var distances = $scope.distances;
        var times = $scope.m_times;
        var trials = $scope.nof_trials;
        $scope.submitDesign(cid, ckey, distances, times, trials);
        if($scope.Dtxt == undefined){
          alert("Please fill out the empty fields");
        }else{
          $location.path("investigate");
        }
        
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
        //document.getElementById("countdown").style.display = "none";
        display_timer = "Calculating......";
        $("#timer").html(display_timer);
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
//alert(data);
                   xmlhttp.onreadystatechange = function(){
                        if(xmlhttp.readyState ==4){
                              if (xmlhttp.status == 200){
                                  var xmlDoc = xmlhttp.responseXML;
                                  //alert(xmlhttp.responseText);
                                  
                                  runtime = $(xmlDoc).find("estRuntime").text();
                                  timer = parseInt(runtime) + parseInt(10);
                                  //timer = timer + 5;
                                  if(timer > 0){
                                  display_timer = "Your result will be available in "+timer+"seconds!!!";
                                  $("#timer").html(display_timer);
                                  }else{
                                  display_timer = "";
                                  $("#timer").html(display_timer);
                                  }
                                  $scope.countDown(timer);
                                  //$('#timer').text(display_timer);
                                  experimentID = $(xmlDoc).find("experimentID").text();
                                  $('#exp_Id').html(experimentID);
                                  $('#distances').html(distances);
                                  $('#duration').html(duration);
                                  $('#repeat').html(repeat);

                                  //alert(experimentID);
                                  
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
              /*if(count == -2){
                $scope.storeResultlocal();
              }*/
              count--;
        },1000);
      }

      };


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
          $location.path("analyze");
        }
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
        var cid = $("#coupon_Id").text();
        var ckey = $("#coupon_Key").text();
        var expid = $('#exp_Id').text();
        //alert(expid);
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

      };

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
        var cid = $("#coupon_Id").text();
        var ckey = $("#coupon_Key").text();
        var expid = $('#exp_Id').text();

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
//alert(data);
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
          //alert(dist_arr);

          $("#graph").highcharts({
                       chart: {
                          type: 'line',
                          backgroundColor: '#FCFFC5'
                        },
                        title: {
                          text: "Radioactivity"
                        },
                        
                        xAxis: {
                          //categories: ['45','65','75'],
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
                                
//alert(tr1 +" ; "+ tr2+"="+length);
var chart = $('#graph').highcharts();
switch(length){
  case 1: 
  var combine = new Array(tr1);
  chart.addSeries({
                    name: "Trial1",
                    data: combine[0]
                    
                  });
  
  break;
  case 2:
  var combine = new Array(tr1,tr2);
  for(var j=0; j<combine.length;j++){
    chart.addSeries({
                    name: "Trial"+(j+1),
                    data: combine[j]
                    
                  });
  }
  break;
  case 3:
  var combine = new Array(tr1,tr2,tr3);
  for(var j=0; j<combine.length;j++){
    chart.addSeries({
                    name: "Trial"+(j+1),
                    data: combine[j]
                    
                  });
  }
  break;
  case 4:
  var combine = new Array(tr1,tr2,tr3,tr4);
  for(var j=0; j<combine.length;j++){
    chart.addSeries({
                    name: "Trial"+(j+1),
                    data: combine[j]
                    
                  });
  }
  break;
  case 5:
  var combine = new Array(tr1,tr2,tr3,tr4,tr5);
  for(var j=0; j<combine.length;j++){
    chart.addSeries({
                    name: "Trial"+(j+1),
                    data: combine[j]
                    
                  });
  }
  break;
  case 6:
  var combine = new Array(tr1,tr2,tr3,tr4,tr5,tr6);
  for(var j=0; j<combine.length;j++){
    chart.addSeries({
                    name: "Trial"+(j+1),
                    data: combine[j]
                    
                  });
  }
  break;
  case 7:
  var combine = new Array(tr1,tr2,tr3,tr4,tr5,tr6,tr7);
  for(var j=0; j<combine.length;j++){
    chart.addSeries({
                    name: "Trial"+(j+1),
                    data: combine[j]
                    
                  });
  }
  break;
  case 8:
  var combine = new Array(tr1,tr2,tr3,tr4,tr5,tr6,tr7,tr8);
  for(var j=0; j<combine.length;j++){
    chart.addSeries({
                    name: "Trial"+(j+1),
                    data: combine[j]
                    
                  });
  }
  break;
  case 9:
  var combine = new Array(tr1,tr2,tr3,tr4,tr5,tr6,tr7,tr8,tr9);
  for(var j=0; j<combine.length;j++){
    chart.addSeries({
                    name: "Trial"+(j+1),
                    data: combine[j]
                    
                  });
  }
  break;
  case 10:
  var combine = new Array(tr1,tr2,tr3,tr4,tr5,tr6,tr7,tr8,tr9,tr10);
  for(var j=0; j<combine.length;j++){
    chart.addSeries({
                    name: "Trial"+(j+1),
                    data: combine[j]
                    
                  });
  }
  break;
}

        }else{
           alert("Error: " + xmlhttp.status + ":" + xmlhttp.responseText);
        }
      }
    }

    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(data);
  
      };
      

  });

// interpret Controller
mobileApp.controller('interpretCtrl',
  function interpretCtrl($scope, $location){
       $scope.InterB = function(){
        $location.path("analyze");
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

      $scope.Exitlab = function(){
        
        if($scope.Intertxt1 == undefined){
          alert("Please fill out the empty fields");
        }else if($scope.Intertxt2 == undefined){
          alert("Please fill out the empty fields");
        }else{
          var url = "http://ilabcentral.org/radioactivity/";    
          $(location).attr('href',url);
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

/* Controllers */
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

}
