from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import checkBirthdayNotifications

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(checkBirthdayNotifications, 'interval', hours=24)
    scheduler.start()