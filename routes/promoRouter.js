const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());


//Chained structure utilized
promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the promotions to you!');
})
.post((req,res,next) => {
    res.end('Will add a promotion ' + req.body.name + ' with details ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end(req.method + ' operation not supported on: ' + req.url)
})
.delete((req,res,next) => {
    res.end('Deleting all promotions!')
});

promoRouter.route('/:promoId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send the details of promotion with promoId: ' + req.params.promoId + ' to you!');
})
.put((req, res, next) => {
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('Will update the promotion: '+req.body.name+' with details: '+req.body.description);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(res.end(req.method + ' operation not supported on: ' + req.url))
})
.delete((req, res, next) => {
    res.end('Will delete the promotion with promoId: ' + req.params.promoId);
});

module.exports = promoRouter;