# NC News Seeding

This project aims to emulate a discussion platform such as reddit. The tables consist of users, articles, topics and comments. Please refer to the end-points documentation for a thorough list of end-points you can visit.

This project covers the following topics:

1. Querying a database.
2. Using a TDD approach to cover both the happy and error paths.
3. Setting a RESTful API with a number of endpoints which cover CRUD operations.
4. Setting up parametric endpoints.
5. Handling queries.
6. Manipulating data to respond to client requirements.
7. Hosting your server and DB.

Please visist https://nc-news-zi98.onrender.com/ for the deployed version of this website.
Please visit https://github.com/tinydancer96/backend-project-nc-news to view the code for this project.

## Cloning the repo

1. Following the link https://github.com/tinydancer96/backend-project-nc-news, please go to fork, then click create fork.
2. From there, confirm the name of the file you want to save this repo as in your account.
3. Click confirm.
4. You will automatically be navigated to the forked file in your account.
5. Within the repo in github, click code.
6. Copy the HTTPS url
7. In your terminal, navigate to the area you want to save this repo in your local drive.
8. In terminal, run git clone theUrlFromGithub.
9. You should not have a copy of the repo on your local drive.

## Creating .env files

    .env files are not pushed to github due to the sensitive information they may contain. To set one up so that the databases connect appropriately please perform the following:

1. create .env.test file - this will connect to the nc_news_test file. In this file, please add PGDATABASE=nc_news_test.
2. create .env.development file - this will connect to the nc_news file. In this file, please add PGDATABASE=nc_news.

## Dependencies

1. for DevDependencies please run npm install husky jest jest-extended supertest. This will help with testing
2. for regular dependenciesp please run npm install dotenv express pg pg-format. This will help run the files.

## Database setup

1. to setup the data. base, please run npm run setup-dbs. If successfully set up, the terminal will print:
   DROP DATABASE
   CREATE DATABASE
   DROP DATABASE
   CREATE DATABASE
2. to seed the database, please run npm run seed. If successful, the terminal will print:
   connection successful

## Running tests

    You should already have jest, jest-extended and supertest installed. These will help with running the test files.

1. To run the test files and ensure all tests are passing, please run npm run test. If all tests are passing, the terminal will say PASS. If there are any failing tests, the terminal will say FAIL and will point to which tests are failing.
2. To push newly created/updated files, run:
   git add fileNames
   git commit -m "helpful message"
   git push origin main.

   If there are any failing tests, husky will prevent the files being uploaded to github.
