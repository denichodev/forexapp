#!/usr/bin/env bash

if [ "$1" = "up" ]
then
    echo "Starting docker development server..."
    docker-compose -f docker-compose-dev.yml up -d
elif [ "$1" = "upbuild" ]
then
    echo "Building docker development server..."
    docker-compose -f docker-compose-dev.yml up --build
else
    echo "Nothing to do..."
fi
