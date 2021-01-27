from .celery import app


@app.task
def hello():
    print("----------------------")
    print("-----Hello world------")
    print("----------------------")
