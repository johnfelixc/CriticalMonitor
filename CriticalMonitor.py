import os
from flask import Flask, Response, redirect, request, url_for, jsonify
from IoTDeviceClient import IoTDeviceClient
from Environ import config
from CloudantClient import CloudantClient
import time, datetime
from RulesEngine import RulesEngine

app = Flask(__name__)

iotClient = IoTDeviceClient()
dbClient = CloudantClient()
alertEngine = RulesEngine()

@app.route("/")
def index():
    return redirect(url_for('static', filename='index.html'))

@app.route("/events")
def events():
    tmp = "data: %s\n\n" % (iotClient.eventStr)
    return Response(tmp, content_type='text/event-stream')

@app.route("/livedeviceselect")
def livedeviceselect():
    #print(request.args)
    deviceId = request.args.get('deviceId')

    if deviceId and not (deviceId == "all"):
        iotClient.setLiveDevice(deviceId)

    strres = "Live device " + deviceId + " selected."

    return jsonify(result=strres)

@app.route("/addrule", methods=['GET', 'POST'])
def addrule():

    ruleDoc = request.get_json()
    #print(ruleDoc)

    dbClient.addAlert(ruleDoc)
    alertEngine.addRulesToEngine(ruleDoc)

    return jsonify(result="Rule added successfully.")

@app.route("/getrule", methods=['GET', 'POST'])
def getrule():
    return jsonify(result=dbClient.queryAlerts())

@app.route("/getsettings", methods=['GET', 'POST'])
def getsettings():
    return jsonify(result=config)

@app.route("/query")
def query():
    #print(request.args)
    deviceId = request.args.get('deviceId')
    deviceType = request.args.get("deviceType")
    starttime = request.args.get("starttime")
    endtime = request.args.get("endtime")
    jsonQuery = {}
    if deviceId and not (deviceId == "all"):
        jsonQuery["deviceId"] = deviceId

    if deviceType and not (deviceType == "all"):
        jsonQuery["deviceType"] =  deviceType

    dateRange = {}
    if starttime:
        dateRange["$gte"] = time.mktime(datetime.datetime.strptime(starttime, "%Y-%m-%dT%H:%M").timetuple())
    if endtime:
        dateRange["$lte"] = time.mktime(datetime.datetime.strptime(endtime, "%Y-%m-%dT%H:%M").timetuple())

    if dateRange:
        jsonQuery["timestamp"] = dateRange

    #print(jsonQuery)
    jsonData = dbClient.queryDoc(jsonQuery, ["timestamp", "Air Flow", "AC Voltage", "AC Current", "DC Voltage", "DC Current"])
    #print(jsonData)

    return jsonify(result=jsonData)

port = os.getenv('PORT', '5000')

if __name__ == "__main__": 


    appId = "aaa" + "b827ebc03307"
    deviceType = "RaspberryPi"
    deviceId = "b827ebc03307"
    event = "status"

    options = {"org": config["organization"], "id": appId, "auth-method": config["authMethod"], "auth-key": config["authKey"], "auth-token": config["authToken"]}
    topic = {"deviceType": "+", "deviceId": "+", "event": "sensor"}
    iotClient.initClient(options)

    dbClient.connectCloud()
    dbClient.openDB()

    alertEngine.loadRulesFromDB(dbClient)

    iotClient.setEventCallbackDbFunc(dbClient.addDocument)
    iotClient.setEventCallbackRulesFunc(alertEngine.applyRules)
    iotClient.subscribeTopic(topic)

    print("Starting webapp...")
    app.run(host='0.0.0.0', port=int(port))
    dbClient.close()

