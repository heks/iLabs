

/*var app = angular.module('mobileApp', ['ui.bootstrap']);
 
app.run(function($rootScope, $location) {
    $rootScope.location = $location;
    console.log($location);
});

//document.getElementsByTagName("base")[0].href = location.href;      


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      controller: appController
    });

    $routeProvider.when('/partial1', {

        //templateUrl: '/partials/partial1.html',
        templateUrl: 'Mobile-iLab/app/partials/partial1.html',

        controller: appController
    });

    $routeProvider.when('/partial1/:Id/:Key', {

        //templateUrl: '/partials/partial1.html',
        templateUrl: 'Mobile-iLab/app/partials/partial1.html',

        controller: appController
    });

    $routeProvider.when('/home/:Id/:Key', {

        //templateUrl: '/partials/home.html',
        templateUrl: 'Mobile-iLab/app/partials/home.html',

        controller: homeController
    });

    $routeProvider.when('/home', {

        //templateUrl: '/partials/home.html',
        templateUrl: 'Mobile-iLab/app/partials/home.html',

        controller: appController
    });

    $routeProvider.when('/mygroups', {

        //templateUrl: '/partials/mygroups.html',
        templateUrl: 'Mobile-iLab/app/partials/mygroups.html',

        controller: appController
    });

    $routeProvider.when('/partial2', {

      //templateUrl: '/partials/partial2.html',
      templateUrl: '/Mobile-iLab/app/partials/partial2.html',

      controller: appController
    });

    $routeProvider.when('/partial3', {

      //templateUrl: '/partials/partial3.html',
      templateUrl: 'Mobile-iLab/app/partials/partial3.html',

      controller: appController
    });

    $routeProvider.when('/partial4', {

     // templateUrl: '/partials/partial4.html',
     templateUrl: 'Mobile-iLab/app/partials/partial4.html',

      controller: appController
    });

    $routeProvider.when('/research', {

     // templateUrl: '/steps/research.html',
     templateUrl: 'Mobile-iLab/app/steps/research.html',

      controller: appController
    });

    $routeProvider.when('/question', {

      //templateUrl: '/steps/question.html',
      templateUrl: 'Mobile-iLab/app/steps/question.html',

      controller: appController
    });

    $routeProvider.when('/design', {

      //templateUrl: '/steps/design.html',
      templateUrl: 'Mobile-iLab/app/steps/design.html',

      controller: appController
    });

    $routeProvider.when('/investigate', {

      //templateUrl: '/steps/investigate.html',
      templateUrl: 'Mobile-iLab/app/steps/investigate.html',

      controller: appController
    });

    $routeProvider.when('/investigate/:Dis/:Times/:Trials', {

      //templateUrl: '/steps/investigate.html',
      templateUrl: 'Mobile-iLab/app/steps/investigate.html',

      controller: appController
    });

    $routeProvider.when('/analyze', {

      //templateUrl: '/steps/analyze.html',
      templateUrl: 'Mobile-iLab/app/steps/analyze.html',

      controller: appController
    });

    $routeProvider.when('/interpret', {

      //templateUrl: '/steps/interpret.html',
      templateUrl: 'Mobile-iLab/app/steps/interpret.html',

      controller: appController
    });

    $routeProvider.when('/exit',{
      templateUrl: 'http://ilabcentral.org/radioactivity/',
      controller: appController
    });

    $routeProvider.when('/simulation/:Id',{

      //templateUrl: '/steps/simulation.html',
      templateUrl: 'Mobile-iLab/app/steps/simulation.html',

      controller: appController
    });

     $routeProvider.when('/account/:Id',{

      //templateUrl: '/steps/account.html',
      templateUrl: 'Mobile-iLab/app/steps/account.html',

      controller: appController
    });

      $routeProvider.when('/messages/:Id',{

      //templateUrl: '/steps/messages.html',
      templateUrl: 'Mobile-iLab/app/steps/messages.html',

      controller: appController
    });

       $routeProvider.when('/webcam/:Id',{

      //templateUrl: '/steps/webcam.html',
      templateUrl: 'Mobile-iLab/app/steps/webcam.html',

      controller: appController
    });

    $routeProvider.when('', {

      //templateUrl: '/index.html',
      templateUrl: 'Mobile-iLab/app/index.html',
      //templateUrl: 'Mobile-iLab/app/partials/login.html',
       //templateUrl: 'partials/login.html',

      controller: appController
    });

  

    $routeProvider.otherwise({ redirectTo: '/login' });

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    
}]);*/


var mobileApp = angular.module('mobileApp', ['ui.bootstrap'])
  .config(function($routeProvider, $locationProvider) {
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
    .otherwise({
      redirectTo: '/login'
    });
  }).run(function($rootScope, $location) {
    $rootScope.location = $location;
});


