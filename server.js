const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'anthony',
    password : '',
    database : 'smartbrain'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {db.select('*').from('users').then(users=>res.send(users))})
app.post('/signin',signIn.handleSignIn(db,bcrypt) )
app.post('/register',register.handleRegister(db,bcrypt))
app.get('/profile/:id',profile.getProfile(db))
app.put('/image',image.handleImage(db))
app.post('/imageurl',(req,res)=>image.handleApiCall(req,res))

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})