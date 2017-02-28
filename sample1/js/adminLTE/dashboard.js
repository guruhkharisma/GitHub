/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/

$(function() {
    "use strict";

    //Make the dashboard widgets sortable Using jquery UI
    $(".connectedSortable").sortable({
        placeholder: "sort-highlight",
        connectWith: ".connectedSortable",
        handle: ".box-header, .nav-tabs",
        forcePlaceholderSize: true,
        zIndex: 999999
    }).disableSelection();
    $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");
    //jQuery UI sortable for the todo list
    $(".todo-list").sortable({
        placeholder: "sort-highlight",
        handle: ".handle",
        forcePlaceholderSize: true,
        zIndex: 999999
    }).disableSelection();
    ;

    //bootstrap WYSIHTML5 - text editor
    $(".textarea").wysihtml5();

    $('.daterange').daterangepicker(
            {
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                    'Last 7 Days': [moment().subtract('days', 6), moment()],
                    'Last 30 Days': [moment().subtract('days', 29), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                },
                startDate: moment().subtract('days', 29),
                endDate: moment()
            },
    function(start, end) {
        alert("You chose: " + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    });

    /* jQueryKnob */
    $(".knob").knob();

    //jvectormap data
    var visitorsData = {
        "US": 398, //USA
        "SA": 400, //Saudi Arabia
        "CA": 1000, //Canada
        "DE": 500, //Germany
        "FR": 760, //France
        "CN": 300, //China
        "AU": 700, //Australia
        "BR": 600, //Brazil
        "IN": 800, //India
        "GB": 320, //Great Britain
        "RU": 3000 //Russia
    };
    //World map by jvectormap
    $('#world-map').vectorMap({
        map: 'world_mill_en',
        backgroundColor: "transparent",
        regionStyle: {
            initial: {
                fill: '#e4e4e4',
                "fill-opacity": 1,
                stroke: 'none',
                "stroke-width": 0,
                "stroke-opacity": 1
            }
        },
        series: {
            regions: [{
                    values: visitorsData,
                    scale: ["#92c1dc", "#ebf4f9"],
                    normalizeFunction: 'polynomial'
                }]
        },
        onRegionLabelShow: function(e, el, code) {
            if (typeof visitorsData[code] != "undefined")
                el.html(el.html() + ': ' + visitorsData[code] + ' new visitors');
        }
    });

    //Sparkline charts
    var myvalues = [1000, 1200, 920, 927, 931, 1027, 819, 930, 1021];
    $('#sparkline-1').sparkline(myvalues, {
        type: 'line',
        lineColor: '#92c1dc',
        fillColor: "#ebf4f9",
        height: '50',
        width: '80'
    });
    myvalues = [515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921];
    $('#sparkline-2').sparkline(myvalues, {
        type: 'line',
        lineColor: '#92c1dc',
        fillColor: "#ebf4f9",
        height: '50',
        width: '80'
    });
    myvalues = [15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21];
    $('#sparkline-3').sparkline(myvalues, {
        type: 'line',
        lineColor: '#92c1dc',
        fillColor: "#ebf4f9",
        height: '50',
        width: '80'
    });  
	
	myvalues = [15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21];
    $('#sparkline-4').sparkline(myvalues, {
        type: 'line',
        lineColor: '#92c1dc',
        fillColor: "#ebf4f9",
        height: '300',
        width: '629'
    });  	

    //The Calender
    $("#calendar").datepicker();

    //SLIMSCROLL FOR CHAT WIDGET
    // $('#chat-box').slimScroll({
    //     height: '250px'
    // });

    /* Morris.js Charts */
    // Sales chart
    /*var area = new Morris.Area({
        element: 'revenue-chart',
        resize: true,
        data: [
            {y: '2011 Q1', item1: 2666, item2: 2666},
            {y: '2011 Q2', item1: 2778, item2: 2294},
            {y: '2011 Q3', item1: 4912, item2: 1969},
            {y: '2011 Q4', item1: 3767, item2: 3597},
            {y: '2012 Q1', item1: 6810, item2: 1914},
            {y: '2012 Q2', item1: 5670, item2: 4293},
            {y: '2012 Q3', item1: 4820, item2: 3795},
            {y: '2012 Q4', item1: 15073, item2: 5967},
            {y: '2013 Q1', item1: 10687, item2: 4460},
            {y: '2013 Q2', item1: 8432, item2: 5713}
        ],
        xkey: 'y',
        ykeys: ['item1', 'item2'],
        labels: ['Item 1', 'Item 2'],
        lineColors: ['#a0d0e0', '#3c8dbc'],
        hideHover: 'auto'
    });
    var line = new Morris.Line({
        element: 'line-chart',
        resize: true,
        data: [
            {y: '2011 Q1', item1: 2666},
            {y: '2011 Q2', item1: 2778},
            {y: '2011 Q3', item1: 4912},
            {y: '2011 Q4', item1: 3767},
            {y: '2012 Q1', item1: 6810},
            {y: '2012 Q2', item1: 5670},
            {y: '2012 Q3', item1: 4820},
            {y: '2012 Q4', item1: 15073},
            {y: '2013 Q1', item1: 10687},
            {y: '2013 Q2', item1: 8432}
        ],
        xkey: 'y',
        ykeys: ['item1'],
        labels: ['Item 1'],
        lineColors: ['#efefef'],
        lineWidth: 2,
        hideHover: 'auto',
        gridTextColor: "#fff",
        gridStrokeWidth: 0.4,
        pointSize: 4,
        pointStrokeColors: ["#efefef"],
        gridLineColor: "#efefef",
        gridTextFamily: "Open Sans",
        gridTextSize: 10
    });
*/
    //Donut Chart
   /* var donut = new Morris.Donut({
        element: 'sales-chart',
        resize: true,
        colors: ["#3c8dbc", "#f56954", "#00a65a"],
        data: [
            {label: "Download Sales", value: 12},
            {label: "In-Store Sales", value: 30},
            {label: "Mail-Order Sales", value: 20}
        ],
        hideHover: 'auto'
    });*/
	
	 $('#quohitrate').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Quotation<br>hit rate',
            align: 'center',
            verticalAlign: 'middle',
            y: 50
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Quotation hit rate',
            innerSize: '50%',
            data: [
                ['PO',   80],
               
                {
                    name: 'No PO',
                    y: 20,
					 
                    dataLabels: {
                        enabled: false
                    }
                }
            ]
        }]
    });
	
	
	
	$('#funnel').highcharts({
        chart: {
            type: 'funnel',
            marginRight: 100
        },
        title: {
            text: 'Sales funnel',
            x: -50
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> ({point.y:,.0f})',
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    softConnector: true
                },
                neckWidth: '20%',
                neckHeight: '15%'

                //-- Other available options
                // height: pixels or percent
                // width: pixels or percent
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Values',
            data: [
                ['Introduction',   15654],
                ['Product Presentation',       4064],
                ['Product Arrangement', 1987],
                ['Quotation',    976],
                ['Negotiation',    846],
				['Financial Arrangement',    846],
				['PO Signing',    846],
				['DP Collection',    846],
				['Delivery Unit',    846],
				['BAST',    846],
				['Balance Collection',    846]
            ]
        }]
    });

												
    //Bar chart
    /*var bar = new Morris.Bar({
        element: 'revenue-chart',
        resize: true,
        data: [
            {y: 'Peria', a: 100, b: 85},
            {y: 'Wanto', a: 71, b: 85},
            {y: 'Taufik', a: 100, b: 85},
            {y: 'Jefry', a: 100, b: 85},
            {y: 'Fanany', a: 50, b: 85},
            {y: 'Rizal', a: 20, b: 85},
            {y: 'Widy', a: 50, b: 85}
        ],
        barColors: ['#00a65a', '#f56954'],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Actual Accuracy', 'Target'],
        hideHover: 'auto'
    });*/
	
	$('#revenue-chart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Sales Visit'
        },
        
        xAxis: {
            categories: [
                'Peria',
                'Wanto',
                'Taufik',
                'Jefry',
                'Fanany',
                'Rizal',
                'Widy'
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Visit'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Target',
            data: [60, 60,60,60,60,60,60]

        }, {
            name: 'Actual',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0]

        }]
    });
	
	//Bar chart
    /*var bar2 = new Morris.Bar({
        element: 'sales-chart',
        resize: true,
        data: [
            {y: 'Peria', a: 10, b: 60},
            {y: 'Wanto', a: 14, b: 60},
            {y: 'Taufik', a: 19, b: 60},
            {y: 'Jefry', a: 8, b: 60},
            {y: 'Fanany', a: 12, b: 60},
            {y: 'Rizal', a: 10, b: 60},
            {y: 'Widy', a: 4, b: 60}
        ],
        barColors: ['#00a65a', '#f56954'],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Actual Visit', 'Target'],
        hideHover: 'auto'
    });
    //Fix for charts under tabs
    $('.box ul.nav a').on('shown.bs.tab', function(e) {
       // area.redraw();
        //donut.redraw();
		bar.redraw();
		bar2.redraw();
    });*/
	
	$('#sales-chart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Sales Visit'
        },
        
        xAxis: {
            categories: [
                'Peria',
                'Wanto',
                'Taufik',
                'Jefry',
                'Fanany',
                'Rizal',
                'Widy'
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Visit'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Target Accuracy',
            data: [85,85,85,85,85,85,85]

        }, {
            name: 'Actual Accuracy',
            data: [83, 78, 98, 93, 76, 84, 56]

        }]
    });


    /* BOX REFRESH PLUGIN EXAMPLE (usage with morris charts) */
    // $("#loading-example").boxRefresh({
    //     source: "ajax/dashboard-boxrefresh-demo.php",
    //     onLoadDone: function(box) {
    //         bar = new Morris.Bar({
    //             element: 'bar-chart',
    //             resize: true,
    //             data: [
    //                 {y: '2006', a: 100, b: 90},
    //                 {y: '2007', a: 75, b: 65},
    //                 {y: '2008', a: 50, b: 40},
    //                 {y: '2009', a: 75, b: 65},
    //                 {y: '2010', a: 50, b: 40},
    //                 {y: '2011', a: 75, b: 65},
    //                 {y: '2012', a: 100, b: 90}
    //             ],
    //             barColors: ['#00a65a', '#f56954'],
    //             xkey: 'y',
    //             ykeys: ['a', 'b'],
    //             labels: ['CPU', 'DISK'],
    //             hideHover: 'auto'
    //         });
    //     }
    // });

    /* The todo list plugin */
    // $(".todo-list").todolist({
    //     onCheck: function(ele) {
    //         //console.log("The element has been checked")
    //     },
    //     onUncheck: function(ele) {
    //         //console.log("The element has been unchecked")
    //     }
    // });

});