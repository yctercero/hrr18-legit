var express = require('express');

var app = express();

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.set('port', (process.env.PORT || 1337));

app.listen(app.get('port'), function() {
  console.log('listening on port ', app.get('port'));
});

module.exports = app;