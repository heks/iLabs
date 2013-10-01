$scope.storeQA = function(){
                  var textbox_length = document.getElementsByTagName('input').length;
                  var textbox_array = {};var id_array = [];
                  for(var p=0; p<textbox_length; p++){
                    var parentNodeID = document.getElementsByTagName('input')[p].parentNode.id;
                    if(parentNodeID != 'device_form'){
                      var key  = document.getElementsByTagName('input')[p].id;
                      var value = document.getElementsByTagName('input')[p].value;
                      id_array.push(key);
                      textbox_array[key] = value;
                    }
                  }
                  //textarea
                  var textarea_length = document.getElementsByTagName('textarea').length;
                  var textarea_array = {};
                  for(var r=0; r<textarea_length; r++){
                    var parentNodeID = document.getElementsByTagName('textarea')[r].parentNode.id;
                    if(parentNodeID != 'device_form'){
                      var key  = document.getElementsByTagName('textarea')[r].id;
                      var value = document.getElementsByTagName('textarea')[r].value;
                      textarea_array[key] = value;
                      id_array.push(key);
                    }
                  }
                  
                  var combine = $.extend( textbox_array, textarea_array );
                 
                 // create json
                 var json = "{";
                 json += '"QA_DATA":[';
                 for(var index=0; index<id_array.length; index++){
                     var key = id_array[index];
                     var value = combine[key];
                     json += "{";
                     json += '"question_id":"'+key+'",';
                     json += '"answer":"'+value+'"';
                     json += "},"
                 }
                 json = json.slice(0, -1);
                 json += "]";
                 json += "}";
                 
                 var step = $location.path().substring($location.path().lastIndexOf('/') + 1);
                 var parse = JSON.parse(json);
                 var jsonstringify = JSON.stringify(parse);
                 console.log(jsonstringify)
                 localStorage.setItem(step, jsonstringify);
    }

    $scope.retrieveQA = function(){
      var step = $location.path().substring($location.path().lastIndexOf('/') + 1);
      var getJSON = JSON.parse(localStorage.getItem(step));
      console.log(getJSON.QA_DATA);
      //console.log(getJSON.QA_DATA[0].question_id+" : "+getJSON.QA_DATA[0].answer)
    }
$scope.storeDesign = function(){
              
    var label_len = document.getElementById("device_form").getElementsByTagName("label").length;
                                  
    var label_array = [];
    for(var l=0; l<label_len; l++){
        var label = document.getElementById("device_form").getElementsByTagName("label")[l].innerHTML;
        var labelsplit = label.split("<");
        label_array.push(labelsplit[0]);
    }
    var id_array = [];var value_array = [];
    var childNodes_len = document.getElementById("device_form").childNodes.length;
    for(var i=0; i<childNodes_len; i++){
          var childNodes_type = document.getElementById("device_form").childNodes[i].type;
          var childNodes_value = document.getElementById("device_form").childNodes[i].value;
          var childNodes_id = document.getElementById("device_form").childNodes[i].id;
          if(childNodes_type != undefined && childNodes_type != "range"){
              //value_array[childNodes_id] = childNodes_value;
              id_array.push(childNodes_id);
              value_array.push(childNodes_value);
          }
    }
    //console.log(value_array)
                 // create json
                 var json = "{";
                 json += '"FORM_DATA":[';
                 for(var index=0; index<label_array.length; index++){
                     var label = label_array[index];
                     var key = id_array[index];
                     var value = value_array[index];
                     json += "{";
                     json += '"label":"'+label+'",';
                     json += '"question_id":"'+key+'",';
                     json += '"answer":"'+value+'"';
                     json += "},"
                 }
                 json = json.slice(0, -1);
                 json += "]";
                 json += "}";
                 //console.log(json)
                 var step = $location.path().substring($location.path().lastIndexOf('/') + 1);
                 var parse = JSON.parse(json);
                 var jsonstringify = JSON.stringify(parse);
                 console.log(jsonstringify)
                 localStorage.setItem('FORM_DATA', jsonstringify);
    }

    $scope.retrieveDesign = function(){
      var step = $location.path().substring($location.path().lastIndexOf('/') + 1);
      var getJSON = JSON.parse(localStorage.getItem('FORM_DATA'));
      console.log(getJSON.FORM_DATA);
      //console.log(getJSON.QA_DATA[0].question_id+" : "+getJSON.QA_DATA[0].answer)
    }