const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();

//Whenever we want to apply middleware we have to invoke the use method
app.use(morgan('dev'));
app.use(bodyParser.json());


//The all method is invoked irrespective of the method of the operation(GET, POST, etc.) that is being done
app.all('/dishes', (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //This function stores the modified version of req and res and passes it to the next GET/POST/other methods
});

app.get('/dishes', (req, res, next) => {
    //The req and res are from the app.all() method since /dishes is the same
    res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req,res,next) => {
    res.end('Will add a the dish ' + req.body.name + ' with details ' + req.body.description);
});

app.put('/dishes', (req,res,next) => {
    res.statusCode = 403;
    res.end(req.method + ' operation not supported on: ' + req.url)
});

app.delete('/dishes', (req,res,next) => {
    res.end('Deleting all dishes!')
});

//-------------------------------------------------------------------------------------------------------

app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + 
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

//--------------------------------------------------------------------------------------------------------

app.use(express.static(__dirname + '/public'));

//The next is used for some middlewares, it is an optional parameter
app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});