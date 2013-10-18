/********************************************************/
/************* ASSIGNMENT PAGE CONTROLLER ***************/
/********************************************************/

/**
* @ngdoc function 
* @name assignmentCtrl
* @description
* Define all the functionalities have to be performed in the assignment template
* @param $scope {ngService} An angular service - This service let the controller give objects and functions to the views
* that can later be manipulated with expressions and directives.
* @param $location {ngService} An angular service - It parses the URL in the browser adddress bar and makes the URL
* available to the application. Changes to the URL in the address bar reflected into $location service and viceversa.
* @param $http {ngService} - It takes a single argument that is used to generate an HTTP request and 
* returns response with two $http methods: success and error
*/

mobileApp.controller('assignmentCtrl',
  function assignmentCtrl($scope, $location, $http){

    /**
    * @ngdoc function 
    * @name loadassignmentContent
    * @description
    * Retrieve the assignments, those have been assigned to the student by the teacher, through the API and dynamically render those data
    * in the mobile app interface
    */

    $scope.loadassignmentContent = function(){
      var get_assignmentjson = JSON.parse(localStorage.getItem('LABJOURNAL_ASSIGNMENT'));
      var total_count = get_assignmentjson.meta.total_count;
      if (total_count != 0){
        var assignment_data = '[';
        for (var assignment_count = 0; assignment_count < total_count; assignment_count++){
          assignment_data += '{';
          assignment_data += '"lab_journal_title" : "'+get_assignmentjson.objects[assignment_count].lab_journal_title+'",';
          assignment_data += '"assigned_date" : "'+get_assignmentjson.objects[assignment_count].assigned_date+'",';
          assignment_data += '"lab_journal" : "'+get_assignmentjson.objects[assignment_count].lab_journal+'"';
          assignment_data += '},'
        }
          assignment_data = assignment_data.slice(0, -1);
          assignment_data += ']';
          $scope.assignments = JSON.parse(assignment_data);
      }else{
          var assignments_content = 'No more assignments available';
          $('#assignments_content').replaceWith('<div>'+assignments_content+'</div>');
      }
  }
});
