# Airport Application

This is an application for adding Airports to a Map. Airports can have multiple Airlines and you can view available Airlines between certain Airports inside certain Country.

## Clone project to your local machine

Navigate to desired folder and run

```bash
git clone "https://github.com/RedsyncDevelopment/e2e-assignment.git"
```

## IMPORTANT!

For this app to run properly you need to have GOOGLE MAPS API KEY.
Add this key to .\frontend\\.env as described in .\frontend\example.env

## How To Run?

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
npm install
```

```bash
npm run dev
```

After you have your server running you can start your frontend application.

### Frontend (React Application):

To run React application, from source folder run comand

```bash
cd .\frontend\
```

And after that you install dependencies and start React Application in development mode with

```bash
npm install
```

```bash
npm start
```

## How it works?

Navigation button in top right corner enebles users to navigate between pages.

Homepage opens a map with Airports already saved in database. If a user clicks on already existing marker it opens a popup window with more information about that specific airport. User can edit some information or delete airport from a map (database). If a user clicks somewhere else on the map, it opens a form which adds new airport to that location. Clicking on button "Open Airline Form" user can add new airlines.

Airports page enables users to manage Airport without map.

Airlines page enables users to manage Airport without map

Routes page enables users to search for available Airlines between selected Airports.

## Used tehnologies?

### Database

Application is using PostreSQL database as it's main source of data.
Database schema looks like:
![database Schema](https://lh3.googleusercontent.com/Ytm99r8kq_fymGHjXrlfqcNqMj_BdO1gWzLS0ZkQIkNyEkm95SLunJT3G0lxPQ8nXIEtnCufReXcr5RW4fl_fJeOk3CMNjRTQ0x_8a_87knq6VBM7KpJsaYvlAN2-rK0Lw6tzuCMCQe43SPBU4hAcwVk9MGgdPJc_CBjuBck2AA5IQUHLz4FcbHAIUa5Xr7nQNlBkRnO6-B7Cz8usWMRn-TspNCU2yjXPeBpFqp1B4o703ydVofXd-ub0X44l-kVa_AA5PR3WZiYVHC9A-yLaj71q8WGAgfRpVf7xVmKlwywejdNNnOToWZPx0f1qF3PF_7fs1EAGDRE5Ldq7JXAakku1hhtVvCoNZ2-fK4_qKW-dHoqAjgzvBGy1roWtS87rXutFa6DjpX8FIWKuaBcLbAlQW-PDXY0i8BsphzVsTp_1lvFDlK6Wb0he_59H00At6WdmA3kcSzPeFbR-II4-aJgc8VsbnxQZIHVlx1DtGDtbPnZ9AX0IN7QC9skDyVzyJw7lvOPZ0gDXD6UAG233R1KvtN0oe-_x96csoKXDrFji7Z91t2anehUBfVtd9KG-IW7N3JJ1Zg8SDwbgemfKEruz070FpYFCWGC_AcuWXSXwK-HtctKSypLJUEs6De8vsB79HCNf_IdhGE79dAA33HCHD3M98CKdSjE5d5ziYcYbecofnUGT8b_c-oK36xYQVnSeOrIvMRzGETvJcXQx70IqkannNTZf067dVZj1IjQcl-uUZCORCkM9Md8YG1yKj1SsLzl_-65D1raxcau_fo4NbpNfN9OJlpUOms9i5OaBl14pzMAsv5WSx5MMlALBz932IxehK4pimO1PsByubFfW9GsJxVHNzjaDglOfMwNHxFZm7m04JKAfAgHDKZMRoTvYNctn87xw6sAJUtLumD4bn8tQEbySmnN3uZFm5p2O1xZSQj-3uY0fcri_NlbaANDZk2ayPKAqcHyzhZ831mZo2q-sUWlt-uDcmwEisd11LWPZT6h7hAKu6lnTvFOcrONI_79GHtXb72JWv_j3ETTvwI=w1008-h487-no?authuser=2)

Destination table is a join table between Airports and Airlines.

### Server

Server is build with NodeJS and Express. Also there is Prisma which enables easier communication between database and Express application.

### Client

Client side of application is built with React.
For state managment there is Redux/toolkit
For routing there is React Router
For styling there is TailwindCSS

## TODO

- Add better ERROR handling
- Add TEST to server and client
- Add notification system
