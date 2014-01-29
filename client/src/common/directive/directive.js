angular.module('directive', ['ngTouch','ui.keypress'])

.directive('questions', [  function () {
  return {
    restrict: 'E',
    scope: {
    questions:'=',
    guid:'@',
    data:'='
    },
    replace: true,
    templateUrl: 'directive/questions.tpl.html',
    link: function($scope, element, attrs) {
      $scope.parseInt = parseInt;
      
    }
  };
}])


.directive('parameters', [ function () {
  return {
    restrict: 'E',
    scope: {
    parameters:'=',
    stepdata:'@',
    title:'=',
    guid:'@',
    data:'='
    },
    templateUrl: 'directive/parameters.tpl.html',
    link: function($scope, element, attrs) {
      $scope.array = [1,60,2];

      $scope.pushToArray = function(idx,val) {
        /* make sure we dont push values that are already in the array */
        if($scope.data[idx].response.indexOf(val) == -1 ) {
          $scope.data[idx].response.push(val);
          $scope.value = '';
        }
      };

      $scope.removeDistance = function(pidx,idx) {
        if (idx > -1) {
            $scope.data[pidx].response.splice(idx, 1);
        }
      };


    }
  };
}])
.directive('match', function($parse) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      scope.$watch(function() {        
        return $parse(attrs.match)(scope) === ctrl.$modelValue;
      }, function(currentValue) {
        ctrl.$setValidity('mismatch', currentValue);
      });
    }
  };
})
.directive('capitalizeFirst', function() {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
          if(inputValue) {
             var capitalized = inputValue.charAt(0).toUpperCase() +
                               inputValue.substring(1);
             if(capitalized !== inputValue) {
                modelCtrl.$setViewValue(capitalized);
                modelCtrl.$render();
              }         
              return capitalized;
            }
         };
         modelCtrl.$parsers.push(capitalize);
         capitalize(scope[attrs.ngModel]);  // capitalize initial value
     }
   };
})

.directive('markdown', function() {
        var converter = new Showdown.converter();
        var link = function(scope, element, attrs, model) {
            var render = function(){            
                var htmlText = converter.makeHtml(model.$modelValue || '');
                element.html(htmlText);
            };
            scope.$watch(attrs['ngModel'], render);
            render();        
        };
        return {
            restrict: 'E',
            require: 'ngModel',
            link: link
        };
    })

.directive('ngFocus', [function () {
  var FOCUS_CLASS = "ng-focused";
  return {
    restrict: 'A',
    require: "ngModel",
    link: function (scope, iElement, iAttrs, ctrl) {
      ctrl.$focused = false;
      iElement.bind('focus',function(evt){
        iElement.addClass(FOCUS_CLASS);
        scope.$apply(function(){
          ctrl.$focused = true;
        });
      }).bind('blur',function(evt){
        iElement.removeClass(FOCUS_CLASS);
        scope.$apply(function(){
          ctrl.$focused = false;
        });
      });
    }
  };
}]);
