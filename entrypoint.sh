#!/bin/sh

cd
apk add gcc g++ musl-dev python3-dev py3-pip libressl-dev
pip install -r requirements.txt -I
python3 app.py
