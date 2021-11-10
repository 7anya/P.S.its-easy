#!/bin/bash

kill -9 $(ps -a | grep 'rasa' | head -n 1 | awk '{print $1}')
kill -9 $(ps -a | grep 'rasa' | head -n 1 | awk '{print $1}')

echo "Waiting for 10s for previous instance to die"
sleep 10s

nohup rasa run actions &
nohup rasa run --cors "*" &
