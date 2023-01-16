const express = require('express')
const cors = require('cors')
require("dotenv").config();


 const app = express()

//Config JSON response
 app.use(express.json())

 // Solve CORS
 app.use((req,res,next)=> {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
  res.header("Access-Control-Allow-Headers", ['Content-Type', 'Authorization'])
  app.use(cors());
  next()
})



//db connection

require('./db/conn')

app.use(express.static('public'))


app.get("/", (req,res)=> {
  res.status(200).json({msg:"Api mamodo"})
})



const UserRoutes = require('./routers/userRoutes')

app.use("/users",UserRoutes)


app.listen(5000)

