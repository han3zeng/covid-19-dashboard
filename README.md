
## How to build and run the container
```bash
# cd to root directory of this project folder
docker compose up --build -d
```


## Config
* The app in container run on `port: 3000`. If you want to publish the port and map it to the port on the host, you should modify the content in docker-compose.yml file in the root directory.

```
ports:
  - "[put what ever port number you want to use]:3000"
```


## TO DO
* [ ] handle server error properly
