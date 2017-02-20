
import ibmiotf.application
import time
import sys
import json

tableRowTemplate = "%-33s%-30s%s"

class IoTDeviceClient(object):

    def __init__(self):
        self.eventStr = None
        self.statusStr = None
        self.eventCallbackFn = None
        self.eventCallbackDbFn = None
        self.eventCallbackRulesFn = None
        self.liveDeviceID = None
        self.devicesInfo = {}
        pass

    def logger(self):
        pass

    def initClient(self, options):
        try:
            self.client = ibmiotf.application.Client(options)
            #self.client.port = 443
            self.client.connect()

            deviceObj = self.client.api.getDevices(
                parameters={"_limit": 100, "_bookmark": None, "_sort": "typeId,deviceId"})

            devicesList = {}
            for devices in deviceObj["results"]:
                if devices["typeId"] in devicesList.keys():
                    devicesList[devices["typeId"]].append(devices["deviceId"])
                else:
                    devicesList[devices["typeId"]] = []
                    devicesList[devices["typeId"]].append(devices["deviceId"])

            self.devicesInfo["Devices"] = devicesList
            self.devicesInfo["DeviceCount"] = deviceObj["meta"]["total_rows"]


        except ibmiotf.ConfigurationException as e:
            print(str(e))
            sys.exit()
        except ibmiotf.UnsupportedAuthenticationMethod as e:
            print(str(e))
            sys.exit()
        except ibmiotf.ConnectionException as e:
            print(str(e))
            sys.exit()



        self.client.deviceEventCallback = self.eventCallback
        self.client.deviceStatusCallback = self.statusCallback
	
    def subscribeTopic(self, topic):

        deviceType = topic["deviceType"]
        deviceId = topic["deviceId"]
        event = topic["event"]

        #print(json.dumps(topic))

        self.client.subscribeToDeviceEvents(deviceType, deviceId, event)
        self.client.subscribeToDeviceStatus(deviceType, deviceId)

    def eventCallback(self, event):
        #print("Event")
        #print(json.dumps(event.data))
        jsonData = {}
        jsonData["timestamp"] = event.timestamp.timestamp()
        jsonData["event"] = event.event
        jsonData["deviceId"] = event.deviceId
        jsonData["deviceType"] = event.deviceType
        jsonData.update(event.data)

        if self.eventCallbackDbFn is not None:
            self.eventCallbackDbFn(jsonData)

        if self.eventCallbackRulesFn is not None:
            self.eventCallbackRulesFn(jsonData)

        if event.deviceId == self.liveDeviceID:
            self.eventStr = json.dumps(jsonData)
            if self.eventCallbackFn is not None:
                self.eventCallbackFn(jsonData)

    def statusCallback(self, status):
        #print("Status")
        #print(type(status))
        dataStr = ""
        if status.action == "Disconnect" :
            dataStr = tableRowTemplate % (status.time.isoformat(), status.device, status.action + " " + status.clientAddr + " (" + status.reason + ")")
        else:
            dataStr = tableRowTemplate % (status.time.isoformat(), status.device, status.action + " " + status.clientAddr)
        self.statusStr =  dataStr
        print(dataStr)

    def setLiveDevice(self, deviceID):
        if deviceID is not None:
            self.liveDeviceID = deviceID

    def setEventCallbackFunc(self, callbackFn):
        if callbackFn is not None:
            self.eventCallbackFn = callbackFn

    def setEventCallbackDbFunc(self, callbackFn):
        if callbackFn is not None:
            self.eventCallbackDbFn = callbackFn

    def setEventCallbackRulesFunc(self, callbackFn):
        if callbackFn is not None:
            self.eventCallbackRulesFn = callbackFn

    def getDeviceInfo(self):
        return self.devicesInfo


if __name__ == "__main__":

    iotClient = IoTDeviceClient()


    organization = "2073pd"
    appId = "aaa" + "b827ebc03307"
    authMethod = "apikey"
    authKey = "a-2073pd-3tmtatvatt"
    authToken = "YAOw?gIgR1YGU01g)E"
    deviceType = "RaspberryPi"
    deviceId = "b827ebc03307"
    event = "status"

    options = {"org": organization, "id": appId, "auth-method": authMethod, "auth-key": authKey, "auth-token": authToken}
    topic = {"deviceType": "+", "deviceId": "+", "event": "sensor"}
    iotClient.initClient(options)
    deviceObj = iotClient.client.api.getDevices(parameters = {"_limit": 100, "_bookmark": None, "_sort": "typeId,deviceId"})

    devicesList = {}
    devicesInfo = {}
    for devices in deviceObj["results"]:
        if devices["typeId"] in devicesList.keys():
            devicesList[devices["typeId"]].append(devices["deviceId"])
        else:
            devicesList[devices["typeId"]] = []
            devicesList[devices["typeId"]].append(devices["deviceId"])


    devicesInfo["Devices"] = devicesList
    devicesInfo["DeviceCount"] = deviceObj["meta"]["total_rows"]

    print(iotClient.getDeviceInfo())

    #iotClient.subscribeTopic(topic)

    while False:
        time.sleep(1)

    


    


        

        
