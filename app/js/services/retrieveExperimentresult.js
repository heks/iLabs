var mobileapp = angular.module('services.retrieveExperimentresult', []);
mobileapp.service('retrieveExperimentresult', function () {
    /**
     * @ngdoc function
     * @name retrieveExperimentresult
     * @description
     * Get the experiment result from the API and stored in the local storage
     */

    this.retrieveExperimentresult = function () {
        var parameters = 'username=' + localStorage.getItem('Username') + '&api_key=' + localStorage.getItem('API_KEY');
        var empty_data = JSON.stringify({});
        $.ajax({
            url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/experiment/test/result/6/?' + parameters,
            crossDomain: 'false',
            type: 'GET',
            data: empty_data,
            contentType: 'application/json',
            cache: false,
            dataType: 'json',
            async: false,
            processData: false,
            success: function (data) {
                localStorage.setItem('EXPERIMENT_RESULT', JSON.stringify(data));
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('XMLHttpRequest: ' + XMLHttpRequest.responseText);
                alert('Error Message: ' + textStatus);
                alert('HTTP Error: ' + errorThrown);
            }
        });
    }
});