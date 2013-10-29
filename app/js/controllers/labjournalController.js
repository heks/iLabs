/********************************************************/
/************* LABJOURNAL PAGE CONTROLLER ***************/
/********************************************************/
/**
 * @ngdoc function
 * @name labjournalCtrl
 * @description
 * Define all the functionalities have to be performed in the labjournal template
 * @param $scope {ngService} An angular service - This service let the controller give objects and functions to the views
 * that can later be manipulated with expressions and directives.
 * @param $location {ngService} An angular service - It parses the URL in the browser adddress bar and makes the URL
 * available to the application. Changes to the URL in the address bar reflected into $location service and viceversa.
 * @param $http {ngService} - It takes a single argument that is used to generate an HTTP request and
 * returns response with two $http methods: success and error
 */
mobileApp.controller('labjournalCtrl',
    function labjournalCtrl($scope, $location, $http) {
        var parameters = 'username=' + localStorage.getItem('Username') + '&api_key=' + localStorage.getItem('API_KEY');

        /**
         * @ngdoc function
         * @name loadjournalContent
         * @description
         * Retrieve the labjournals, those haven't been assigned and subscribed, through the API and dynamically render those data
         * in the mobile app interface
         */

        $scope.loadlabjournalContent = function () {
            var get_labjournaljson = JSON.parse(localStorage.getItem('LABJOURNALS_BROWSE'));
            var total_count = get_labjournaljson.meta.total_count;
            if (total_count != 0) {
                var labjournal_data = '[';
                for (var labjournal_count = 0; labjournal_count < total_count; labjournal_count++) {
                    labjournal_data += '{';
                    labjournal_data += '"title" : "' + get_labjournaljson.objects[labjournal_count].title + '",';
                    labjournal_data += '"subject" : "' + get_labjournaljson.objects[labjournal_count].subject + '",';
                    labjournal_data += '"author" : "' + get_labjournaljson.objects[labjournal_count].author + '",';
                    labjournal_data += '"modified_date" : "' + get_labjournaljson.objects[labjournal_count].modified_date + '",';
                    labjournal_data += '"resource_uri" : "' + get_labjournaljson.objects[labjournal_count].resource_uri + '"';
                    labjournal_data += '},'
                }
                labjournal_data = labjournal_data.slice(0, -1);
                labjournal_data += ']';
                $scope.labjournals = JSON.parse(labjournal_data);
            } else {
                $("#labjournals_content").hide();
                $("#default_content").show();
            }
        }

        /**
         * @ngdoc function
         * @name subscribeLabjournal
         * @description
         * Can be able to subscribe the labjournals, those haven't been assigned and subscribed
         * @param labjournal_uri {String} - The resource of the labjournal
         */

        $scope.subscribeLabjournal = function (labjournal_uri) {
            var subscribe_data = JSON.stringify({
                "lab_journal": labjournal_uri
            });
            $.ajax({
                url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalsubscription/?' + parameters,
                crossDomain: 'false',
                type: 'POST',
                data: subscribe_data,
                contentType: 'application/json',
                cache: false,
                dataType: 'json',
                async: false,
                processData: false,
                success: function (data) {},
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('XMLHttpRequest: ' + XMLHttpRequest.responseText);
                    alert('Error Message: ' + textStatus);
                    alert('HTTP Error: ' + errorThrown);
                }
            });
        }
    });