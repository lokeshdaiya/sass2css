
// Requirements
var sass = require('sass');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

function compileSassData(data) {
    var result = '';
    try {
        result = sass.renderSync({
            data: data,
            outputStyle:"expanded"
        });
        result = result.css.toString();
    }
    catch (err) {
        console.log('error is', err.formatted)
        result = err.formatted;
    }

    return result;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.get('/api', (req, res) => {
    res.sendFile('index.html');
})

app.post('/api', (req, res) => {
    var css = req.body.data;
    var result = compileSassData(css);
    console.log(result);
    res.json(result);
})

var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('Working on port ' + PORT);
});