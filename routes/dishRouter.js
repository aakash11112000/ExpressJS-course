const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());


//Chained structure utilized
dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the dishes to you!');
})
.post((req,res,next) => {
    res.end('Will add the dish ' + req.body.name + ' with details ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end(req.method + ' operation not supported on: ' + req.url)
})
.delete((req,res,next) => {
    res.end('Deleting all dishes!')
});

dishRouter.route('/:dishId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send the details of dish with dishId: ' + req.params.dishId + ' to you!');
})
.put((req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: '+req.body.name+' with details: '+req.body.description);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(res.end(req.method + ' operation not supported on: ' + req.url))
})
.delete((req, res, next) => {
    res.end('Will delete the dish with dishId: ' + req.params.dishId);
});

module.exports = dishRouter;