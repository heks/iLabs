var mobileApp = angular.module('mobileApp', ['ui.bootstrap']);
mobileApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'loginCtrl'
  })
  .when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'homeCtrl'
  })
  .when('/mygroups', {
    templateUrl: 'partials/mygroups.html',
    controller: 'groupCtrl'
  })
  .when('/partial1', {
    templateUrl: 'partials/partial1.html',
    controller: 'labCtrl'
  })
  .when('/research', {
    templateUrl: 'steps/research.html',
    controller: 'researchCtrl'
  })
  .when('/question', {
    templateUrl: 'steps/question.html',
    controller: 'questionCtrl'
  })
  .when('/design', {
    templateUrl: 'steps/design.html',
    controller: 'designCtrl'
  })
  .when('/investigate', {
    templateUrl: 'steps/investigate.html',
    controller: 'investigateCtrl'
  })
  .when('/analyze', {
    templateUrl: 'steps/analyze.html',
    controller: 'analyzeCtrl'
  })
  .when('/interpret', {
    templateUrl: 'steps/interpret.html',
    controller: 'interpretCtrl'
  })
  .when('/simulation/:Id',{
    templateUrl: 'steps/simulation.html',
    controller: 'simCtrl'
  })
  .when('/account/:Id',{
    templateUrl: 'steps/account.html',
    controller: 'accCtrl'
  })
  .when('/messages/:Id',{
    templateUrl: 'steps/messages.html',
    controller: 'msgCtrl'
  })
  .when('/webcam/:Id',{
    templateUrl: 'steps/webcam.html',
    controller: 'webCtrl'
  })
  .when('/template/:Id',{
    templateUrl: 'partials/template.html',
    controller: 'templateCtrl'
  })
   .when('/template/:Key/:Id',{
    templateUrl: 'partials/template.html',
    controller: 'templateCtrl'
  })
  .when('/tempcontent/:Id',{
    templateUrl: 'partials/tempcontent.html',
    controller: 'templateCtrl'
  })
  .otherwise({
    redirectTo: '/login'
  });
}).run(function($rootScope, $location) {
  $rootScope.location = $location;
});

//Template Content Directive
mobileApp.directive('myCallback', function($compile, $location, $http){
      return{
            scope: {scopeCtrlFn: '&callbackFn'},
            link: function(scope, element, attrs){
                 
                                var couponId = localStorage.getItem('CouponID');
                                var total_steps = localStorage.getItem('Totalsteps');
                                var labtitle = scope.Labtitle;
                                var path = $location.path();
                                var value = path.substring(path.lastIndexOf('/') + 1);
                                var last = value.charAt(value.length-1);
                                var step_id = last;
                                var id = last - 1;

                                if(localStorage.getItem('labTitle') == 'Radioactivity'){
                                  var jsontemplate = "journaltest.json";
                                }
                                if(localStorage.getItem('labTitle') == 'PowderXRD'){
                                  var jsontemplate = "powderXRD.json";
                                }
                                //console.log("get : "+localStorage.getItem('labTitle'))
                                //alert(jsontemplate)
                                $http.get('template/'+jsontemplate).success(function(data){
                                        //parse through the json file and retrieve the data
                                        var labjournalID = data.id;
                                        var body_content = "<p></p>";
                                        /** Content **/
                                        var content = data.labjournalsteps[id].journal_step_content;
                                        if(content != undefined){
                                            var converter  = new Markdown.Converter(),
                                            markdownToHtml = converter.makeHtml;

                                            var markdowndata = content;
                                            var htmlcontent = markdownToHtml(markdowndata);
                                            body_content += htmlcontent;
                                        }
                                        /** Device form **/
                                        var deviceform = data.labjournalsteps[id].device_form;
                                        if(deviceform != undefined){
                                            body_content += "<div class=\"designform\" id=\"device_form\"><h3 style=\"color:yellow\">Experiment Design</h3>";
                                            for(var i=0; i < deviceform.length; i++){
                                                var description = deviceform[i].description;
                                                var form_fields = "<label>"+deviceform[i].label+"<a tooltip-placement=\"left\" tooltip-html-unsafe=\""+description+"\"><img class=\"info\" src=\"./img/question.png\"></a></label>";
                                                var forminputID = "LID"+labjournalID+"_"+"FID"+deviceform[i].input_id;
                                                // input textbox
                                                if(deviceform[i].input_type == "text"){
                                                  form_fields += "<input type=\"text\" style=\"width:215px;height:30px\" id=\""+forminputID+"\"></br>";
                                                }
                                                // input slider
                                                if(deviceform[i].input_type == "slider"){
                                                  var min_value = deviceform[i].min_value;
                                                  var max_value = deviceform[i].max_value;
                                                  var step_value = deviceform[i].step_value;
                                                  form_fields += "<input style=\"width:100px\" type=\"range\" ng-model=\""+forminputID+"\" id=\"slider\" min=\""+min_value+"\" max=\""+max_value+"\" step=\""+step_value+"\" ><input type=\"text\" value=\"{{"+forminputID+"}}\" style=\"width:60px;height:30px\"/>"
                                                }
                                                // input dropdown
                                                if(deviceform[i].input_type == "dropdown"){
                                                  var split_values = deviceform[i].input_values.split(",");
                                                  form_fields += "<select>";
                                                  for(var j=1; j <= split_values.length; j++){
                                                      form_fields += "<option>"+split_values[j-1]+"</option>";
                                                  }
                                                  form_fields += "</select></br>";

                                                }
                                                body_content += form_fields;
                                            }
                                            body_content += "</div></br>";
                                        }
                                        /** Questions **/
                                        var questions = data.labjournalsteps[id].questions;
                                        if(questions != undefined){
                                            var number_of_questions = data.labjournalsteps[id].number_of_questions;
                                            for(var k=0; k < questions.length; k++){
                                                  var questionID = questions[k].id;
                                                  var questionInputID = "LID"+labjournalID+"_"+"QID"+questionID;
                                                  var question = questions[k].question.question_text.text+"\n";
                                                  if(questions[k].question.answer_field_type.field_type == "textarea"){
                                                        question += "<textarea placeholder=\"Please enter your answer here...\" id=\""+questionInputID+"\"></textarea><a ng-click=\"clear('"+questionInputID+"')\"><img src=\"./img/no.png\"></a></br></br>";
                                                  }
                                                  body_content += question;
                                            }
                                            
                                        }
                                        /**Submit Design**/
                                        if(deviceform != undefined){
                                          body_content += "<button style=\"background:green;color:white;width:150px;height:35px\" ng-click=\"submitDesign()\">Submit Design</button><div style=\"margin-bottom:3em\"></div><button ng-click=\"jsonapi()\">Jsonapi</button><button ng-click=\"jsonapiReverse()\">Jsonapi Reverse</button>";
                                        }
                                        /**Download and Exit**/
                                        if(step_id == total_steps){
                                          body_content += "<button style=\"background:red;color:white;width:150px;height:35px\">Create PDF</button><button style=\"background:blue;color:white;width:150px;height:35px\" ng-click=\"exitLab()\">Exit Lab</button>"
                                        }
                                        //alert(body_content)
                                        console.log("HTML : "+body_content)
                                        
                                        //document.getElementsByTagName('textarea').length
                                        //$(".journal").html(body_content);
                                        var compilehtml = $compile(body_content)(scope);
                                        scope.scopeCtrlFn({content: compilehtml});

                                        

                                });


                                scope.clear = function(inputID){
                                   document.getElementById(inputID).value = "";
                                }

                                scope.submitDesign = function(){
                                 
                                  var label_len = document.getElementById("device_form").getElementsByTagName("label").length;
                                  
                                  var label_array = [];
                                  for(var l=0; l<label_len; l++){
                                    var label = document.getElementById("device_form").getElementsByTagName("label")[l].innerHTML;
                                    var labelsplit = label.split("<");
                                    label_array.push(labelsplit[0]);
                                  }
                               
                                  var type_array = [];var value_array = [];
                                  var childNodes_len = document.getElementById("device_form").childNodes.length;
                                  for(var i=0; i<childNodes_len; i++){
                                      var childNodes_type = document.getElementById("device_form").childNodes[i].type;
                                      var childNodes_value = document.getElementById("device_form").childNodes[i].value;
                                      if(childNodes_type != undefined && childNodes_type != "range"){
                                           // alert(document.getElementById("device_form").childNodes[i].tagName+" : "+document.getElementById("device_form").childNodes[i].type)
                                            //type_array.push(childNodes_type+":"+childNodes_value);
                                            value_array.push(childNodes_value);
                                      }
                                  }

                                  var formfield_array = {};
                                  for(var k=0; k<label_array.length; k++){
                                     var key = label_array[k];
                                     var value = value_array[k];
                                     formfield_array[label_array[k]] = value_array[k];
                                  }
                                  
                                  /*for(var index in formfield_array){
                                    console.log(index+" : "+formfield_array[index])
                                  }*/
                                  /*var timestamp = new Date().getTime();
                                  var labid = 11;
                                  var unique = "" + timestamp + labid;
                                  var hash = hex_md5(unique);
                                  alert(unique+" : "+hash)*/
                                  
                                }
                                scope.jsonapi = function(){
                                    $http.get("template/labjournal.json").success(function(data){
                                        console.log("JSON API ARRAY")
                                        for(var i=0; i<data.labjournalsteps.length; i++){
                                          console.log("id: "+data.labjournalsteps[i].id+" , step_no: "+data.labjournalsteps[i].journal_step_no+" , title: "+data.labjournalsteps[i].journal_step_title)
                                        }
                                    });
                                }
                                scope.jsonapiReverse = function(){
                                    $http.get("template/labjournal_edit.json").success(function(data){
                                        console.log("JSON API REVERSE ARRAY")
                                        for(var i=0; i<data.labjournalsteps.length; i++){
                                          console.log("id: "+data.labjournalsteps[i].id+" , step_no: "+data.labjournalsteps[i].journal_step_no+" , title: "+data.labjournalsteps[i].journal_step_title)
                                        }
                                        /*var length = data.labjournalsteps.length;
                                        for(var i=length; i>0; i--){
                                          index = data.labjournalsteps[i-1];
                                          console.log("id: "+index.id+" , step_no: "+index.journal_step_no+" , title: "+index.journal_step_title)
                                        }*/
                                    });
                                }

                                scope.exitLab = function(){
                                  $location.path("mygroups");
                                }
            }
      };
});




