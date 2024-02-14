#! /bin/bash

curl --create-dirs -L -o ./bin/pkl https://github.com/apple/pkl/releases/download/0.25.2/pkl-linux-amd64
chmod +x ./bin/pkl

./pkl --version