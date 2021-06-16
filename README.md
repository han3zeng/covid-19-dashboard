
## How to build and run the container

* files
    * you need two necessary files to run the app successfully
        1. token.json
        2. client_secret.json
    * put those files in to root directory of the app (*/covid-19-dashboard)

* command
```bash
# cd to root directory of this project folder
docker compose up --build -d
# sudo docker-compose up --build -d --force-recreate
```


## Config
* The app in container run on **port: 3000**. If you want to publish the port and map it to the port on the host, you should modify the content in docker-compose.yml file in the root directory of the app.

```
ports:
  - "[put what ever port number you want to use]:3000"
```


## TO DO
* [ ] handle server error properly
