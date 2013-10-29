var mobileapp = angular.module('services.updateInstance', []);
mobileapp.service('updateInstance', function ($location) {
    /**
     * @ngdoc function
     * @name updateInstance
     * @description
     * Update the instance data in the API on exit once the user completed the experiment
     */

    this.updateInstance = function (parameters, index) {
        var GUID = localStorage.getItem('GUID');
        var labjournalID = localStorage.getItem('LABJOURNAL_ID');
        var username = localStorage.getItem('Username');
        var getlabjournal = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
        var labjournal_stepid = getlabjournal.labjournalsteps[index].id;
        var labjournal_uri = getlabjournal.resource_uri;
        var jsonObject = {
            "GUID": GUID,
            "last_step_completed": labjournal_stepid,
            "lab_journal": labjournal_uri
        };
        console.log(jsonObject)
        var data = JSON.stringify(jsonObject);

        $.ajax({
            url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalinstance/?' + parameters,
            crossDomain: 'false',
            type: 'POST',
            data: data,
            contentType: 'application/json',
            cache: false,
            dataType: 'json',
            async: false,
            processData: false,
            success: function (data) {
                $location.path("home");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('XMLHttpRequest: ' + XMLHttpRequest.responseText);
                alert('Error Message: ' + textStatus);
                alert('HTTP Error: ' + errorThrown);
            }
        });
    }
});