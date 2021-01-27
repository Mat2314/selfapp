from celery import Celery
from selfapp import celeryconfig

app = Celery('selfapp', broker='amqp://guest:guest@rabbitmq:5672', backend='rpc://', include=['selfapp.tasks'])

app.config_from_object(celeryconfig)

app.conf.beat_schedule = {
    'hello-every-30-seconds': {
        'task': 'selfapp.tasks.hello',
        'schedule': 30.0,
    },
}

if __name__ == '__main__':
    app.start()
