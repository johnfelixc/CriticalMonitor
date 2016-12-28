
from twilio.rest import TwilioRestClient
import sendgrid
from Environ import config

class MessageClient(object):

    def __init__(self):
        self.twilioClient = TwilioRestClient(config["twilioAccount"], config["twilioToken"])
        self.mailClient = sendgrid.SendGridAPIClient(apikey=config["sendgridToken"])
        pass

    def alertSMS(self, sendto, msg):

        print("SMS to :" + sendto)
        print("Message: " + msg)
        resp = self.twilioClient.messages.create(to=sendto, from_=config["twilioNumber"], body=msg)
        print(resp)
        return

    def alertEMail(self, sendto, msg):
        print("Email to :" + sendto)
        print("Message: " + msg)

        mailData = {
            "personalizations": [
                {
                    "to": [
                        {
                            "email": sendto
                        }
                    ],
                    "subject": "Alert: Critical Care Control Center"
                }
            ],
            "from": {
                "email": "criticalcare@hexaware.com"
            },
            "content": [
                {
                    "type": "text/plain",
                    "value": msg
                }
            ]
        }
        response = self.mailClient.client.mail.send.post(request_body=mailData)
        print(response.status_code)
        #print(response.body)
        #print(response.headers)


        return