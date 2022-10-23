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
            print("Today is ", datetime.today(), "; user birthday is ", i.birthday)
            timeWindow = datetime.today() + dt.timedelta(days=7)

            if (timeWindow.month == userBirthday.month and timeWindow.day == userBirthday.day):
                    i.sendBirthdayNotifications()
                    print("Sent notifications")

        except:
            continue
    
    print("Birthday scheduler task completed")

def keepServerAwake():
    print("Forcing server awake")
    import os
    os.system("curl \"https://findr.azurewebsites.net\"")
    print("Server forced awake successfully.")