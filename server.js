const express = require('express')  // require express framework
const app = express()              //create your app name constant
const bodyParser= require('body-parser');  /// used for taking html form data 
const MongoClient = require('mongodb').MongoClient;




var mongoose = require('mongoose');   ///for connecting database

app.use(express.static('./public'))  ///this the root file path for all files

app.set('view engine', 'ejs');     // to know about ejs file system

var db = 'mongodb://localhost:27017/test';   //give the database path 

app.use(bodyParser.json())  /// to show json data in ejs file 

app.use(bodyParser.urlencoded({extended: true}))   ///this  catch all the field in html form otherwise no data will insert , only object id will go




MongoClient.connect(db,(err, database) => {

  if (err) return console.log(err)

  db = database   ////assign the db variable to database  other no connection will happen

  app.listen(3000, () => {
    console.log('listening on 3000')
  })

})

 
app.get('/', function (req, res) {         //set the first route


    db.collection('quotes').find().toArray((err, result) => {   ///find data
    if (err) return console.log(err)

     res.render('index.ejs' , {quotes: result})   //get file index.ejs  with result data 
 
})

})



app.post('/quotes', (req, res) => {
  
  
    db.collection('quotes').save(req.body, (err, result) => {   ///save data
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')

  })

})

app.post('/update', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Tarek'}, 

  {
    $set: {
      name: 'rana',
      quote: 'i am rana'
    }
  }, 

  {
    sort: {_id: -1},
    upsert: false
  },

   (err, result) => {
    if (err) return res.send(err)
    // res.send(result)
     res.redirect('/')
  })
})


app.delete('/delete', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: 'admin'},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'name deleted'})
  })
})
