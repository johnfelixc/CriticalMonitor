import os
import json



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

            print(self.application)
            print(self.service)
            print(self.appURI)

            # Check we have an IoT Foundation service bound
            if "iotf-service" not in self.service:
                print(" IoT Foundation service has not been bound!")
                raise Exception("IoT Foundation service has not been bound!")

            # Check we have a cloudantNoSQLDB service bound
            if "cloudantNoSQLDB" not in self.service:
                print(" CloudantNoSQLDB service has not been bound!")
                raise Exception("cloudantNoSQLDB service has not been bound!")

            self.organization = self.service['iotf-service'][0]['credentials']['org']
            self.authKey = "a-2073pd-3tmtatvatt" # self.service['iotf-service'][0]['credentials']['apiKey']
            self.authToken = "YAOw?gIgR1YGU01g)E" # self.service['iotf-service'][0]['credentials']['apiToken']
            self.authMethod = "apikey"

            self.dbUsername = self.service['cloudantNoSQLDB'][0]['credentials']['username']
            self.dbPassword = self.service['cloudantNoSQLDB'][0]['credentials']['password']

            self.twilioAccount = self.service["user-provided"][0]["credentials"]["accountSID"]
            self.twilioToken = self.service["user-provided"][0]["credentials"]["authToken"]
            self.twilioNumber = "+4915735985470"

            self.sendgridToken = "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"
        else:
            # Not running in Bluemix, so you need to set up your own properties for local testing.
            # Ensure you blank these out before committing/uploading the code
            self.appURI = "localhost"

            self.organization = "2073pd"
            self.authKey = "a-2073pd-3tmtatvatt"
            self.authToken = "YAOw?gIgR1YGU01g)E"
            self.authMethod = "apikey"

            self.dbUsername = "bfe9e0fb-c959-44e5-9f42-22dc2d816e30-bluemix"
            self.dbPassword = "a5f09f9b55db34401c96a7224fb796c325852580e11edec4304c338a68a086c2"
            self.dbHost = "bfe9e0fb-c959-44e5-9f42-22dc2d816e30-bluemix.cloudant.com"
            self.dbPort = 443
            self.dbURL = "https://bfe9e0fb-c959-44e5-9f42-22dc2d816e30-bluemix:a5f09f9b55db34401c96a7224fb796c325852580e11edec4304c338a68a086c2@bfe9e0fb-c959-44e5-9f42-22dc2d816e30-bluemix.cloudant.com"

            self.twilioAccount = "AC217f6fd71bd0ddb1f7aab0ce5c811be4"
            self.twilioToken = "4237954a775fa60d5c4621d2e7755a7e"
            self.twilioNumber = "+4915735985470"

            self.sendgridToken = "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"

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
        configParam["dbName"] = "iottestdb"
        configParam["docDB"] = "iottestdb"
        configParam["alertsDB"] = "alerts"

        configParam["twilioAccount"] = self.twilioAccount
        configParam["twilioToken"] = self.twilioToken
        configParam["twilioNumber"] = self.twilioNumber

        configParam["sendgridToken"] = self.sendgridToken

        return configParam

config = Environ().formatConfig()