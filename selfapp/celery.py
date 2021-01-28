from celery import Celery
from selfapp import celeryconfig
from celery.schedules import crontab

app = Celery('selfapp', broker='amqp://guest:guest@rabbitmq:5672', backend='rpc://', include=['selfapp.tasks'])

app.config_from_object(celeryconfig)

app.conf.beat_schedule = {
    'clean_old_logs': {
        'task': 'selfapp.tasks.clean_old_logs',
        'schedule': crontab(day_of_month="*", hour="1, 23", minute='0'),
    },
}

if __name__ == '__main__':
    app.start()
