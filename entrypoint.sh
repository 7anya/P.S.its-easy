#!/bin/sh

# Go to home directory (/root), where the repo is
cd 

# Install all required applications
apk add --no-cache gcc g++ musl-dev python3-dev py3-pip libressl-dev libffi-dev bash openssh sed

# Configure and enable ssh
# sed -i 's/#Port\ 22/Port\ 22/' /etc/ssh/sshd_config
sed -i 's/#PubkeyAuthentication\ yes/PubkeyAuthentication\ yes/' /etc/ssh/sshd_config
sed -i 's/#HostKey\ /etc/ssh/ssh_host_rsa_key/HostKey\ /etc/ssh/ssh_host_rsa_key/' /etc/ssh/sshd_config
sed -i 's/#HostKey\ /etc/ssh/ssh_host_ecdsa_key/HostKey\ /etc/ssh/ssh_host_ecdsa_key/' /etc/ssh/sshd_config
sed -i 's/AllowTcpForwarding\ no/AllowTcpForwarding\ yes/' /etc/ssh/sshd_config

cp .ssh/ssh_host_* /etc/ssh/
/usr/sbin/sshd

# Set bash as default
sed -i 's/ash/bash/' /etc/passwd

# Install dependencies and run the flask server
pip install -r requirements.txt -I
python3 app.py 

