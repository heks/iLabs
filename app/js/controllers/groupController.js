/******************************************************/
/************* MYGROUP PAGE CONTROLLER ****************/
/******************************************************/
/**
 * @ngdoc function
 * @name groupCtrl
 * @description
 * Define all the functionalities have to be performed in the mygroup template
 * @param $scope {ngService} An angular service - This service let the controller give objects and functions to the views
 * that can later be manipulated with expressions and directives.
 * @param $location {ngService} An angular service - It parses the URL in the browser adddress bar and makes the URL
 * available to the application. Changes to the URL in the address bar reflected into $location service and viceversa.
 * @param $http {ngService} - It takes a single argument that is used to generate an HTTP request and
 * returns response with two $http methods: success and error
 */
mobileApp.controller('groupCtrl',
    function groupCtrl($scope, $location, $http) {

        /**
         * @ngdoc function
         * @name loadgroupContent
         * @description
         * Retrieve the groups, in which the student belongs to, through the API and dynamically render those data
         * in the mobile app interface
         */

        $scope.loadgroupContent = function () {
            var get_groupjson = JSON.parse(localStorage.getItem('LABJOURNAL_GROUPS'));
            var total_count = get_groupjson.meta.total_count;
            if (total_count != 0) {
                var group_data = '[';
                for (var group_count = 0; group_count < total_count; group_count++) {
                    group_data += '{';
                    group_data += '"title" : "' + get_groupjson.objects[group_count].title + '",';
                    var splitowner = get_groupjson.objects[group_count].owner.split("/");
                    var owner = splitowner[splitowner.length - 2];
                    group_data += '"owner" : "' + owner + '"';
                    group_data += '},'
                }
                group_data = group_data.slice(0, -1);
                group_data += ']';
                $scope.groups = JSON.parse(group_data);
            } else {
                var groups_content = 'No more groups available';
                $('#groups_content').replaceWith('<div>' + groups_content + '</div>');
            }
        }
    });