var mobileapp = angular.module('services.renderGraph', []);
mobileapp.service('renderGraph', function () {
    /**
     * @ngdoc function
     * @name highchartsGraph
     * @description
     * Define the properties of the highgraph thrid party library to deploy the graph
     */

    this.highchartsGraph = function (distance) {
        //retrieveExperimentresult.retrieveExperimentresult();
        var chart = $("#graph").highcharts({
            colors: ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
                "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"
            ],
            chart: {
                type: 'line',
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, 'rgb(96, 96, 96)'],
                        [1, 'rgb(16, 16, 16)']
                    ]
                },
                borderColor: '#000000',
                borderWidth: 2,
                className: 'dark-container',
                plotBackgroundColor: 'rgba(255, 255, 255, .1)',
                plotBorderColor: '#CCCCCC',
                plotBorderWidth: 1
            },
            title: {
                style: {
                    color: '#FFF',
                    font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                },
                text: 'Radioactivity'
            },
            legend: {
                itemStyle: {
                    color: '#CCC'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#333'
                }
            },
            tooltip: {
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, 'rgba(96, 96, 96, .8)'],
                        [1, 'rgba(16, 16, 16, .8)']
                    ]
                },
                borderWidth: 0,
                style: {
                    color: '#FFF'
                },
                formatter: function () {
                    return 'Distance: <b>' + this.x + '</b><br/>Intensity: <b>' + this.y + '</b> (' + this.series.name + ')';
                }
            },
            xAxis: {
                gridLineColor: '#333333',
                gridLineWidth: 1,
                labels: {
                    style: {
                        color: '#A0A0A0'
                    }
                },
                lineColor: '#A0A0A0',
                tickColor: '#A0A0A0',
                categories: distance,
                title: {
                    style: {
                        color: '#1589ff',
                        font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                    },
                    text: 'Distance'
                }
            },
            yAxis: {
                gridLineColor: '#333333',
                labels: {
                    style: {
                        color: '#A0A0A0'
                    }
                },
                lineColor: '#A0A0A0',
                minorTickInterval: null,
                tickColor: '#A0A0A0',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#1589ff',
                        font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                    },
                    text: 'Intensity( Particle Counts)'
                }
            },
            series: []
        });
    }

    /**
     * @ngdoc function
     * @name renderGraph
     * @description
     * Define the properties of the highgraph thrid party library to deploy the graph
     */

    this.renderGraph = function () {
        this.highchartsGraph();
        var getresult = localStorage.getItem('EXPERIMENT_RESULT');
        var resultlength = JSON.parse(getresult).results.length;

        var distance_array = new Array();
        var series_array = new Array();
        for (var loop = 0; loop < resultlength; loop++) {
            distance_array[loop] = JSON.parse(getresult).results[loop].distance;
            series_array[loop] = JSON.parse(getresult).results[loop].result;
        }

        var chart = $('#graph').highcharts();
        // Dynamically assign the array of xAxis values into the highchart graph object
        chart.xAxis[0].update({
            categories: distance_array
        });
        var Trial1 = new Array(); var Trial2 = new Array(); var Trial3 = new Array(); var Trial4 = new Array(); var Trial5 = new Array();
        var Trial6 = new Array(); var Trial7 = new Array(); var Trial8 = new Array(); var Trial9 = new Array(); var Trial10 = new Array();
        for (var sl = 0; sl < series_array.length; sl++) {
            var trial_l = series_array[sl].split(',').length;
            for (var tl = 1; tl <= trial_l; tl++) {
                var trial_s = series_array[sl].split(',');
                switch (tl) {
                case 1: Trial1.push(parseInt(trial_s[tl - 1])); break;
                case 2: Trial2.push(parseInt(trial_s[tl - 1])); break;
                case 3: Trial3.push(parseInt(trial_s[tl - 1])); break;
                case 4: Trial4.push(parseInt(trial_s[tl - 1])); break;
                case 5: Trial5.push(parseInt(trial_s[tl - 1])); break;
                case 6: Trial6.push(parseInt(trial_s[tl - 1])); break;
                case 7: Trial7.push(parseInt(trial_s[tl - 1])); break;
                case 8: Trial8.push(parseInt(trial_s[tl - 1])); break;
                case 9: Trial9.push(parseInt(trial_s[tl - 1])); break;
                case 10: Trial10.push(parseInt(trial_s[tl - 1])); break;
                }
            }
        }
        var combine = new Array();
        combine.push(Trial1, Trial2, Trial3, Trial4, Trial5, Trial6, Trial7, Trial8, Trial9, Trial10);
        for (key in combine) {
            if (combine[key] != '') {
                var trial_name = 'Trial' + (parseInt(key) + 1);
                // Dynamically assign the array of yAxis values along with the trial name into the highchart graph object
                chart.addSeries({
                    name: trial_name,
                    data: combine[key]
                });
            }
        }
    }
});