# auth0

    User authentication made with nean


#DB
    
    First time only
    
    $ mongo  
    > use DB_NAME
    > db.createUser({user:"DB_USERNAME", pwd:"DB_PASSWORD", roles:[ "readWrite", "dbOwner" ]})