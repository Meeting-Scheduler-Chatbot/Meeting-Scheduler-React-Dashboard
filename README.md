# website
### AppaBot's official website

# Deploy to heroku
- ### Login to registry
```shell
heroku container:login
```
- ### Tag container
```shell
docker tag <image> registry.heroku.com/<app>/<process-type>
```
- ### Push to heroku
```shell
docker push registry.heroku.com/<app>/<process-type>
```
- ### Release it
```shell
heroku container:release web --app <app>
```

# Add Packet To Client
- ### Stop working containers
```shell
^C
```
- ### Delete node_modules from client file
- ### Delete package-lock.json
- ### Make your pwd as client
```shell
cd client
```
- ### Install packets
```shell
npm install --save <package names>
```
- ### Delete node_modules from client file
- ### Delete package-lock.json
- ### Make your pwd as website
```shell
cd ..
```
- ### Compose and build containers to run
```shell
docker-compose -f docker-compose.dev.yml up --build client
```
- ### Down the container
```shell
docker-compose down
```
- ### Up the containers again
```shell
docker-compose -f docker-compose.dev.yml up
```

# How to run
- ### Make sure that your pwd is website and run the following command
```shell
docker-compose -f docker-compose.dev.yml up
```



docker-compose -f docker-compose.dev.yml up --build
docker-compose -f docker-compose.dev.yml down# website
