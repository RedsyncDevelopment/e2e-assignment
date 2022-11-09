# Airport Application

This is an application for adding Airports to a Map. Airports can have multiple Airlines and you can view available Airlines beetween certain Airports inside certain Country.

## Clone project to your local machine

Navigate to desired folder and run

```bash
git clone "https://github.com/RedsyncDevelopment/e2e-assignment.git"
```

## How To Run

### Backend (Server):

After you cloned this project to your local machine you need to copy values from example.env file to newly create .env file. This is crutial - Database and Server won't work if you don't add those variables to .env file.

To run server localy you have 2 different options:

1. Using Docker - need to have Docker Desktop install on your local machine
2. Using NodeJS >= v16 with Postres already installed on your local machine

#### Docker

To run Server with Database from source directory first run a comand

```bash
cd .\backend\
```

And after that you can run Docker with

```bash
docker-compose up --build --force-recreate
```

#### Node w/ Postgres

If you have NodeJS and Postgres already installed on you local machine first thing you need to do is create a new Database User and a Database. For testing perpose it's best to create:

- user: postgres
- password: postgres
- DB Name: AirportApplication

That way there is no need to customize URI to database to fit Prisma connection.

After that you can navigate to .\backend folder inside source directory and run

```bash
npm run dev
```

After you have your server running you can start your frontend application.

### Frontend (React Application):

To run Server with Database from source directory first run a comand

```bash
cd .\fronend\
```

And after that you start React Application in development mode with

```bash
npm start
```
