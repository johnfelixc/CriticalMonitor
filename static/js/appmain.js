/**
 * Created by 34154 on 28-12-2016.
 */


function registerLiveEvents() {
    if (!!window.EventSource) {
        if(typeof(EventSource) !== "undefined") {
            $("#log").text("EventSource Supported");
        } else {
            $("#log").text("EventSource Not Supported");
        }
        var source = new EventSource("/events");
        source.onmessage = function(event) {
            var jsonData = JSON.parse(event.data);
            $("#data").text(jsonData.deviceId);
            $("#eventLog").text(event.data);
            var timestamp = new Date(jsonData["timestamp"] * 1000);

            updateGaugeACVoltage(jsonData["AC Voltage"]);
            updateLineACVoltage(timestamp, jsonData["AC Voltage"]);

            updateGaugeACCurrent(jsonData["AC Current"]);
            updateLineACCurrent(timestamp, jsonData["AC Current"]);

            updateGaugeFrequency(jsonData["Frequency"]);
            updateLineFrequency(timestamp, jsonData["Frequency"]);

            updateGaugePowerFactor(jsonData["Power factor"]);
            updateLinePowerFactor(timestamp, jsonData["Power factor"]);

            updateGaugeDCVoltage(jsonData["DC Voltage"]);
            updateLineDCVoltage(timestamp, jsonData["DC Voltage"]);

            updateGaugeDCCurrent(jsonData["DC Current"]);
            updateLineDCCurrent(timestamp, jsonData["DC Current"]);

            updateGaugeAirFlow(jsonData["Air Flow"]);
            updateLineAirFlow(timestamp, jsonData["Air Flow"]);
        }
    }
    else {
        $("#data").text("EventSource not found");
    }
}

function createLivePlots() {
    createGaugeACVoltage(0);
    createLineACVoltage();

    createGaugeACCurrent(0);
    createLineACCurrent();

    createGaugeFrequency(0);
    createLineFrequency();

    createGaugePowerFactor(0);
    createLinePowerFactor();

    createGaugeDCVoltage(0);
    createLineDCVoltage();

    createGaugeDCCurrent(0);
    createLineDCCurrent();

    createGaugeAirFlow(0);
    createLineAirFlow();
    
}