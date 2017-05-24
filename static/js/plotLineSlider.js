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
        paper_bgcolor: 'rgb(222, 243, 233)',
        bgcolor: 'rgb(222, 243, 233)',
        plot_bgcolor: 'rgb(222, 243, 233)',
        xaxis: {
            rangeselector: getSelectorOptions(),
            rangeslider: {},
            title: "Date-Time"
        },
        yaxis: {
            fixedrange: true,
            title: ""
        },
        height: 400,
        width: 900
    };

    data[0].y = dataset["Air Flow"];
    layout.title = "Air Flow";
    layout.yaxis.title = "Pascal (pas)";
    Plotly.newPlot('airflowlinehistory', data, layout);

    data[0].y = dataset["AC Voltage"];
    layout.title = "AC Voltage";
    layout.yaxis.title = "Voltage (V)";
    Plotly.newPlot('acvoltagelinehistory', data, layout);

    data[0].y = dataset["AC Current"];
    layout.title = "AC Current";
    layout.yaxis.title = "Amps (A)";
    Plotly.newPlot('accurrentlinehistory', data, layout);

    data[0].y = dataset["Frequency"];
    layout.title = "Frequency (Hz)";
    layout.yaxis.title = "Hertz (Hz)";
    Plotly.newPlot('frequencylinehistory', data, layout);

    data[0].y = dataset["Power factor"];
    layout.title = "Power Factor";
    layout.yaxis.title = "Power factor";
    Plotly.newPlot('powerfactorlinehistory', data, layout);

    data[0].y = dataset["DC Voltage"];
    layout.title = "DC Voltage";
    layout.yaxis.title = "Voltage (V)";
    Plotly.newPlot('dcvoltagelinehistory', data, layout);

    data[0].y = dataset["DC Current"];
    layout.title = "DC Current";
    layout.yaxis.title = "Amps (A)";
    Plotly.newPlot('dccurrentlinehistory', data, layout);
}