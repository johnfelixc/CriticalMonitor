import os
import json
from Environ import config
# Use Cloudant to create a Cloudant client using account
from cloudant.client import Cloudant
from cloudant.query import Query

class CloudantClient(object):

    def __init__(self, docDB=None, rulesDB=None):
        self.client = Cloudant(config["dbUsername"], config["dbPassword"], account=config["dbAccount"])
        self.query = None
        self.currDocDB = None
        self.currAlertsDB = None

        if docDB is not None:
            self.docDB = docDB
        else:
            self.docDB = config["docDB"]

        if rulesDB is not None:
            self.rulesDB = rulesDB
        else:
            self.rulesDB = config["alertsDB"]

    def connectCloud(self):
        self.client.connect()

    def openDB(self):
        try:
            self.currDocDB = self.client[self.docDB]
        except (KeyError):
            self.currDocDB = self.client.create_database(self.docDB)

        try:
            self.currAlertsDB = self.client[self.rulesDB]
        except (KeyError):
            self.currAlertsDB = self.client.create_database(self.rulesDB)

    def addDocument(self, data):
        if data is not None and self.currDocDB is not None:
            doc = self.currDocDB.create_document(data)

    def addAlert(self, alertData):
        if alertData is not None and self.currAlertsDB is not None:
            doc = self.currAlertsDB.create_document(alertData)

    def queryDoc(self, selStr, fieldsStr=["time", "deviceId"]):
        result = {}
        sortStr = [{"timestamp": "asc"}]
        #print(selStr)
        for i, val in enumerate(fieldsStr):
            result[val] = []

        self.query = Query(database=self.currDocDB, selector=selStr, fields=fieldsStr, sort=sortStr)
        for doc in self.query.result:
            #print(doc)
            for key, value in doc.items():
                result[key].append(value)
        return result

    def queryAlerts(self, selStr={"_id": {"$gt": 0}}, fieldsStr=["id", "rules", "message", "email", "sms", "refresh"]):
        self.query = Query(database=self.currAlertsDB, selector=selStr, fields=fieldsStr)
        docList = []
        for doc in self.query.result:
            docList.append(doc)
        return docList

    def close(self):
        self.client.disconnect()


if __name__ == "__main__":

    dbClient = CloudantClient()
    dbClient.connectCloud()
    dbClient.openDB()
    #data = {"name": "OS", "Location": "Russia", "Temperature": -10}
    #dbClient.addDocument(data)
    #selStr = {"time": {"$gte": 1481358486, "$lte": 1481358496}}
    #print(dbClient.queryAlerts())
    dbClient.close()





