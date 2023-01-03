#!/bin/sh

# Go to home directory (/root), where the repo is
cd

mkdir /run/sshd
/usr/sbin/sshd

gunicorn -w 4 -b :5000 app:app &

# Change /etc/motd to change login message to notify the user that this is a docker container
cp shell_login_message /etc/motd

# So that the container lives on across python restarts
while true; do sleep 1d; done
