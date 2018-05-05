### Start the application

First time:
- make sure you create a folder at the root level called '/userfiles' (for local dev work)

- npm install

- mysql.server start

- npm run refresh-schema (i.e. this will push the SQL schema)

- npm start

- npm run webpack

Recurring:
- npm start

- npm run webpack


### Install and Set Up a Local MySQL Server

- Ensure you have mysql installed by doing which mysql from inside the terminal. If you don't have it, install it
using brew install mysql. Having mysql installed also means you'll have access to the `mysql.server` command and the `mysqladmin` command, both which you'll be using shortly

- Stop any MySQL servers that may already be running (perhaps inadvertently) with `mysql.server stop` in the terminal

- Start up a MySQL server by issuing the `mysql.server start` command. Be aware that anytime you want to interact with your MySQL databases during development, you will need to have the MySQL server running.


### Create a MySQL Database From the Interactive Prompt

- Invoke the interactive mysql prompt for the running server, logged in as the root user, with the `mysql -u root -p`  command. The default root password is blank, so just press ENTER

- From the interactive prompt, CREATE and USE a new database
- Create a new table with at least 3 columns, one of them set as a primary key
- Use the DESCRIBE <table-name> command to verify the setup of your new table
- INSERT some new rows into your new table
- Execute several queries
- Use UPDATE key word in at least 2 different ways
- Exit the interactive prompt

####################
### Troubleshooting
####################

Q: Server breaks after you reboot your machine.
A: mysql.server is probably not active anymore. Run `mysql.server start` and run the server again.

Q: Cannot upload files?
A: That's because you won't be able to access AWS without my keys (and I am not including these here to the public)
