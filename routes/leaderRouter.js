const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());


//Chained structure utilized
leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the leaders to you!');
})
.post((req,res,next) => {
    res.end('Will add the leader ' + req.body.name + ' with details ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end(req.method + ' operation not supported on: ' + req.url)
})
.delete((req,res,next) => {
    res.end('Deleting all leaders!')
});

leaderRouter.route('/:leaderId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send the details of leader with leaderId: ' + req.params.leaderId + ' to you!');
})
.put((req, res, next) => {
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: '+req.body.name+' with details: '+req.body.description);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(res.end(req.method + ' operation not supported on: ' + req.url))
})
.delete((req, res, next) => {
    res.end('Will delete the leader with leaderId: ' + req.params.leaderId);
});

module.exports = leaderRouter;