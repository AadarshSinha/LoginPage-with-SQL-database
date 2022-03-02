const express = require('express')
const mysql =require('mysql')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())
app.use(cors())

const db=mysql.createConnection({
  host:'localhost',
  user: 'root',
  password:'aadarsh0',
  database:'LoginPage',
})

const verify = (requ,resp,next) => {
    //  const token=localStorage.getItem("token")   // ReferenceError: localStorage is not defined . I am unable to debug it
     const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2MjIwNjQ2LCJleHAiOjE2NDYyMjA5NDZ9.R7Olwaj0qLzKNl1ucGHjlUJzDJ0m6Z2q1hg7K8P6-6s"
     if(!token){
       console.log(token)
       resp.send("No token")
     }
     else{
       jwt.verify(token,"jwtCode",(err,res)=>{
         if(err)
           resp.send("Invalid token")
         else {
           console.log("Auth Successfull")
           next();
         }
       })
     }
}

app.post("/add",verify,(req,res)=>{
   const email = req.body.Email
   const username = req.body.Username
   const mobile = req.body.Mobile
   const address = req.body.Address
   db.query(
     "INSERT INTO screen2 (username , mobileNo , email , address) VALUES (?,?,?,?)",
     [username , mobile , email , address],
     (err,result)=>{
       console.log(err)
       res.send(result)
     } 
   );
});

app.post("/delete",verify,(req,res)=>{
  const deluser = req.body.delUser
  db.query(
    `DELETE FROM screen2 WHERE username = '${deluser}' `,
    (err,result)=>{
      console.log(err)
      res.send(result)
    } 
  );
});

app.get('/getdata',verify, (req, res) => {
  db.query("SELECT * FROM screen2;", (err, results) => {
    if(err){
       console.log(err)
       res.send(err);
    }
    else{
      console.log(results)
      res.send(results);
    } 
  });
});


app.post('/login', (req, res) => {
      const mail=req.body.Email
      const pass=req.body.Password
      const hardCodedEmail="admin@namasys.co"
      const hardCodedPassword="admin123"
      if(hardCodedEmail===mail && hardCodedPassword===pass)
      {
        const id=1
        const token=jwt.sign({id},"jwtCode",{
          expiresIn:300,
        })
        console.log("Logged in")
        console.log("Token = "+token)
        res.json({auth:true , token:token})
      }
      else res.json({auth:false})

});

app.listen(2000, () => {
  console.log("Server started")
  db.connect((err)=>{
    if(err)
    console.log("ERROR",err)
    else
    console.log('MySql server connected ...')
})
})