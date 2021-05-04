
import os
# stream = os.popen('echo Returned output')
# output = stream.read()



def runScript():
    cookie=""
    stream = os.popen(f"""./PS_scraper -g {cookie}""")
    output = stream.read()
    print(output)
    return