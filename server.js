var express = require('express');
var request = require("request");
var app = express();

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/public/views');
app.use(express.static('public'));
app.use(express.static('public/lib'));

var API_URL = "http://search.sep.gob.mx/solr/cedulasCore/select?fl=%2A%2Cscore&q=:q&facet=true&indent=on&wt=json";

app.get('/', function(req, res){
  res.render('index.html');
});

app.get('/cedula', function(proxyReq, proxyRes){
  var url = API_URL;

  if (proxyReq.query.q){
    if (isNaN(proxyReq.query.q)){
      url = url.replace(':q', proxyReq.query.q.split(' ').join('+'));
    } else {
      url = url.replace(':q', proxyReq.query.q);
    }
  }

  request.get(url, function (err, res, body) {
    if (!err) {
      var result = JSON.parse(body);
      proxyRes.send(result);
    }
    else {
      console.log(err);
    }
  });
});

app.listen(3000, function(){
  console.log('App runing at port 3000');
});
