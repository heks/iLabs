var mobileapp = angular.module('services.postupdateQuestions', []);
mobileapp.service('postupdateQuestions', function () {
    /**
     * @ngdoc function
     * @name postQuestionvalues
     * @description
     * Post the question value to the API
     * @param JSONcombined_data {jsonObject} - Containing parameters and questions input values
     * @param parameters {String} - Additional data to pass to the query string(API post url)
     */

    this.postQuestionvalues = function (JSONcombined_data, parameters) {
        if (JSONcombined_data['questions'] != undefined) {
            for (var ques_loop = 0; ques_loop < JSONcombined_data['questions'].length; ques_loop++) {
                var ques_data = JSON.stringify(JSONcombined_data['questions'][ques_loop]);
                $.ajax({
                    url: 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalquestionresponse/?' + parameters,
                    crossDomain: 'false',
                    type: 'POST',
                    data: ques_data,
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
        }
    }

    /**
     * @ngdoc function
     * @name updateQuestionvalues
     * @description
     * Update the question value, if we change the question value of the same experiment instance
     * @param JSONcombined_data {jsonObject} - Containing parameters and questions input values
     * @param parameters {String} - Additional data to pass to the query string(API update url)
     * @param step_name {String} - The name of the current step( eg: step1)
     */

    this.updateQuestionvalues = function (JSONcombined_data, parameters, step_name) {
        if (JSONcombined_data['questions'] != undefined) {
            var get = JSON.parse(localStorage.getItem(step_name));
            for (var ques_loop = 0; ques_loop < JSONcombined_data['questions'].length; ques_loop++) {
                var lsResponse = get.questions[ques_loop].response;
                var fResponse = JSONcombined_data['questions'][ques_loop].response;
                var splitGUID = JSONcombined_data['questions'][ques_loop].instance.split('/');
                var getGUID = splitGUID[splitGUID.length - 2];
                var splitQID = JSONcombined_data['questions'][ques_loop].question.split('/');
                var getQID = splitQID[splitQID.length - 2];

                if (lsResponse != fResponse) {
                    var JSONobj = {
                        "instance": "/api/v1/labjournalinstance/" + getGUID + "/",
                        "question": "/api/v1/labjournalquestion/" + getQID + "/",
                        "response": fResponse
                    };
                    var ques_data = JSON.stringify(JSONobj);
                    var update_url = 'http://devloadbalancer-822704837.us-west-2.elb.amazonaws.com/api/v1/labjournalquestionresponse/?' + parameters;
                    $.ajax({
                        url: update_url,
                        crossDomain: 'false',
                        type: 'POST',
                        data: ques_data,
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
            }
        }
    }
});