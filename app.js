var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: null });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/api/whoami', function (req, res) {
  var outPutJson = {};
  var ipAddress = req.ip;
  var trimedIpAddress = ipAddress.replace(/\a-z|:/gi, '');
  var language = req.headers['accept-language'];
  var trimedLanguage = language.slice(0, language.indexOf(','));
  var softwareInfo = req.headers['user-agent'];
  var startIndex = softwareInfo.indexOf('\(');
  var endIndex = softwareInfo.indexOf('\)');
  var trimedSoftwareInfo = softwareInfo.slice(startIndex + 1, endIndex);

  // console.log(ipAddress);
  // console.log(trimedLanguage);
  // console.log(trimedSoftwareInfo);

  outPutJson = {
      ipaddress: trimedIpAddress,
      language: trimedLanguage,
      software: trimedSoftwareInfo,
    };

  res.json(outPutJson);
});

// custom 404 page
app.use(function (req, res, next) {
  res.status(404);
  res.render('404');
});

// custom 500 page
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-c to terminate.');
});
