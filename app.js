const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const shipmentsRouter = require('./routes/shippments/shipmentRoutes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', function(req, res) {
  res.status(200).send({status: 'OK'});
});

app.use('/shipment', shipmentsRouter);

module.exports = app;
