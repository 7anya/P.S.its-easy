import os
# stream = os.popen('echo Returned output')
# output = stream.read()

import threading
import time


def fun():  # user defined function which adds +10 to given number

    print("Hey u called me")


def runScript():
    cookie = "_ga=GA1.3.1997755782.1597948974; ASP.NET_SessionId=c1f21y3ahegfwhndjl0ceztm"
    stream = os.popen(f"""./PS_scraper '{cookie}'""")
    print("running")
    output = stream.read()
    print(output)
    return


def runScriptAfterInterval():
    while True:
        delay = int(30)
        # start_time = threading.Timer(delay, fun)
        # start_time.start()
        runScript()
        # fun()
        time.sleep(3600)
