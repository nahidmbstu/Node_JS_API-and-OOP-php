const express = require('express')  // require express framework
const app = express()              //create your app name constant

const bodyParser= require('body-parser');  /// used for taking html form data 

const MongoClient = require('mongodb').MongoClient;


var mongoose = require('mongoose');   ///for connecting database

app.use(express.static('./public'))  ///this the root file path for all files

app.set('view engine', 'ejs');     // to know about ejs file system

var db = 'mongodb://localhost/test';   //give the database path 

app.use(bodyParser.json())  /// to show json data in ejs file 




MongoClient.connect(db,(err, database) => {

  if (err) return console.log(err)

  app.listen(3000, () => {
    console.log('listening on 3000')
  })

})

 
app.get('/', function (req, res) {         //set the first route

  // res.send('Hello World!')                 //set any response   

     res.render('index.ejs')                  //get file index.ejs
  // db.collection('books').find().toArray((err, result) => {
  //   if (err) return console.log(err)
  //   res.render('index.ejs', { books: result})
  // })

})