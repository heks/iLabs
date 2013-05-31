/* Directives */
var myApp = angular.module('mobileApp', []).run(function($rootScope, $location) {
    $rootScope.location = $location;
});
