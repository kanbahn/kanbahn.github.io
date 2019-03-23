#!/bin/bash
# TODO: replace container id with a name
#
# First build the container decribed in Dockerfile
# docker build .
#
# Then run
#docker run -d --name kanbahn-test-postgres -p 5433:5432 f04e7278634c
docker run -d --name kanbahn-test-postgres -p 5433:5432 $1