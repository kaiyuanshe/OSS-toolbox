#! /usr/bin/env bash

docker load < $1
docker image ls -a

docker-compose down -v
docker-compose up -d
