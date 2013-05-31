
/* Controllers */
function appController($scope, $location){

      $scope.submit = function(){
       $location.path("partial1");
       $scope.foobar = true;
      };

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
      }

      $scope.InvesB = function(){
        $location.path("design");
      }

      $scope.InvesN = function(){
        $location.path("analyze");
      }

      $scope.AB = function(){
        $location.path("investigate");
      }

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
      $scope.drawGraph = function(){
        $('#graph').highcharts({
                chart: {
                  type: 'line',
                  backgroundColor: '#FCFFC5'
                },
                title: {
                  text: 'Radioactivity'
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

       $scope.htmlTooltip1 = "The distances from the Strontium-90 source that the Geiger counter will measure radiation. For example, you could enter: 15, 45, 60. The minimum distance is 15mm, and the maximum is 90mm.";
       $scope.htmlTooltip2 = "The number of seconds that each measurement of radiation will last, at each of the distance you chose above";
       $scope.htmlTooltip3 = "The number of times you wish for the experiment to repeat, according to the values you set for the previous variables";

       $scope.qtns = [
        {"question": "How does this lab work?"},{"question": "What is radiation?"},
        {"question": "What is radioactivity, or radioactive decay?"},{"question": "How is radioactivity measured?"},
        {"question": "What is Strontium-90?"}

       ];


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
