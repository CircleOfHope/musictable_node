# Installation

Make sure you have [Bower](https://bower.io/) installed.

`npm install -g bower`

Then checkout the repo, `cd` into it and run

```
npm install
bower install
```

# Database

MYSQL was used for development, but in theory the [ORM](http://docs.sequelizejs.com/en/latest/) is agnostic, so you can use whatever you prefer. You will need to set up a configuration file at `config/database.js`. This file will not be commited to the repository.

```
module.exports = {
  "development": {
    "username": "root",
    "password": "password",
    "database": "musictable",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

You will need to create the database before running the app, and the tables should auto-generate on the first run. In the future, we will use migrations.

## Importing Data From The Old Database

If you have the database from the existing music table, you can run the queries at `models/import.sql` to import the data once you have tables in your new database. It assumes the existing music table is in a database called `musictable_php`, but you can easily change that.

# Running the app

`npm start`

