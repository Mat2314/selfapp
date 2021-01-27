from celery import shared_task


@shared_task
def CleanOldLogs(*args, **kwargs):
    print('----------------------------------------------------')
    print("--------------Hello world!--------------------------")
    print('----------------------------------------------------')
