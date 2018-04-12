var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors=require('cors');

// router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var transactionsRouter = require('./routes/transactions');
var clientsRouter = require('./routes/clients');
var countriesRouter = require('./routes/countries');
var statesRouter = require('./routes/states');
var loginRouter = require('./routes/login');
var reportsRouter = require('./routes/reports');
var machinesRouter = require('./routes/machines');
var rolesRouter = require('./routes/roles');
var rolePermissionRouter = require('./routes/rolepermissions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/transactions', transactionsRouter);
app.use('/clients', clientsRouter);
app.use('/countries', countriesRouter);
app.use('/states', statesRouter);
app.use('/login', loginRouter);
app.use('/reports', reportsRouter);
app.use('/machines', machinesRouter);
app.use('/roles', rolesRouter);
app.use('/rolepermissions', rolePermissionRouter);

// catch 404 and forward to error handler
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

var server = app.listen(3001, function() {
  console.log('Ready on port %d', server.address().port);
});

module.exports = app;
