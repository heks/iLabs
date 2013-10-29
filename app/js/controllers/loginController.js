/**************************************************/
/************* LOGIN PAGE CONTROLLER **************/
/**************************************************/
/**
 * @ngdoc function
 * @name loginCtrl
 * @description
 * Define all the functionalities have to be performed in the login template
 * @param $scope {ngService} An angular service - This service let the controller give objects and functions to the views
 * that can later be manipulated with expressions and directives.
 * @param $location {ngService} An angular service - It parses the URL in the browser adddress bar and makes the URL
 * available to the application. Changes to the URL in the address bar reflected into $location service and viceversa.
 */
mobileApp.controller('loginCtrl',
    function loginCtrl($scope, $location) {
        /**
         * @ngdoc function
         * @name submit
         * @description
         * Get the username and password and inject into the 'login' function
         */

        $scope.submit = function () {
            // Display the loading image while authenticating the user
            $('#waiting').show();
            var username = $scope.loginform.username;
            var password = $scope.loginform.password;
            $scope.login(username, password);
        }

        /**
         * @ngdoc function
         * @name login
         * @description
         * Authenticate the user and let them to login to the application by making an ajax call to the REST API
         * @param username {String} Username of the user
         * @param password {String} Password of the user
         */

        $scope.login = function (username, password) {
            var parameters = 'username=' + username + '&password=' + password;
            var emptyString = JSON.stringify({});
            $.ajax({
                url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/login/?' + parameters,
                crossDomain: 'false',
                type: 'POST',
                data: emptyString,
                contentType: 'application/json',
                cache: false,
                dataType: 'json',
                async: false,
                processData: false,
                success: function (data) {
                    $scope.result = data.message;
                    if (data['error']) {
                        alert('Credentials Invalid');
                        return;
                    }
                    console.log(data);
                    localStorage.setItem('Username', username);
                    localStorage.setItem('API_KEY', data['api_key']);
                    // If the authentication is successfull, then it redirects to the Homepage
                    $location.path('home');
                    sessionStorage.setItem('loggedIn', 'true');
                },
                error: function () {
                    alert('Error');
                }
            }).done(function () {
                $('#waiting').hide();
            });
        }
    });