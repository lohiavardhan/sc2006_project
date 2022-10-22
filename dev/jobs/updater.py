from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import checkBirthdayNotifications

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(checkBirthdayNotifications, 'interval', minutes=1)
    scheduler.start()