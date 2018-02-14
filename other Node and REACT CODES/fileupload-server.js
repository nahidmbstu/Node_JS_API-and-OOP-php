var FormData = require('form-data');

var fs = require('fs');

var multer  = require('multer')

var files   = require('./files');



var storage =   multer.diskStorage({

    destination: function(req, file, callback) {

        callback(null, './Uploads');

    },



    filename: function(req, file, callback) {

        var uniqName = Date.now() + '-' + file.originalname,

            filesKeys = Object.keys(files);



        callback(null, uniqName);



        files[filesKeys ? filesKeys.length : 0] = uniqName;



        fs.writeFile('files.json', JSON.stringify(files), function(err) {

            if (err) return res.end('Something went wrong during writing files.json');

        });

    }

});



var upload = multer({ storage : storage}, {limits : {fieldNameSize : 1000, fieldSize: 1000}}).single('userFile');









var transformData = function(files) {

    var data = [];



    for (var key in files) {

        data.push({

            name: files[key],

            url: './uploads/' + files[key]

        })

    }



    return data;

};



app.post('/upload_file', function(req, res){

    upload(req, res, function(err) {

        if(err) {

            res.statusCode = 500;

            return res.end("Error uploading file.");

        }

        res.writeHead(200, "OK", {'Content-Type': 'text/html'});

        res.end(JSON.stringify(transformData(files)));

    });

});
