docker run -d --name kanbahn-test-docker -p 5433:5432 -e POSTGRES_DB=kanbahn_test -e POSTGRES_PASSWORD=passwd -e POSTGRES_USER=kanbahner postgres:9.5