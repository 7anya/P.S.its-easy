#!/bin/sh

# Go to home directory (/root), where the repo is
cd 

# Install all required applications
apk add --no-cache gcc g++ musl-dev python3-dev py3-pip libressl-dev libffi-dev bash openssh sed
apk add --no-cache nano git

# Configure and enable ssh
# sed -i 's/#Port\ 22/Port\ 22/' /etc/ssh/sshd_config
sed -i 's/#PubkeyAuthentication\ yes/PubkeyAuthentication\ yes/' /etc/ssh/sshd_config
sed -i 's/#HostKey\ /etc/ssh/ssh_host_rsa_key/HostKey\ /etc/ssh/ssh_host_rsa_key/' /etc/ssh/sshd_config
sed -i 's/#HostKey\ /etc/ssh/ssh_host_ecdsa_key/HostKey\ /etc/ssh/ssh_host_ecdsa_key/' /etc/ssh/sshd_config
sed -i 's/AllowTcpForwarding\ no/AllowTcpForwarding\ yes/' /etc/ssh/sshd_config
sed -i 's/#PermitRootLogin\ prohibit-password/PermitRootLogin\ prohibit-password/' /etc/ssh/sshd_config
cp .ssh/ssh_host_* /etc/ssh/
chmod 400 /etc/ssh/ssh_host_*
/usr/sbin/sshd
passwd -u root # Enables passwordless access via ssh

# Set bash as default
sed -i 's/ash/bash/' /etc/passwd

# Install dependencies and run the flask server
pip install -r requirements.txt -I
python3 app.py &

# So that the container lives on across python restarts
while true; do sleep 1d; done
