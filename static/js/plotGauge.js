/**
 * Created by John Felix CJ on 14-12-2016.
 */

function formatPathMeterPoint(value, maxLevel ) {

    var level = value * (180 / maxLevel);


    // Trig to calc meter point
    var degrees = 180 - level,
         radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
         pathX = String(x),
         space = ' ',
         pathY = String(y),
         pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    return path;
}

function getDataTemplate(){

    var data = [{ type: 'scatter',
       x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        hoverinfo: 'text+name'},
      { values: [50/5, 50/5, 50/5, 50/5, 50/5, 50],
      rotation: 90,
      textinfo: 'text',
      textposition:'inside',
      marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                             'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                             'rgba(210, 206, 145, .5)', 'rgba(255, 255, 255, 0)']},
      labels: ['151-180', '121-150', '91-120', '61-90', '31-60', ''],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];

    return data;

}

function getLayoutTemplate() {

    var layout = {
      shapes:[{
          type: 'path',
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      height: 450,
      width: 450,
        paper_bgcolor: 'rgb(222, 243, 233)',
        bgcolor: 'rgb(222, 243, 233)',
        plot_bgcolor: 'rgb(222, 243, 233)',
      xaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]}

    };

    return layout;
}

function createGaugeACVoltage(plotData) {

    var data = getDataTemplate();
    data[0].text = plotData;
    data[0].name = "AC Voltage";
    data[1].values = [50/5, 50/5, 50/5, 50/5, 50/5, 50];
    data[1].text = ['Spike', 'Over <br> Voltage', 'Normal', 'Low <br> Voltage', 'Off', ''];
    data[1].labels = ['151-180', '121-150', '91-120', '61-90', '31-60', ''];
    data[1].marker.colors = ['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                             'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                             'rgba(210, 206, 145, .5)', 'rgba(255, 255, 255, 0)'];

    var layout = getLayoutTemplate();
    layout.shapes[0].path = formatPathMeterPoint(plotData, 300);
    layout.title = "<b>AC Voltage</b> <br> Voltage: ";
    layout.title = layout.title.concat(plotData.toString());
    layout.title = layout.title.concat(" Volts");

    Plotly.newPlot("acvoltagegauge", data, layout);
}

function updateGaugeACVoltage(plotData) {

    var plotDiv = document.getElementById('acvoltagegauge');

    plotDiv.data[0].text = plotData;
    plotDiv.layout.shapes[0].path = formatPathMeterPoint(plotData, 300);
    plotDiv.layout.title = "<b>AC Voltage</b> <br> Voltage: ";
    plotDiv.layout.title = plotDiv.layout.title.concat(plotData.toString());
    plotDiv.layout.title = plotDiv.layout.title.concat(" Volts");

    Plotly.redraw(plotDiv);

}

function createGaugeACCurrent(plotData) {

    var data = getDataTemplate();
    data[0].text = plotData;
    data[0].name = "AC Current";
    data[1].values = [50/5, 50/5, 50/5, 50/5, 50/5, 50];
    data[1].text = ['Short', 'Over <br> Load', 'Normal', 'Low <br> Current', 'Off', ''];
    data[1].labels = ['151-180', '121-150', '91-120', '61-90', '31-60', ''];
    data[1].marker.colors = ['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                             'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                             'rgba(210, 206, 145, .5)', 'rgba(255, 255, 255, 0)'];

    var layout = getLayoutTemplate();
    layout.shapes[0].path = formatPathMeterPoint(plotData, 20);
    layout.title = "<b>AC Current</b> <br> Current: ";
    layout.title = layout.title.concat(plotData.toString());
    layout.title = layout.title.concat(" Amps");

    Plotly.newPlot("accurrentgauge", data, layout);
}

function updateGaugeACCurrent(plotData) {

    var plotDiv = document.getElementById('accurrentgauge');

    plotDiv.data[0].text = plotData;
    plotDiv.layout.shapes[0].path = formatPathMeterPoint(plotData, 20);
    plotDiv.layout.title = "<b>AC Current</b> <br> Current: ";
    plotDiv.layout.title = plotDiv.layout.title.concat(plotData.toString());
    plotDiv.layout.title = plotDiv.layout.title.concat(" Amps");

    Plotly.redraw(plotDiv);

}

function createGaugeFrequency(plotData) {

    var data = getDataTemplate();
    data[0].text = plotData;
    data[0].name = "Frequency (Hz)";
    data[1].values = [50/5, 50/5, 50/5, 50/5, 50/5, 50];
    data[1].text = ['Off', 'Low <br> Frequency', 'Normal', 'High <br> Frequency', 'Off', ''];
    data[1].labels = ['0', '121-150', '91-120', '61-90', '31-60', ''];
    data[1].marker.colors = ['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                             'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                             'rgba(210, 206, 145, .5)', 'rgba(255, 255, 255, 0)'];

    var layout = getLayoutTemplate();
    layout.shapes[0].path = formatPathMeterPoint(plotData, 20);
    layout.title = "<b>Frequency</b> <br> Current: ";
    layout.title = layout.title.concat(plotData.toString());
    layout.title = layout.title.concat(" Hz");

    Plotly.newPlot("frequencygauge", data, layout);
}

function updateGaugeFrequency(plotData) {

    var plotDiv = document.getElementById('frequencygauge');

    plotDiv.data[0].text = plotData;
    plotDiv.layout.shapes[0].path = formatPathMeterPoint(plotData, 20);
    plotDiv.layout.title = "<b>Frequency</b> <br> Current: ";
    plotDiv.layout.title = plotDiv.layout.title.concat(plotData.toString());
    plotDiv.layout.title = plotDiv.layout.title.concat(" Hz");

    Plotly.redraw(plotDiv);

}

function createGaugePowerFactor(plotData) {

    var data = getDataTemplate();
    data[0].text = plotData;
    data[0].name = "Power Factor";
    data[1].values = [50/5, 50/5, 50/5, 50/5, 50/5, 50];
    data[1].text = ['Off', 'Poor', 'Normal', 'Poor', 'Off', ''];
    data[1].labels = ['0', '121-150', '91-120', '61-90', '31-60', ''];
    data[1].marker.colors = ['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                             'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                             'rgba(210, 206, 145, .5)', 'rgba(255, 255, 255, 0)'];

    var layout = getLayoutTemplate();
    layout.shapes[0].path = formatPathMeterPoint(plotData, 20);
    layout.title = "<b>Power Factor</b> <br> Current: ";
    layout.title = layout.title.concat(plotData.toString());

    Plotly.newPlot("powerfactorgauge", data, layout);
}

function updateGaugePowerFactor(plotData) {

    var plotDiv = document.getElementById('powerfactorgauge');

    plotDiv.data[0].text = plotData;
    plotDiv.layout.shapes[0].path = formatPathMeterPoint(plotData, 20);
    plotDiv.layout.title = "<b>Power Factor</b> <br> Current: ";
    plotDiv.layout.title = plotDiv.layout.title.concat(plotData.toString());

    Plotly.redraw(plotDiv);

}

function createGaugeDCVoltage(plotData) {

    var data = getDataTemplate();
    data[0].text = plotData;
    data[0].name = "DC Voltage";
    data[1].values = [50/5, 50/5, 50/5, 50/5, 50/5, 50];
    data[1].text = ['Spike', 'Over <br> Voltage', 'Normal', 'Low <br> Voltage', 'Off', ''];
    data[1].labels = ['151-180', '121-150', '91-120', '61-90', '31-60', ''];
    data[1].marker.colors = ['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                             'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                             'rgba(210, 206, 145, .5)', 'rgba(255, 255, 255, 0)'];

    var layout = getLayoutTemplate();
    layout.shapes[0].path = formatPathMeterPoint(plotData, 30);
    layout.title = "<b>DC Voltage</b> <br> Voltage: ";
    layout.title = layout.title.concat(plotData.toString());
    layout.title = layout.title.concat(" Volts");

    Plotly.newPlot("dcvoltagegauge", data, layout);
}

function updateGaugeDCVoltage(plotData) {

    var plotDiv = document.getElementById('dcvoltagegauge');

    plotDiv.data[0].text = plotData;
    plotDiv.layout.shapes[0].path = formatPathMeterPoint(plotData, 30);
    plotDiv.layout.title = "<b>DC Voltage</b> <br> Voltage: ";
    plotDiv.layout.title = plotDiv.layout.title.concat(plotData.toString());
    plotDiv.layout.title = plotDiv.layout.title.concat(" Volts");

    Plotly.redraw(plotDiv);

}

function createGaugeDCCurrent(plotData) {

    var data = getDataTemplate();
    data[0].text = plotData;
    data[0].name = "DC Current";
    data[1].values = [50/5, 50/5, 50/5, 50/5, 50/5, 50];
    data[1].text = ['Short', 'Over <br> Load', 'Normal', 'Low <br> Current', 'Off', ''];
    data[1].labels = ['151-180', '121-150', '91-120', '61-90', '31-60', ''];
    data[1].marker.colors = ['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                             'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                             'rgba(210, 206, 145, .5)', 'rgba(255, 255, 255, 0)'];

    var layout = getLayoutTemplate();
    layout.shapes[0].path = formatPathMeterPoint(plotData, 40);
    layout.title = "<b>DC Current</b> <br> Current: ";
    layout.title = layout.title.concat(plotData.toString());
    layout.title = layout.title.concat(" Amps");

    Plotly.newPlot("dccurrentgauge", data, layout);
}

function updateGaugeDCCurrent(plotData) {

    var plotDiv = document.getElementById('dccurrentgauge');

    plotDiv.data[0].text = plotData;
    plotDiv.layout.shapes[0].path = formatPathMeterPoint(plotData, 40);
    plotDiv.layout.title = "<b>DC Current</b> <br> Current: ";
    plotDiv.layout.title = plotDiv.layout.title.concat(plotData.toString());
    plotDiv.layout.title = plotDiv.layout.title.concat(" Amps");

    Plotly.redraw(plotDiv);

}

function createGaugeAirFlow(plotData) {

    var data = getDataTemplate();
    data[0].text = plotData;
    data[0].name = "Air Flow";
    data[1].values = [50/5, 50/5, 50/5, 50/5, 50/5, 50];
    data[1].text = ['High', 'Over <br> Flow', 'Normal', 'Less <br> Flow', 'No Flow', ''];
    data[1].labels = ['151-180', '121-150', '91-120', '61-90', '31-60', ''];
    data[1].marker.colors = ['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                             'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                             'rgba(210, 206, 145, .5)', 'rgba(255, 255, 255, 0)'];


    var layout = getLayoutTemplate();
    layout.shapes[0].path = formatPathMeterPoint(plotData, 700);
    layout.title = "<b>Air Flow</b> <br> Air Pressure: ";
    layout.title = layout.title.concat(plotData.toString());
    layout.title = layout.title.concat(" Pascal");

    Plotly.newPlot("airflowgauge", data, layout);
}

function updateGaugeAirFlow(plotData) {

    var plotDiv = document.getElementById('airflowgauge');

    plotDiv.data[0].text = plotData;
    plotDiv.layout.shapes[0].path = formatPathMeterPoint(plotData, 700);
    plotDiv.layout.title = "<b>Air Flow</b> <br> Air Pressure: ";
    plotDiv.layout.title = plotDiv.layout.title.concat(plotData.toString());
    plotDiv.layout.title = plotDiv.layout.title.concat(" Pascal");

    Plotly.redraw(plotDiv);

}