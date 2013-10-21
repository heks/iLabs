var mobileapp = angular.module('mobileApp.service',[]);
mobileapp.service('myService', function(){
	this.concatenate = function(text){
		return text+"123";
	}
});