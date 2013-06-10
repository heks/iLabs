
/* Controllers */
function appController($scope, $location){

      $scope.submit = function(){
       $location.path("partial1");
       $scope.foobar = true;
      };

      $scope.open = function () {
    	 $scope.shouldBeOpen = true;
       //alert("hello");
  	  };

  	  $scope.close = function () {
    	 $scope.closeMsg = 'I was closed at: ' + new Date();
    	 $scope.shouldBeOpen = false;
      };

      $scope.closegraph = function () {
       $scope.graphdiv = true;
       $("#toPopup").fadeOut("normal");
       $("#backgroundPopup").fadeOut("normal");
      };

      $scope.deleteGraph = function () {
       $scope.maingraph = true;
      };

      $scope.addGraph = function () {
       $scope.maingraph = false;
      };

      var count = 0;
      $scope.duplicate = function(){
        
        //$('#duplicater').clone().insertAfter("#duplicater");
        var clonedDiv = $('#duplicater').clone();
        
        count++;
        clonedDiv.attr("id", "dup"+count);
        clonedDiv.attr("ng-hide", "maingraph"+count);
        $('#duplicater').after(clonedDiv);

      }

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

      $scope.startP = function () {
    	 $scope.shouldBeOpenP = false;
    	 $location.path("partial4");
      };

      $scope.RB = function(){
        $location.path("partial1");
      }

      $scope.RN = function(){
        $location.path("question");
      }

      $scope.QB = function(){
        $location.path("research");
      }

      $scope.QN = function(){
        $location.path("design");
      }

      $scope.DB = function(){
        $location.path("question");
      }

      $scope.DN = function(){
        $location.path("investigate");
        //alert($scope.distance);
      }

      $scope.InvesB = function(){
        $location.path("design");
      }

      $scope.InvesN = function(){
        $location.path("analyze");
      }

      $scope.AB = function(){
        $location.path("investigate");
      };

      $scope.AN = function(){
        $location.path("interpret");
      }

      $scope.InterB = function(){
        $location.path("analyze");
      }

      $scope.Exitlab = function(){
        //$location.path("http://ilabcentral.org/radioactivity/");
        //$location.replace();
        var url = "http://ilabcentral.org/radioactivity/";    
        $(location).attr('href',url);
      }

      $scope.insert = function(){
        //alert($scope.name);
        var t = $scope.name;
        $scope.title = t;
        $scope.drawGraph('g1', t);
        $scope.drawGraph('g2', t);
        
      }
      $scope.drawGraph = function(n, t){
        var n; var t;
        if(n == 'g1'){
          var div = "#"+n;
        }
        if(n == 'g2'){
          var div = "#"+n;
        }
        //alert(div);
              $(div).highcharts({
                        chart: {
                          type: 'line',
                          backgroundColor: '#FCFFC5'
                        },
                        title: {
                          text: t
                        },
                        
                        xAxis: {
                          categories: ['20','25','30'],
                          title: {
                            text: 'Distances( mm)'
                          }
                        },
                        yAxis: {
                          title: {
                            text: 'Radioactivity Intensity( Particle Counts)'
                          }
                        },
                        series: [
                              {
                                name: 'Trial1( prticle counts)',
                                data: [110, 89, 86]
                              },
                              {
                                name: 'Trial2( particle counts)',
                                data: [133, 78, 73]
                              }
                            ]
                      });
        
      };
      
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

      $scope.simulation = function(){
        $location.path("simulation");
      }
      $scope.account = function(){
        $location.path("account");
      }
      $scope.messages = function(){
        $location.path("messages");
      }
      
      $scope.edit = function () {
        $scope.hidediv = true;
        $scope.shouldBeOpen = true;
            
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

       $scope.qtns = [
        {"question": "How does this lab work?"},{"question": "What is radiation?"},
        {"question": "What is radioactivity, or radioactive decay?"},{"question": "How is radioactivity measured?"},
        {"question": "What is Strontium-90?"}

       ];

       $scope.random = function() {
                        //var value = Math.floor((Math.random()*100)+1);
                        var value = 100;
                        var type;

                        if (value < 25) {
                              type = 'success';
                        } else if (value < 50) {
                              type = 'info';
                        } else if (value < 75) {
                              type = 'warning';
                        } else {
                              type = 'danger';
                        }


        //$scope.dynamic = value;
        $scope.dynamicObject = {
                  value: value,
                  type: type
        };
  };

       $scope.graph = function(){

                 jQuery(function($) {

  $("a.topopup").click(function() {
      loading(); // loading
      loadPopup();
      /*setTimeout(function(){ // then show popup, deley in .5 second
        loadPopup(); // function show popup
      }, 500); // .5 second*/
  return false;
  });

  /* event for close the popup */
  $("div.close").hover(
          function() {
            $('span.ecs_tooltip').show();
          },
          function () {
              $('span.ecs_tooltip').hide();
            }
        );

  $("div.close").click(function() {
    disablePopup();  // function close pop up
  });

  $(this).keyup(function(event) {
    if (event.which == 27) { // 27 is 'Ecs' in the keyboard
      disablePopup();  // function close pop up
    }
  });

        $("div#backgroundPopup").click(function() {
    disablePopup();  // function close pop up
  });

  $('a.livebox').click(function() {
    alert('Hello World!');
  return false;
  });

   /************** start: functions. **************/
  function loading() {
    $("div.loader").show();
  }
  function closeloading() {
    $("div.loader").fadeOut('normal');
  }

  var popupStatus = 0; // set value

  function loadPopup() {
    if(popupStatus == 0) { // if value is 0, show popup
      closeloading(); // fadeout loading
      $("#toPopup").fadeIn(0500); // fadein popup div
      $("#backgroundPopup").css("opacity", "0.7"); // css opacity, supports IE7, IE8
      $("#backgroundPopup").fadeIn(0001);
      popupStatus = 1; // and set value to 1
    }
  }

  function disablePopup() {
    if(popupStatus == 1) { // if value is 1, close popup
      $("#toPopup").fadeOut("normal");
      $("#backgroundPopup").fadeOut("normal");
      popupStatus = 0;  // and set value to 0
    }
  }
  /************** end: functions. **************/
}); // jQuery End
       }


       $scope.design = function(){

          /*var item = $scope.design.dist;
          var value = item.split(',');*/
          
          var xmlhttp = new XMLHttpRequest();
          xmlhttp.open('POST', 'http://ilabs.sesp.northwestern.edu/iLabServiceBroker/ilabServiceBroker.asmx', true);

          // Build SOAP request
          var data =        '<?xml version="1.0" encoding="utf-8"?>' +
                            '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">' +
                            '<soap12:Header>' +
                            '<sbAuthHeader xmlns="http://ilab.mit.edu">' +
                            '<couponID>130684</couponID>' +
                            '<couponPassKey>861527620284598</couponPassKey>' +
                            '</sbAuthHeader>' +
                            '</soap12:Header>' +
                            '<soap12:Body>' +
                            '<Submit xmlns="http://ilab.mit.edu">' +
                            '<labServerID>9164ebd6edfd46f2b09dd7175af45ad8</labServerID>' +
                            '<experimentSpecification>&lt;experimentSpecification&gt; &lt;setupId&gt;RadioactivityVsDistance&lt;/setupId&gt; &lt;setupName&gt;Radioactivity versus Distance&lt;/setupName&gt; &lt;sourceName&gt;Strontium-90&lt;/sourceName&gt; &lt;absorberName&gt;None&lt;/absorberName&gt; &lt;distance&gt;20, 25, 30&lt;/distance&gt; &lt;duration&gt;2&lt;/duration&gt; &lt;repeat&gt;2&lt;/repeat&gt; &lt;/experimentSpecification&gt;</experimentSpecification>' +
                            '<priorityHint>0</priorityHint>' +
                            '<emailNotification>false</emailNotification>' +
                            '</Submit>' +
                            '</soap12:Body>' +
                            '</soap12:Envelope>'

          xmlhttp.onreadystatechange = function(){
              if(xmlhttp.readyState == 4){

                if(xmlhttp.status == 200){
                    xmlDoc = xmlhttp.responseXML;
                    alert(xmlhttp.responseText);
                    /*var response = xmlToJson(xmlDoc);
                    
                    var labStatus = response['soap:Envelope']['soap:Body'].GetLabStatusResponse.GetLabStatusResult.online['#text'];
                    var labStatusMsg = response['soap:Envelope']['soap:Body'].GetLabStatusResponse.GetLabStatusResult.labStatusMessage['#text'];
                    */
                    
                    
                    /*if(localStorage){

                      localStorage.setItem('labStatus', labStatus);
                      localStorage.setItem('labStatusMsg', labStatusMsg);
                      alert("Data Stored in the Local Storage");
                      
                    }else{
                      alert('Not support the Local Storage');
                    }*/
                    
                    //alert(DumpObject(response).dump);
                }else{
                      alert("Error: " + xmlhttp.status + ":" + xmlhttp.responseText);
                  }
              }
          }

          // Send the POST request
          xmlhttp.setRequestHeader('Content-Type', 'text/xml');
          xmlhttp.send(data);
  
        };

}
