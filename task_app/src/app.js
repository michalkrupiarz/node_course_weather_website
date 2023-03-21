const path = require('path');
const express = require('express');
const session = require('express-session')
const hbs = require('hbs');
const { allowedNodeEnvironmentFlags } = require('process');
const { response } = require('express');
require('./db/mongoose')
const cookieParser = require('cookie-parser');


const weatherRouter = require('./routers/weather')
const baseRouter = require('./routers/base')
const userRouter = require('./routers/user')
const noteRouter = require('./routers/note')

const app = express();

app.use(
    session({
      secret: "secret-key",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    })
  );
  
app.use(express.json());
app.use(cookieParser());
app.use(userRouter)
app.use(weatherRouter)
app.use(noteRouter)
//has to be last because of looking up for url
app.use(baseRouter)



//path for expres
const viewPath = path.join(__dirname, '../templates/views')
const staticPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials')


//setup static direcotry to serve
app.use(express.static(staticPath));

// setup handlebars view engine to hbs and where to look for templates
app.set('view engine', 'hbs'); //handlebars set up
app.set('views', viewPath);
hbs.registerPartials(partialPath);

app.listen(3000, ()=>{
    console.log('Server is up on port 3000 yeah');
});


