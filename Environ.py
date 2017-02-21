import os
import json
import codecs


class Environ(object):

    def __init__(self):

        # If running in Bluemix, the VCAP environment variables will be available, and hence we can look up the bound Cloudant and IoT Foundation
        # services that are required by this application.
        self.application = None
        self.service = None
        self.appURI = ""
        self.organization = ""
        self.authKey = ""
        self.authToken = ""
        self.authMethod = ""

        self.dbUsername = ""
        self.dbPassword = ""
        self.dbHost = None
        self.dbPort = None
        self.dbURL = None

        if "VCAP_APPLICATION" in os.environ:
            self.application = json.loads(os.getenv('VCAP_APPLICATION'))
            self.service = json.loads(os.getenv('VCAP_SERVICES'))

            self.appURI = self.application["application_uris"][0]

            #print(self.application)
            #print(self.service)
            #print(self.appURI)

            # Check we have an IoT Foundation service bound
            if "iotf-service" not in self.service:
                print(" IoT Foundation service has not been bound!")
                raise Exception("IoT Foundation service has not been bound!")

            # Check we have a cloudantNoSQLDB service bound
            if "cloudantNoSQLDB" not in self.service:
                print(" CloudantNoSQLDB service has not been bound!")
                raise Exception("cloudantNoSQLDB service has not been bound!")

            self.organization = self.service['iotf-service'][0]['credentials']['org']
            self.authKey = self.service['iotf-service'][0]['credentials']['apiKey']
            self.authToken = self.service['iotf-service'][0]['credentials']['apiToken']
            self.authMethod = "apikey"

            self.dbUsername = self.service['cloudantNoSQLDB'][0]['credentials']['username']
            self.dbPassword = self.service['cloudantNoSQLDB'][0]['credentials']['password']

            self.twilioAccount = self.service["user-provided"][0]["credentials"]["accountSID"]
            self.twilioToken = self.service["user-provided"][0]["credentials"]["authToken"]
            self.twilioNumber = "+4915735985470"

            self.sendgridToken = codecs.decode("FT.ZQivVtCLExPThhtekFyqct.obOEKIw0JqJ3jRgz_NbgUV_nnBjxohMJhO1Tq3TxaCV", "rot-13")
        else:
            # Not running in Bluemix, so you need to set up your own properties for local testing.
            # Ensure you blank these out before committing/uploading the code
            self.appURI = "localhost"

            self.organization = "2073pd"
            self.authKey = codecs.decode("n-2073cq-3gzgngingg", "rot-13")
            self.authToken = codecs.decode("LNBj?tVtE1LTH01t)R", "rot-13")
            self.authMethod = codecs.decode("ncvxrl", "rot-13")

            self.dbUsername = codecs.decode("osr9r0so-p959-44r5-9s42-22qp2q816r30-oyhrzvk", "rot-13")
            self.dbPassword = codecs.decode("n5s09s9o55qo34401p96n7224so796p325852580r11rqrp4304p338n68n086p2", "rot-13")
            self.dbHost = codecs.decode("osr9r0so-p959-44r5-9s42-22qp2q816r30-oyhrzvk.pybhqnag.pbz", "rot-13")
            self.dbPort = 443
            self.dbURL = codecs.decode("uggcf://osr9r0so-p959-44r5-9s42-22qp2q816r30-oyhrzvk:n5s09s9o55qo34401p96n7224so796p325852580r11rqrp4304p338n68n086p2@osr9r0so-p959-44r5-9s42-22qp2q816r30-oyhrzvk.pybhqnag.pbz", "rot-13")

            self.twilioAccount = codecs.decode("NP217s6sq71oq0qqo1s7nno0pr5p811or4", "rot-13")
            self.twilioToken = codecs.decode("4237954n775sn60q5p4621q2r7755n7r", "rot-13")
            self.twilioNumber = "+4915735985470"

            self.sendgridToken = codecs.decode("FT.ZQivVtCLExPThhtekFyqct.obOEKIw0JqJ3jRgz_NbgUV_nnBjxohMJhO1Tq3TxaCV", "rot-13")

    def formatConfig(self):

        configParam = {}

        configParam["application"] = self.application
        configParam["service"] = self.service
        configParam["appURI"] = self.appURI
        configParam["organization"] = self.organization
        configParam["authKey"] = self.authKey
        configParam["authToken"] = self.authToken
        configParam["authMethod"] = self.authMethod

        configParam["dbUsername"] = self.dbUsername
        configParam["dbPassword"] = self.dbPassword
        configParam["dbAccount"] = self.dbUsername
        configParam["dbHost"] = self.dbHost
        configParam["dbPort"] = self.dbPort
        configParam["dbURL"] = self.dbURL
        configParam["dbName"] = codecs.decode("vbggrfgqo", "rot-13")
        configParam["docDB"] = codecs.decode("vbggrfgqo", "rot-13")
        configParam["alertsDB"] = codecs.decode("nyregf", "rot-13")

        configParam["twilioAccount"] = self.twilioAccount
        configParam["twilioToken"] = self.twilioToken
        configParam["twilioNumber"] = self.twilioNumber

        configParam["sendgridToken"] = self.sendgridToken

        return configParam

config = Environ().formatConfig()
