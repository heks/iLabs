//Template Content Directive
mobileApp.directive('myCallback', function($compile, $location, $http){
      return{
            scope: {scopeCtrlFn: '&callbackFn'},
            link: function(scope, element, attrs){
                 
                                var couponId = localStorage.getItem('CouponID');
                                var labtitle = scope.Labtitle;
                                var path = $location.path();
                                var value = path.substring(path.lastIndexOf('/') + 1);
                                var last = value.charAt(value.length-1);
                                var id = last - 1;
                                var split = path.split("/");
                                var labtitle = split[2]

                                $http.get('template/template.json').success(function(data){
                                        //var labtitle = data.Steps[id].name;
                                        var template = data.Steps[id].template;

                                        jQuery(document).ready(function jQueryReady($){
                                             /* var converter  = new Markdown.Converter(),
                                              markdownToHtml = converter.makeHtml;

                                              var markdowndata = data.Steps[id].template;
                                              var htmltemplate = markdownToHtml(markdowndata);
                                              console.log("MARKUP HTML: "+htmltemplate);
                                              $(".markup_html").html(htmltemplate);*/

                                              var formtemplate = data.Steps[id].form;
                                              //alert(formtemplate)
                                              if(formtemplate == undefined){
                                                var converter  = new Markdown.Converter(),
                                              markdownToHtml = converter.makeHtml;

                                              var markdowndata = data.Steps[id].template;
                                              var htmltemplate = markdownToHtml(markdowndata);
                                              console.log("MARKUP HTML1: "+htmltemplate);
                                              $(".markup_html2").html(htmltemplate);
                                            }else{
                                                  //alert(template);
                                                  var findmatch1 = formtemplate.match(/\@([^|]*)\@/)[1]; //template.replace(text.match(/\|([^|]*)\|/)[1], "");
                                                  //alert(findmatch);
                                                  var split_data1 = findmatch1.split(";");

                                                  for(var i=1; i<=split_data1.length; i++){
                                                          var split_data2 = split_data1[i-1].split("::");
                                                          //alert(split_data2[0]+ " => "+split_data2[1])
                                                          //var c = new Array();
                                                          //alert(split_data2[0])
                                                          switch(split_data2[0]){
                                                            case "designform":
                                                            content += "<div class=\"designform\">";
                                                             var findmatch2 = split_data2[1].match(/\[([^|]*)\]/)[1];
                                                             var findmatch2_split1 = findmatch2.split(",");
                                                             //alert(findmatch2_split1.length)
                                                             
                                                                for(var j=1; j<=findmatch2_split1.length; j++){
                                                                    var split_field_data = findmatch2_split1[j-1].split(":");
                                                                    //alert(findmatch2_split1[j-1])
                                                                    //alert(split_field_data[0]+" => "+split_field_data[1])
                                                                    var field = "<label>"+split_field_data[0]+"</label>";
                                                                    //var label_arr = new Array(split_field_data[0]);
                                                                    switch(split_field_data[1]){
                                                                      case "text":
                                                                      field += "<input type=\"text\">";
                                                                      var input_txtarr = new Array(field);
                                                                      break;
                                                                      case "dropdown":
                                                                      field += "<select><option>1</option></select>";
                                                                      var input_droparr = new Array(field);
                                                                    }
                                                                    
                                                                 }
                                                            content += input_txtarr+input_droparr;
                                                            //content += farr+darr;
                                                            content += "</div></br>";
                                                            //alert(content)
                                                            var c = new Array(content);
                                                            break;
                                                            case "textarea":
                                                            content += "<textarea placeholder=\"Please enter your answer here...\"></textarea>";
                                                            //alert(split_data2[1])
                                                            //alert(content)
                                                            //var c = new Array(content);
                                                            break;

                                                          }
                                                  }
                                                  var htmlElements = content.replace("[object Window]","");
                                                  var text = "@"+findmatch1+"@";
                                                  var replaceHTML = formtemplate.replace(text, htmlElements);
                                                  
                                                  //alert(formtemplate);
                                                  var converter  = new Markdown.Converter(),
                                                  markdownToHtml = converter.makeHtml;

                                                  var markdowndata = replaceHTML;
                                                  //data.Steps[id].template = replaceHTML;
                                                  //alert(data.Steps[id].template)
                                                  var htmltemplate = markdownToHtml(markdowndata);
                                                  console.log("MARKUP HTML2: "+htmltemplate);
                                                  $(".markup_html2").html(htmltemplate);
                                                }

                                              //Setting the attributes( identifiers, class, ng-directives etc.)
                                              $("ul li a").attr("ng-click","clear()");
                                              $("a img").attr("ng-click","clearText()");
                                              $("ul li a").addClass("textblue sm"); //$("a").css({color : "#0000ff"});
                                              $("textarea").attr("placeholder", "Please enter your answer here...");

                                             /* var textarea_len = document.getElementsByTagName('textarea').length;
                                              if(textarea_len != 0){
                                                                      for(var i=1; i <= textarea_len; i++){
                                                                                 var textarea_id  = couponId+"_"+labtitle+"_QA"+i;
                                                                                 $("textarea").attr("id", textarea_id);
                                                                                 $("textarea").attr("ng-model", textarea_id);
                                                                    
                                                                                //$("button").attr("onclick", "alert()");
                                                                                //$("a").attr("tooltip-html-unsafe","clear text");
                                                                                //$("a").attr("tooltip-placement","top");
                                                                      }
                                              }*/
                                              //alert("Template loaded");
                                        });

                                        var finalhtml = $(".markup_html2").html();
                                        //localStorage.setItem("finalTemplate",finalhtml);
                                        var compilehtml = $compile(finalhtml)(scope);
                                        scope.scopeCtrlFn({content: compilehtml});
                                });
                                
                                scope.clear = function(){
                                    alert("preload data");
                                }

                                scope.clearText = function(){
                                  alert("clear text");
                                }
                  
             
            }
      };
});

/*mobileApp.directive('markdown', function(){
    var converter = new Showdown.converter();
    var template = '<a ng-click="clear()">Click Directive</a>';
    return{
            restrict: 'E',
            scope: {},
            compile: function(element, attrs, transclude){
                      element.html(template);
                      var markdown = element.text();
                      console.log("directive markdown:"+markdown);
                      var makeHtml = converter.makeHtml(markdown);
                      console.log("directive html:"+makeHtml);
                      element.html(makeHtml);

                      return function(scope, ele, attr){
                        scope.clear = function(){
                          alert("Clear");
                        }
                      }

            }
    }
});*/

/*mobileApp.directive('markdown', function( $compile ){
  return{
    restrict: 'E',
    require: 'model',
    scope: {
      value: "=model"
    },
    template: '<div ng-bind-html-unsafe="value | markdown"></div>'
  };
}).filter('markdown', function(){
  var converter = new Showdown.converter();
  return function(value){
    return converter.makeHtml(value || '');
  };
});*/

/*mobileApp.directive( 'test', function ( $compile ) {
  return {
    restrict: 'E',
    scope: { text: '@' },
    template: '<p ng-click="add()">{{text}}</p>',
    controller: function ( $scope, $element ) {
      $scope.add = function () {
        var el = $compile( "<test text='n'></test>" )( $scope );
        $element.parent().append( el );
      };
    }
  };
});*/

/*mobileApp.directive('markdown', function(){
var converter = new Showdown.converter();
      var link = function(scope, element, attrs, model){
                var render = function(){
                  var htmlText = converter.makeHtml(model.$modelValue);
                  element.html(htmlText);
                };
                return{
                  restrict: 'E',
                  require: 'ngModel',
                  link: link
                }
      }
})
.controller('templateCtrl',
function ($scope){
$scope.template = "# hello world!";
});*/

/*mobileApp.directive('markdown', function(){
  var converter = new Showdown.converter();
  return{
    restrict: 'C',
    link: function(scope, element, attrs){
      var htmlText = converter.makeHtml(element.text());
      element.html(htmlText);
    }
  };
});*/

/* $scope.loadTemplate = function(){
        var couponId = localStorage.getItem('CouponID');
        var path = $location.path();
        var value = path.substring(path.lastIndexOf('/') + 1);
        var last = value.charAt(value.length-1);
        var id = last - 1;
        console.log("STEP ID: "+id);

        $http.get('template/template.json').success(function(data){
                //console.log(data);//console.log(id);//result = JSON.parse(data);
                var labtitle = data.Steps[id].name;
                console.log("LAB TITLE: "+labtitle);
                $scope.Labtitle = labtitle;
                var template = data.Steps[id].template;
                console.log("JSON TEMPLATE: "+template);  

                jQuery(document).ready(function jQueryReady($){
                        var converter  = new Markdown.Converter(),
                        markdownToHtml = converter.makeHtml;

                        var markdowndata = data.Steps[id].template;
                        var htmltemplate = markdownToHtml(markdowndata);
                        console.log("MARKUP HTML: "+htmltemplate);
                        $(".markup_html").html(htmltemplate);

                        //Setting the attributes( identifiers, class, ng-directives etc.)
                        $("a").attr("ng-click","clear()");
                        $("a").addClass("textblue sm"); //$("a").css({color : "#0000ff"});
                        $("textarea").attr("placeholder", "Please enter your answer here...");

                        var textarea_len = document.getElementsByTagName('textarea').length;
                        if(textarea_len != 0){
                                                for(var i=1; i <= textarea_len; i++){
                                                           var textarea_id  = couponId+"_"+labtitle+"_QA"+i;
                                                           $("textarea").attr("id", textarea_id);
                                                           $("textarea").attr("ng-model", textarea_id);
                                              
                                                          //$("button").attr("onclick", "alert()");
                                                          //$("a").attr("tooltip-html-unsafe","clear text");
                                                          //$("a").attr("tooltip-placement","top");
                                                }
                        }
                        //alert("Template loaded");
                });
                localStorage.setItem("finalTemplate","");
                var finalhtml = $(".markup_html").html();
                localStorage.setItem("finalTemplate",finalhtml);
        });
    }*/
