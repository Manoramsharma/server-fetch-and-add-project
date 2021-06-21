const express =  require("express") ;
const cors = require("cors")
const app = express();
const pg = require("pg");

const connectstring = "postgres://payjaucu:EhD_CLWb5eqAolBQYlxUD1SnHPpsXL2p@john.db.elephantsql.com/payjaucu";
const client =  new pg.Client(connectstring) ;
client.connect( () => {
    console.log("database connected");
});

 

 app.use(cors()) ; 
app.use(express.json()) ;

 const port = process.env.PORT ;



 app.get("/" , (req , res) => {
     client.query("SELECT * FROM users" , (err , databaseRes) => {
         if(err){
             console.log(err) ;
             res.status(500).send("eror");
             
         }else{ // console.log(databaseRes);
           res.send(databaseRes.rows);
         }
     });
 });

 app.post("/addUser" , (req , res ) => {
     console.log(req.body);
     const secretkey = req.body.secretkey ;

     if( Number(secretkey) == 1234) {
         const newuser = req.body.newuser ;
        client.query(`INSERT INTO users (username , email) values ( '${newuser.username}' , '${newuser.email}')` , (err2 , databaseRes2) =>{
            if(err2){
                console.log(err2) ;
                res.status(500).send("eror");
                
            }else{ client.query("SELECT * FROM users" , (err2 , databaseRes2) => {
                if(err2){
                    console.log(err2) ;
                    res.status(500).send("eror");
                    
                }else{ // console.log(databaseRes);
                  res.send(databaseRes2.rows);
                }
            });
            }
        });
     }else{
         res.status(400).send("na hua kuch...") ;
     }
 });

 app.listen( port , () => {
     console.log("i m running " + port) ;
 }

 );