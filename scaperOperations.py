import os
from threading import Thread, Lock

import threading
import time
from Globals import *

def fun():  # user defined function which adds +10 to given number

    print("Hey u called me")





def runScript():
    cookie = "_ga=GA1.3.1997755782.1597948974; ASP.NET_SessionId=c1f21y3ahegfwhndjl0ceztm"
    csvInUse=True
    stream = os.popen(f"""./PS_scraper '{cookie}'""")
    csvInUse=False
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
