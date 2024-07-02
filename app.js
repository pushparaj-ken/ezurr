const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const { generateSwagger, serveSwagger } = require('./swagger/swagger');
const errorHandler = require('./utils/ApiError');

const usersRouter = require('./routes/users');

const app = express();

const routes = ['./swagger/**/*.js'];

const swaggerSpec = generateSwagger('Ezurr Users', '1.0.0', routes);

serveSwagger(app, swaggerSpec, '/api/user/docs');
// view engine setup

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_ADDRESS);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors({
  origin: ['http://localhost:3000']
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(errorHandler);

app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const errcode = new Error("Not Found.");
  errcode.statusCode = 404;
  console.log("TCL: err", 404)
  return next(errcode);
});

app.use(function (err, req, res, next) {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    code: statusCode,
    message: err.message || 'Internal Server Error',
    timestamp: new Date()
  });
});

module.exports = app;
