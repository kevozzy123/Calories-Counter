require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes/index')
const session = require('express-session')
const cookieParser = require("cookie-parser");

// express app
const app = express()

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',  //Your Client, do not write '*'
  credentials: true,
}));

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use(cookieParser());
app.use(session({
  key: 'session.sid',
  secret: 'Some secret key',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 600000
  }
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Content-Type, POST, GET, OPTIONS, DELETE')
  next()
})

// routes
app.use('/', router)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })

