
from MessageClient import MessageClient
from jsonLogic import jsonLogic
import time

class RulesEngine(object):

    def __init__(self):
        self.currRules = []
        self.triggeredRules = {}
        self.messenger = MessageClient()
        pass

    def loadRulesFromDB(self, dbClient):
        self.currRules = dbClient.queryAlerts()
        #print(self.currRules)
        return

    def addRulesToEngine(self, rule):
        #print(rule)
        self.currRules.append(rule)
        #print(self.currRules)
        return

    def applyRules(self, eventdata):
        #print("Event Data")
        #print(eventdata)
        for ruleDoc in self.currRules:
            #print("Applying rule")
            #print(ruleDoc["rules"])
            if jsonLogic(ruleDoc["rules"], eventdata):
                refreshDuration = 30 #default refresh duration - 30 seconds
                ruleID = ruleDoc["id"]
                msgNow = False

                if "refresh" in ruleDoc:
                    refreshDuration = ruleDoc["refresh"]

                #print("Refresh Duration: " + str(refreshDuration))
                if ruleID in self.triggeredRules:
                    timediff = time.time() - self.triggeredRules[ruleID]
                    if timediff > refreshDuration:
                        #print("Refreshed Alert")
                        self.sendMessage(ruleDoc)
                        self.triggeredRules[ruleID] = time.time()
                    else:
                        timediff = 0
                        #print("Deferred Alert")
                else:
                    #print("New Alert")
                    self.sendMessage(ruleDoc)
                    self.triggeredRules[ruleID] = time.time()


        return

    def sendMessage(self, ruleDoc):
        if "email" in ruleDoc:
            self.messenger.alertEMail(ruleDoc["email"], ruleDoc["message"])
        if "sms" in ruleDoc:
            self.messenger.alertSMS(ruleDoc["sms"], ruleDoc["message"])
        return
