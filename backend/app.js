const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const jsonwebtoken = require('jsonwebtoken');
const expressjwt = require('express-jwt');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');

const { authenticateJWT } = require('./helpers/authHelpers.js');

const accessTokenSecret =  require('./helpers/auth-secret');

const clientDbHelpers = require('./helpers/clientDbHelpers')(db);
const sentSurveyDbHelpers = require('./helpers/sentSurveyDbHelpers')(db);

const indexRouter = require('./routes/index');
const indexReport = require('./report/reportSender');

const clientRouter = require('./routes/clients');
const sentSurveyRouter =  require('./routes/sentSurvey');



const bodyparser = require('body-parser');

const app = express();
app.use(cors()) ;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  next();
});
// app.use(expressjwt({
//   secret:  accessTokenSecret,
//    algorithms: ['RS256'] ,
  
// }));
app.use('/report', indexReport(db));
app.use('/', indexRouter(db));
app.use('/api/', clientRouter(clientDbHelpers));
app.use('/api/',sentSurveyRouter(sentSurveyDbHelpers));


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
