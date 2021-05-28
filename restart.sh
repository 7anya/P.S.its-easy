#!/bin/bash

# kill -9 $(ps | grep 'python3 app.py' | head -n 1 | awk '{print $1}')
kill -9 $(ps | grep 'gunicorn' | head -n 1 | awk '{print $1}') && echo "Waiting for 20s for previous instance to die" && sleep 20s # Gunicorn takes time to kill its children
pip install -r requirements.txt -I
# python3 app.py &
gunicorn -w 4 -b :5000 app:app &

