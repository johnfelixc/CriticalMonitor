/**
 * Created by 34154 on 16-12-2016.
 */
function createLineACVoltage() {

    var trace3 = {
      x: [],
      y: [],
      mode: 'lines+markers',
      name: 'Scatter and Lines'
    };

    var data = [trace3];

    var layout = {
      title: 'AC Voltage (in volts)',
        paper_bgcolor: 'rgb(222, 243, 233)',
        bgcolor: 'rgb(222, 243, 233)',
        plot_bgcolor: 'rgb(222, 243, 233)',
      xaxis: {
        title: 'Time'
      },
      yaxis: {
        title: 'Voltage (V)'
      },
      height: 400,
      width: 450
    };

    Plotly.newPlot('acvoltageline', data, layout);
}

function updateLineACVoltage(x, y){

     var plotDiv = document.getElementById('acvoltageline');

    plotDiv.data[0].x.push(x);
    plotDiv.data[0].y.push(y);

    Plotly.redraw(plotDiv);
}

function createLineACCurrent() {

    var trace3 = {
      x: [],
      y: [],
      mode: 'lines+markers',
      name: 'Scatter and Lines'
    };

    var data = [trace3];

    var layout = {
      title: 'AC Current (in amps)',
        paper_bgcolor: 'rgb(222, 243, 233)',
        bgcolor: 'rgb(222, 243, 233)',
        plot_bgcolor: 'rgb(222, 243, 233)',
      xaxis: {
        title: 'Time'
      },
      yaxis: {
        title: 'Amps (A)'
      },
      height: 400,
      width: 450
    };

    Plotly.newPlot('accurrentline', data, layout);
}

function updateLineACCurrent(x, y){

    var plotDiv = document.getElementById('accurrentline');

    plotDiv.data[0].x.push(x);
    plotDiv.data[0].y.push(y);

    Plotly.redraw(plotDiv);
}

function createLineFrequency() {

    var trace3 = {
      x: [],
      y: [],
      mode: 'lines+markers',
      name: 'Scatter and Lines'
    };

    var data = [trace3];

    var layout = {
      title: 'Frequency (in Hz)',
        paper_bgcolor: 'rgb(222, 243, 233)',
        bgcolor: 'rgb(222, 243, 233)',
        plot_bgcolor: 'rgb(222, 243, 233)',
      xaxis: {
        title: 'Time'
      },
      yaxis: {
        title: 'Hertz (Hz)'
      },
      height: 400,
      width: 450
    };

    Plotly.newPlot('frequencyline', data, layout);
}

function updateLineFrequency(x, y){

    var plotDiv = document.getElementById('frequencyline');

    plotDiv.data[0].x.push(x);
    plotDiv.data[0].y.push(y);

    Plotly.redraw(plotDiv);
}

function createLinePowerFactor() {

    var trace3 = {
      x: [],
      y: [],
      mode: 'lines+markers',
      name: 'Scatter and Lines'
    };

    var data = [trace3];

    var layout = {
      title: 'Power Factor',
        paper_bgcolor: 'rgb(222, 243, 233)',
        bgcolor: 'rgb(222, 243, 233)',
        plot_bgcolor: 'rgb(222, 243, 233)',
      xaxis: {
        title: 'Time'
      },
      yaxis: {
        title: 'Power Factor'
      },
      height: 400,
      width: 450
    };

    Plotly.newPlot('powerfactorline', data, layout);
}

function updateLinePowerFactor(x, y){

    var plotDiv = document.getElementById('powerfactorline');

    plotDiv.data[0].x.push(x);
    plotDiv.data[0].y.push(y);

    Plotly.redraw(plotDiv);
}

function createLineDCVoltage() {

    var trace3 = {
      x: [],
      y: [],
      mode: 'lines+markers',
      name: 'Scatter and Lines'
    };

    var data = [trace3];

    var layout = {
      title: 'DC Voltage (in volts)',
        paper_bgcolor: 'rgb(222, 243, 233)',
        bgcolor: 'rgb(222, 243, 233)',
        plot_bgcolor: 'rgb(222, 243, 233)',
      xaxis: {
        title: 'Time'
      },
      yaxis: {
        title: 'Voltage (V)'
      },
      height: 400,
      width: 450
    };

    Plotly.newPlot('dcvoltageline', data, layout);
}

function updateLineDCVoltage(x, y){

     var plotDiv = document.getElementById('dcvoltageline');

    plotDiv.data[0].x.push(x);
    plotDiv.data[0].y.push(y);

    Plotly.redraw(plotDiv);
}

function createLineDCCurrent() {

    var trace3 = {
      x: [],
      y: [],
      mode: 'lines+markers',
      name: 'Scatter and Lines'
    };

    var data = [trace3];

    var layout = {
      title: 'DC Current (in amps)',
        paper_bgcolor: 'rgb(222, 243, 233)',
        bgcolor: 'rgb(222, 243, 233)',
        plot_bgcolor: 'rgb(222, 243, 233)',
      xaxis: {
        title: 'Time'
      },
      yaxis: {
        title: 'Amps (A)'
      },
      height: 400,
      width: 450
    };

    Plotly.newPlot('dccurrentline', data, layout);
}

function updateLineDCCurrent(x, y){

    var plotDiv = document.getElementById('dccurrentline');

    plotDiv.data[0].x.push(x);
    plotDiv.data[0].y.push(y);

    Plotly.redraw(plotDiv);
}

function createLineAirFlow() {

    var trace3 = {
      x: [],
      y: [],
      mode: 'lines+markers',
      name: 'Scatter and Lines'
    };

    var data = [trace3];

    var layout = {
      title: 'Air Flow (in pascal)',
        paper_bgcolor: 'rgb(222, 243, 233)',
        bgcolor: 'rgb(222, 243, 233)',
        plot_bgcolor: 'rgb(222, 243, 233)',
      xaxis: {
        title: 'Time'
      },
      yaxis: {
        title: 'Pascal (pas)'
      },
      height: 400,
      width: 450
    };

    Plotly.newPlot('airflowline', data, layout);
}

function updateLineAirFlow(x, y){

    var plotDiv = document.getElementById('airflowline');

    plotDiv.data[0].x.push(x);
    plotDiv.data[0].y.push(y);

    Plotly.redraw(plotDiv);
}