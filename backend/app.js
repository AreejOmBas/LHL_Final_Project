/**
 * Module dependencies.
 */
const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyparser = require('body-parser');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// custom imports
const db = require('./db');

const clientDbHelpers = require('./helpers/clientDbHelpers')(db);
const sentSurveyDbHelpers = require('./helpers/sentSurveyDbHelpers')(db);

const emailScheduler = require('./routes/emailScheduler');
const indexReport = require('./report/reportSender');

const clientRouter = require('./routes/clients');
const sentSurveyRouter =  require('./routes/sentSurvey');

const app = express();
app.use(helmet());

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true
  })
);
app.use(cookieParser());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use(indexReport(db));
app.use(emailScheduler(db));
app.use('/api/', clientRouter(clientDbHelpers));
app.use('/api/', sentSurveyRouter(sentSurveyDbHelpers));

app.use(express.static(__dirname+'/report/images'));


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
