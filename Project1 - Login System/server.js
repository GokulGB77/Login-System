const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const { v4:uuidv4 } = require('uuid');  
const router = require('./router');
const flash = require('express-flash')
const noCache = require('nocache');
const app = express();


const port = process.env.PORT || 3000;

app.use(noCache())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.set('view engine','ejs');

// load static assets
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets/')))

app.use(session({
  secret: uuidv4(),
  resave: false,
  saveUninitialized: true
  }));
  
app.use(flash())
app.use('/',router)

//home route
app.get('/',(req, res)=>{
  res.render('base', {title:"Login System"});
})

app.listen(port, ()=>{console.log("Listening to the server http://localhost:3000")});