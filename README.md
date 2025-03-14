# EREG OJK DASHBOARD

### Requirement
- Node Version 22.14.0
- Yarn version 1.22.22

### Setup
1. copy .env.example to .env in the root directory project
2. fill .env value

### Development
3. yarn install
4. yarn dev (app default running in port 5000 or you can change it in .env file)

### Production
#### With Docker
1. Make sure your system installed Docker engine
2. running command
```shell
$ docker buildx build --file .\Dockerfile --tag <your repository image tag format (appname:version)> .
$ docker run -p <your host port>:80 --name <container_name> --restart always -d <your repository image tag (appname:version)>
```
3. (optional) if your system using nginx, this is recommended setting. example using host port 3000
```nginx
server {
    listen 80;
    server_name example.com;
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header HOST $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location / {
        try_files $uri $uri/ =404;
    }
}
```
#### Direct Deploy
1. yarn install
2. yarn build
3. yarn preview (running on port 5000 or you can change it in .env file) OR put ./output directory to htdocs/www folder on your webserver

