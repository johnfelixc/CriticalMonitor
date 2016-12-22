

import time
from twilio.rest import TwilioRestClient
import smtplib
from email.mime.text import MIMEText
from Environ import config

class MessageClient(object):

    def __init__(self):
        self.twilioClient = TwilioRestClient(config["twilioAccount"], config["twilioToken"])
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
        msg = MIMEText(msg)
        msg['Subject'] = "Alert: Critcal Care Control Center"
        msg['From'] = "criticalcare@hexaware.com"
        msg['To'] = sendto

        #s = smtplib.SMTP('localhost')
        #s.send_message(msg)
        #s.quit()

        return