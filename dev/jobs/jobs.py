from time import time
from django.conf import settings
import datetime as dt
from datetime import datetime
from core.models.User import User

def checkBirthdayNotifications():
    userList = User.objects.all()
    print("Running birthday scheduler")
    for i in userList:

        try:
            userBirthday = i.birthday

            timeWindow = datetime.today() + dt.timedelta(days=7)

            if (timeWindow.month == userBirthday.month and timeWindow.month == datetime.today().month):
                if (timeWindow.day >= userBirthday.day and datetime.today().day < userBirthday.day):
                    i.sendBirthdayNotifications()
                    print("Sent notifications")
            elif (timeWindow.month == userBirthday.month):
                if (timeWindow.day >= userBirthday.day):
                    i.sendBirthdayNotifications()
                    print("Sent notifications")

        except:
            continue