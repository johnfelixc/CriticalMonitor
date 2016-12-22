/**
 * Created by 34154 on 19-12-2016.
 */



function getSelectorOptions() {
    var selectorOptions = {
        buttons: [{
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1m'
        }, {
            step: 'month',
            stepmode: 'backward',
            count: 6,
            label: '6m'
        }, {
            step: 'year',
            stepmode: 'todate',
            count: 1,
            label: 'YTD'
        }, {
            step: 'year',
            stepmode: 'backward',
            count: 1,
            label: '1y'
        }, {
            step: 'all'
        }]
    };

    return selectorOptions;
}

function createLineSliderPlot(dataset) {

    var timestampElements = dataset.timestamp.map(function(e) {
        var dateNew = new Date(e * 1000);
        e = dateNew.toISOString();
        return e;
    });

    var data = [{
        mode: 'lines+markers',
        x: timestampElements,
        y: dataset["Air Flow"]
    }];
    var layout = {
        title: 'Air Flow',
        xaxis: {
            rangeselector: getSelectorOptions(),
            rangeslider: {}
        },
        yaxis: {
            fixedrange: true
        }
    };

    data[0].y = dataset["Air Flow"];
    layout.title = "Air Flow";
    Plotly.newPlot('airflowlinehistory', data, layout);

    data[0].y = dataset["AC Voltage"];
    layout.title = "AC Voltage";
    Plotly.newPlot('acvoltagelinehistory', data, layout);

    data[0].y = dataset["AC Current"];
    layout.title = "AC Current";
    Plotly.newPlot('accurrentlinehistory', data, layout);

    data[0].y = dataset["DC Voltage"];
    layout.title = "DC Voltage";
    Plotly.newPlot('dcvoltagelinehistory', data, layout);

    data[0].y = dataset["DC Current"];
    layout.title = "DC Current";
    Plotly.newPlot('dccurrentlinehistory', data, layout);
}

function createLineSliderAirFlow(timeData, sensorData) {

    var data = [{
        mode: 'lines',
        x: timeData,
        y: sensorData
    }];
    var layout = {
        title: 'Air Flow',
        xaxis: {
            rangeselector: getSelectorOptions(),
            rangeslider: {}
        },
        yaxis: {
            fixedrange: true
        }
    };

    Plotly.newPlot('airflowlinehistory', data, layout);
}