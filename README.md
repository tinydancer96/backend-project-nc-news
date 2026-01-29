# NC News Seeding

Creating .env files
.env files are not pushed to github due to the sensitive information they may contain. To set one up so that the databases connect appropriately please perform the following:

1. create .env.test file - this will connect to the nc_news_test file. In this file, please add PGDATABASE=nc_news_test.
2. create .env.development file - this will connect to the nc_news file. In this file, please add PGDATABASE=nc_news.
