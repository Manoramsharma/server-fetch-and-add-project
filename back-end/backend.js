const express =  require("express") ;
const cors = require("cors")
const app = express();
 let data = [
     { username : "manoram" , email : "hifi@gmail.com" } ,
     { username : "manoram" , email : "hifi@gmail.com" } ,
     { username : "manoram" , email : "hifi@gmail.com" } ,
     { username : "manoram" , email : "hifi@gmail.com" } ,
     { username : "manoram" , email : "hifi@gmail.com" } ,
     { username : "manoram" , email : "hifi@gmail.com" } ,

 ];

 app.use(cors()) ; 
app.use(express.json()) ;

 const port = 8000;



 app.get( "/" , (req , res) => {
     res.send(data);
 });

 app.post("/addUser" , (req , res ) => {
     console.log(req.body);
     const secretkey = req.body.secretkey ;

     if( Number(secretkey) == 1234) {
         const newuser = req.body.newuser ;
         data.push(newuser);
         res.send(data);

     }else{
         res.status(400).send("na hua kuch...") ;
     }
 });

 app.listen( port , () => {
     console.log("i m running " + port) ;
 }

 );