cd app/
cd rasa/
# Start rasa server with nlu model
rasa run --model models --enable-api --cors "*" --debug \
         -p $PORT