from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import checkBirthdayNotifications, keepServerAwake

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(checkBirthdayNotifications, 'interval', hours=4)
    scheduler.add_job(keepServerAwake, 'interval', seconds=1000)
    scheduler.start()