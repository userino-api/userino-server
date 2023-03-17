
Userino server is a main api server for user authorization. 
Service handles authorization for your app. You can setup different 
authorization type using this service.

# Development

Run container: `docker-compose up`


## Database Migrations

Apply migrations: `npm run migrate`

Create new migration with cmd: `migramon create 2-1-add-something-new`


## Development

Create local `.env.local` file.
It may look like: 
```dotenv
PG=postgresql://postgres:postgres@localhost:5432/auth
```
