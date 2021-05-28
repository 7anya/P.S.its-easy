#!/bin/bash

kill -9 $(ps | grep 'python3 app.py' | head -n 1 | awk '{print $1}')
pip install -r requirements.txt -I
python3 app.py &

