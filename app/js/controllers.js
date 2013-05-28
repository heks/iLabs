
/* Controllers */
function appController($scope, $location){

      $scope.submit = function(){

        
      // alert($scope.username);

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
    	$location.path("partial4");
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
  //$scope.items = ['item1', 'item2'];

		$scope.opts = {
    		backdropFade: true,
    		dialogFade:true
  		};
  		
  		$scope.opts = {
    		backdropFade: true,
    		dialogFade:true
  		};

       $scope.labs = [{"header": "Radioactivity iLab", "desc": "A lab to investigate the intensity of radiation over distance." }];

       $scope.foos = [{"header": "PowderXRD Lab Client", "desc": "PowderXRD iLabs Client" }];

    }
