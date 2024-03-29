
Userino is an open source service for user authorization.
Service handles authorization for your app. You can setup different
authorization type using this service.

[![Github](
https://img.shields.io/badge/github-userino-blue?style=flat&logo=github
)](https://github.com/userino-api/userino-server)

[![Docker](
https://img.shields.io/badge/docker-zvsx001%2Fuserino--server-blue?style=flat&logo=docker
)](https://hub.docker.com/r/zvsx001/userino-server)

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/userino-api/userino-server/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/userino-api/userino-server/tree/master)

## Why userino

Almost every app requires authorization to define user identity.
Userino is created to be ready to use service that can
handle everything related to user auth.
It is secure and easy to ingrate service.

## Supported Authorization List

| Auth Type        | Status |
|:-----------------|:------:|
| local (password) |   ✓    |
| firebase         |   ✓    | 
| otp              |   ✓    | 
| remote auth      |   ✓    | 
| phone            |  soon  |
| google           | to do  |
| facebook         | to do  |

## Docker example

`docker-compose.yml` file
```yml
version: "3.9"
services:
  userino:
    image: zvsx001/userino-server
    ports:
      - 7301:7301
      - 7302:7302
      - 7303:7303
    environment:
      REDIS_HOST: redis://host.docker.internal:6379
      KAFKA_HOSTS: host.docker.internal:9092,host.docker.internal:9093
      PG: postgresql://postgres:postgres@host.docker.internal:5432/auth

```


## Environment variables

- `PG` - postgres connection string
- `REDIS_HOST` - redis url
- `KAFKA_HOSTS` - list of hosts for kafka. Default: `0.0.0.0:9092`
- `KAFKA_SSL` - enable kafka ssl
- `KAFKA_SASL_MECHANISM` - (optional)
- `KAFKA_SASL_USERNAME` - (optional)
- `KAFKA_SASL_PASSWORD` - (optional)
- `PORT` - port for public user server. Default: 7301
- `DASHBOARD_PORT` - port for dashboard server. Default: 7302
- `ADMIN_PORT` - port for admin api server. Default: 7303
- `MIGRATIONS_DISABLED` - migrations will not be run during server startup. Migrations are enabled by default.
- `APP_PRIMARY_DISABLED` - disallow primary app
- `MEDIA_ADMIN_URL` - set url for media server. Default: `http://localhost:4503`

# Links

- [Userino Development](./docs/DEVELOPMENT.md)
- [Licence Server](./docs/LICENCE-SERVER.md)

# Extra available libs:

- [@userino/admin-api](https://github.com/userino-api/userino-admin-api) - 
js admin api client
- [@userino/express](https://github.com/userino-api/userino-express) - 
express middleware to authenticate user automatically
