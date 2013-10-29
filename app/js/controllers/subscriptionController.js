/**********************************************************/
/************* SUBSCRIPTION PAGE CONTROLLER ***************/
/**********************************************************/
/**
 * @ngdoc function
 * @name subscriptionCtrl
 * @description
 * Define all the functionalities have to be performed in the subscription template
 * @param $scope {ngService} An angular service - This service let the controller give objects and functions to the views
 * that can later be manipulated with expressions and directives.
 * @param $location {ngService} An angular service - It parses the URL in the browser adddress bar and makes the URL
 * available to the application. Changes to the URL in the address bar reflected into $location service and viceversa.
 * @param $http {ngService} - It takes a single argument that is used to generate an HTTP request and
 * returns response with two $http methods: success and error
 */
mobileApp.controller('subscriptionCtrl',
    function subscriptionCtrl($scope, $location, $http) {

        /**
         * @ngdoc function
         * @name loadsubscriptionContent
         * @description
         * Retrieve the subscriptions, those have been subscribed by the student, through the API and dynamically render those data
         * in the mobile app interface
         */

        $scope.loadsubscriptionContent = function () {
            var get_subscriptionjson = JSON.parse(localStorage.getItem('LABJOURNAL_SUBSCRIPTION'));
            var total_count = get_subscriptionjson.meta.total_count;
            if (total_count != 0) {
                var subscription_data = '[';
                for (var subscription_count = 0; subscription_count < total_count; subscription_count++) {
                    var subscribed_date = get_subscriptionjson.objects[subscription_count].subscribed_date.split('T');
                    subscription_data += '{';
                    subscription_data += '"lab_journal_title" : "' + get_subscriptionjson.objects[subscription_count].lab_journal_title + '",';
                    subscription_data += '"subscribed_date" : "' + subscribed_date[0] + '",';
                    subscription_data += '"lab_journal" : "' + get_subscriptionjson.objects[subscription_count].lab_journal + '"';
                    subscription_data += '},'
                }
                subscription_data = subscription_data.slice(0, -1);
                subscription_data += ']';
                $scope.subscriptions = JSON.parse(subscription_data);
            } else {
                $("#subscriptions_content").hide();
                $("#default_content").show();
            }
        }
    });