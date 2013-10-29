/******************************************************/
/************* EXPERIMENT PAGE CONTROLLER ***************/
/******************************************************/
/**
 * @ngdoc function
 * @name experimentCtrl
 * @description
 * Define all the functionalities have to be performed in the lab interface template
 * @param $scope {ngService} An angular service - This service let the controller give objects and functions to the views
 * that can later be manipulated with expressions and directives.
 * @param $location {ngService} An angular service - It parses the URL in the browser adddress bar and makes the URL
 * available to the application. Changes to the URL in the address bar reflected into $location service and viceversa.
 * @param $http {ngService} - It takes a single argument that is used to generate an HTTP request and
 * returns response with two $http methods: success and error
 */
mobileApp.controller('experimentCtrl',
    function experimentCtrl($scope, $location, $http, checkInputfields, parameterquestionValues,
        postupdateParameters, postupdateQuestions, submitExperimentdesign, retrieveExperimentresult,
        renderGraph, updateInstance) {

        /**
         * @ngdoc function
         * @name navigatePage
         * @description
         * Navigate to the specified page
         * @param pagename {String} - The name of the page to be navigate
         */

        $scope.navigatePage = function (pagename) {
            $location.path(pagename);
        }

        /**
         * @ngdoc function
         * @name navigateBack
         * @description
         * Navigate to the previous step of the current experiment instance
         */

        $scope.navigateBack = function () {
            // Get the last index of the url path (ex: {step_name} - step1)
            var step_name = $location.path().substring($location.path().lastIndexOf('/') + 1);
            // Get the index for the previous step data in the labjournal JSONobject. (ex: 1 - 1 = 0 => index)
            var index = parseInt(step_name.charAt(step_name.length - 1)) - 1;
            localStorage.setItem('SUBMIT_DESIGN', 0);
            var getlabjournal = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
            if (index != 0) {
                var labtitle_upper = getlabjournal.labjournalsteps[index].journal_step_title;
                var labtitle = labtitle_upper.toLowerCase();
                $location.path('experiment/' + labtitle + '/step' + index); // Redirects to the first step in the experiment
            }
        }

        /**
         * @ngdoc function
         * @name navigateNext
         * @description
         * Navigate to the next step of the current experiment instance
         */

        $scope.navigateNext = function () {
            // Get the last index of the url path (ex: {step_name} - step1)
            var step_name = $location.path().substring($location.path().lastIndexOf('/') + 1);
            // Get the index for the next step data in the labjournal JSONobject. (ex: 1 + 1 = 2 => index)
            var index = parseInt(step_name.charAt(step_name.length - 1)) + 1;
            var parameters = 'username=' + localStorage.getItem('Username') + '&api_key=' + localStorage.getItem('API_KEY');

            // Check the inputfields are empty or not
            var textbox = checkInputfields.isTextboxempty();
            var dropdown = checkInputfields.isDropdownempty();
            var textarea = checkInputfields.isTextareaempty();

            var getLabjournal = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
            var total_steps = getLabjournal.number_of_steps;
            if (index < total_steps) {
                var step_no = index;
            }
            if (step_no < total_steps) {
                var labtitle = getLabjournal.labjournalsteps[index].journal_step_title.toLowerCase();
                if (textbox == true && dropdown == true && textarea == true) {
                    var parameter_array = parameterquestionValues.getParametervalues(); // grab the parameter values from the appropriate inputfields
                    var question_array = parameterquestionValues.getQuestionvalues(); // grab the question values from the appropriate inputfields
                    // Create a JSON object containing parameter and question data using the parameter and question arrays
                    var JSONcombined_data = parameterquestionValues.parameterquestion_JSON(parameter_array, question_array);

                    // POST and UPDATE the experiment data on each step
                    $scope.postupdateExperimentdata(JSONcombined_data, parameters, step_name);
                    var JSONcombined_data_string = JSON.stringify(JSONcombined_data);
                    localStorage.setItem(step_name, JSONcombined_data_string);

                    // After performing all the above operations, then navigate to the next step
                    $location.path('experiment/' + labtitle + '/step' + step_no);
                } else {
                    alert('Please fill out the empty field( s)');
                }
            }
        }

        /**
         * @ngdoc function
         * @name postupdateExperimentdata
         * @description
         * Manipulate all the POST and UPDATE operations on each data in each steps of the experiment
         * based on several conditions
         * @param JSONcombined_data {jsonObject} - Containing parameters and questions input values
         * @param parameters {String} - Additional data to pass to the query string
         * @param step_name {String} - The name of the current step( eg: step1)
         */

        $scope.postupdateExperimentdata = function (JSONcombined_data, parameters, step_name) {
            if (JSON.parse(localStorage.getItem(step_name))) {
                var get_stepdata = JSON.parse(localStorage.getItem(step_name));
                if (JSONcombined_data['questions'] != undefined) {
                    if (get_stepdata.questions != undefined) {
                        var splitinstance = get_stepdata.questions[0].instance.split('/');
                        var lsinstance_GUID = splitinstance[splitinstance.length - 2];
                    } else if (get_stepdata.parameters != undefined) {
                        var splitinstance = get_stepdata.parameters[0].instance.split('/');
                        var lsinstance_GUID = splitinstance[splitinstance.length - 2];
                    } else {
                        var lsinstance_GUID = 0;
                    }
                } else if (JSONcombined_data['parameters'] != undefined) {
                    if (get_stepdata.parameters != undefined) {
                        var splitinstance = get_stepdata.parameters[0].instance.split('/');
                        var lsinstance_GUID = splitinstance[splitinstance.length - 2];
                    } else if (get_stepdata.questions != undefined) {
                        var splitinstance = get_stepdata.questions[0].instance.split('/');
                        var lsinstance_GUID = splitinstance[splitinstance.length - 2];
                    } else {
                        var lsinstance_GUID = 0;
                    }
                } else {
                    var lsinstance_GUID = 0;
                }

                var currentinstance_GUID = localStorage.getItem('GUID');
                if (currentinstance_GUID == lsinstance_GUID) {
                    // if the current instance GUID and localstorage instance GUID are equal, 
                    // then update the parameters & questions values via API
                    postupdateParameters.updateParametervalues(JSONcombined_data, parameters, step_name);
                    //submitExperimentdesign.submitExperimentdesign(JSONcombined_data, parameters);
                    postupdateQuestions.updateQuestionvalues(JSONcombined_data, parameters, step_name);
                } else {
                    // if the current instance GUID and localstorage instance GUID are not equal, 
                    // then post the parameters & questions values via API
                    postupdateParameters.postParametervalues(JSONcombined_data, parameters);
                    localStorage.setItem('SUBMIT_DESIGN', 1);
                    //submitExperimentdesign.submitExperimentdesign(JSONcombined_data, parameters);
                    postupdateQuestions.postQuestionvalues(JSONcombined_data, parameters);
                }
            } else {
                // if there is no step data regarding the current instance stored in the localstorage, 
                // then post the parameters & questions values via API
                postupdateParameters.postParametervalues(JSONcombined_data, parameters);
                localStorage.setItem('SUBMIT_DESIGN', 1);
                //submitExperimentdesign.submitExperimentdesign(JSONcombined_data, parameters);
                postupdateQuestions.postQuestionvalues(JSONcombined_data, parameters);
            }
        }

        /**
         * @ngdoc function
         * @name renderResults
         * @description
         * Get the experiment result from the local storage, which is retrieved from the API
         * and deployed the values inside the HTMl grid
         */

        $scope.renderResult = function () {
            $scope.stopBlink();
            retrieveExperimentresult.retrieveExperimentresult();
            var resultparse = JSON.parse(localStorage.getItem('EXPERIMENT_RESULT'));
            var resultlength = resultparse.results.length;
            var keynames = [];
            for (var key in resultparse.results[0]) {
                keynames.push(key);
            }
            var header = new Array(keynames[0]);
            var distance_array = [];
            var result_array = [];
            for (var t1 = 0; t1 < resultlength; t1++) {
                distance_array.push(resultparse.results[t1].distance);
                result_array.push(resultparse.results[t1].result);
            }
            var combined_array = new Array();
            for (var t2 = 0; t2 < resultlength; t2++) {
                combined_array.push(distance_array[t2] + ',' + result_array[t2]);
            }
            var no_of_trials = resultparse.results[0].result;
            no_of_trials = no_of_trials.split(',');
            for (var trial = 1; trial <= no_of_trials.length; trial++) {
                header.push('Trial' + trial)
            }
            var container = '<div class=\'containerDiv\'>';
            container += '<div class=\'rowDivHeader\'>';
            for (var i = 0; i < header.length; i++) {
                container += '<div class=\'cellDivHeader\'>' + header[i] + '</div>';
            }
            container += '</div>';
            for (var j = 0; j < combined_array.length; j++) {
                container += '<div class=\'rowDiv\'>';
                for (var k = 0; k < header.length; k++) {
                    var split_combined_array = combined_array[j].split(',');
                    container += '<div class=\'cellDiv\'>' + split_combined_array[k] + '</div>';
                }
                container += '</div>';
            }
            container += '</div>';
            $('#experiment_result').html(container);
            $('#graph_button').show();

            $(document).ready(function () {
                $('.slider-button').toggle(function () {
                    $(this).addClass('on').html('ON');
                    $('#graph').show();
                    renderGraph.renderGraph();
                }, function () {
                    $(this).removeClass('on').html('OFF');
                    $('#graph').hide();
                });
            });
        }

        /**
         * @ngdoc function
         * @name loadAdditionaldata
         * @description
         * Load additional data on page load in each step of the experiment
         */

        $scope.loadAdditionaldata = function () {
            var value = $location.path().substring($location.path().lastIndexOf('/') + 1);
            var index = parseInt(value.charAt(value.length - 1));
            var getlabjournal = JSON.parse(localStorage.getItem('LABJOURNAL_JSON_DATA'));
            var total_steps = getlabjournal.number_of_steps;
            var difference = Math.abs(index - total_steps);
            var last_step = total_steps - 1;
            $scope.Stepdesc = 'Step ' + index + ' of ' + last_step;

            if (getlabjournal.labjournalsteps[index] != undefined) {
                if (index < total_steps && index == 1) {
                    if (getlabjournal.labjournalsteps[index + 1] != undefined) {
                        document.getElementById('nav_next').style.display = 'block';
                        document.getElementById('home').style.display = 'block';
                    } else {
                        document.getElementById('nav_back').style.display = 'none';
                        document.getElementById('nav_next').style.display = 'none';
                        document.getElementById('home').style.display = 'none';
                    }
                } else if (index < total_steps && difference == 1) {
                    document.getElementById('nav_back').style.display = 'block';
                } else {
                    document.getElementById('nav_back').style.display = 'block';
                    document.getElementById('nav_next').style.display = 'block';
                    document.getElementById('home').style.display = 'block';
                }
            }
            var step_title = getlabjournal.labjournalsteps[index].journal_step_title;
            $scope.Labtitle = step_title;
            if (step_title == 'Analyze') {
                if (localStorage.getItem('SUBMIT_DESIGN') == 1) {
                    var runTime = 10;
                    $scope.runtimeInfotext = 'Your result will be available in ' + runTime + ' seconds!!!';
                    $scope.countDownTimer(runTime);
                }
                if (localStorage.getItem('SUBMIT_DESIGN') == 0) {
                    $('#viewresult').show();
                }
            }
        }

        /**
         * @ngdoc function
         * @name countDownTimer
         * @description
         * Count down the estimated runtime to get the result back after the submission
         * of the experiment design to the API
         * @param timer {Number} - The estimated runtime
         */

        $scope.countDownTimer = function (timer) {
            if (timer > 0) {
                var count = timer;
                $scope.startBlink('timercount');
                countdown = setInterval(function () {
                    $('#timercount').html(count);
                    $('#timercount').show();
                    if (count == 0) {
                        $scope.stopBlink();
                        $('#timercount').hide();
                        clearInterval(countdown);
                        $('#runtimemsg').hide();
                        $('#viewresult').show();
                        alert("Result is ready to view");
                        $scope.startBlink('viewresult')
                    }
                    count--;
                }, 1000);
            }
        }

        /**
         * @ngdoc function
         * @name startBlink
         * @description
         * Activate the blinking functionality to the specified HTML element
         * @param identity {String} - The identity of the specified HTML element
         */

        $scope.startBlink = function (identity) {
            $('#' + identity).blink(100, 900);
        }

        /**
         * @ngdoc function
         * @name stopBlink
         * @description
         * Deactivate the blinking functionality of the HTML element
         */

        $scope.stopBlink = function () {
            $('.blink').blink();
        }

        /**
         * @ngdoc function
         * @name loadContent
         * @description
         * Compile the HTML markup content and render inside the custom directive DOM element
         * @param content {HTML} - Compiled HTML DOM
         */

        $scope.loadContent = function (content) {
            $('.compile_content').append(content);
        }
    });