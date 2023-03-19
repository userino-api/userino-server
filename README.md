
Userino is an open source service for user authorization.
Service handles authorization for your app. You can setup different
authorization type using this service.

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
- `KAFKA_HOSTS` - list of hosts for kafka. Default: `0.0.0.0:9093,0.0.0.0:9094,0.0.0.0:9095`
- `PORT` - port for public user server. Default: 7301
- `DASHBOARD_PORT` - port for dashboard server. Default: 7302
- `ADMIN_PORT` - port for admin api server. Default: 7303
- `MIGRATIONS_DISABLED` - migrations will not be run during server startup. Migrations are enabled by default.

# Links

- [Userino Development](./docs/DEVELOPMENT.md)
