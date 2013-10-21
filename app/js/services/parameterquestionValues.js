var mobileapp = angular.module('services.parameterquestionValues',[]);
mobileapp.service('parameterquestionValues', function(){
	/**
    * @ngdoc function 
    * @name getParametervalues
    * @description
    * Grab all the parameter values from the experiment design form
    * Returns all the parameter values
    * @returns {Array}
    */

    this.getParametervalues = function(){
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

    this.getQuestionvalues = function(){
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

    this.parameterquestion_JSON = function(parameter_array, question_array){
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
});