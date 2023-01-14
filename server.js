const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const routes = require('./routes/router')
const port = process.env.PORT || 3500

app.set('view engine', 'pug')

//without bodyParser, req.body would return an undefined
//if we don't use the extended option, we get a deprecation warning
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser()) //without this, the browser won't read the cookies
//route the public folder to /static. This means that in our pug layout the href will start with/static
app.use('/static', express.static('public')) 

app.use(routes)

app.listen(port, () => console.log(`Server running on port ${port}`))