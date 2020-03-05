# Welcom to Regndans-backend
## Tips and notes:
    We are using knex as our database wrapper, and objection as the ORM to support knex.
    Before you start the app you should run npm install.
    When this is done you can run the app by npm run start.
    
  ## Knex
    Since we are using knex you can do alot of database stuff, if you are a active developer
    on the project you can do migration with knex, but before you can do that you have to 
    install knex globally on your machine this can be done by running following command:
    npm install knex -g
  
    The live product is using mysql but the reason for knex is also that the product are able to scale towards a diffrent database like pg if that's what we prefer.

  ## Objection
    Objection the ORM that holds our database tables. You can find bunch of examples how to use
    it by looking inside our models foler.

  ## Nodejs 
    The server is running on a node enviroment so make sure you have that installed.
    The repo is not using babel or any configuration but if you prefer that you can make a PR.

  ## Express
    Express is the rest api package we use, because it's lightweight and not that complex to get started with.

