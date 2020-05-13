var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
//데이터 베이스 모듈
var user = require('./user');

//포트 설정
var port = process.env.PORT || 10824;
app.use(bodyParser.urlencoded({
    extended: false
}));
//동적 폴더(CSS,JS 로딩 용이)
app.use(express.static(__dirname + '/public'));
//기본 폴더 설정
app.set('views', __dirname + '/public');
//HTML템플릿 설정
app.set('view engine', 'ejs');


//메인화면
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/first', (req, res) => {
    res.render('first');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});



app.post('/login', function (req, res) {
    var userid = req.body.ID;
    var userpw = req.body.PW;

    var auth = function(b) {
        if(b) {
            res.redirect('/');
        }else{
            res.redirect('/login');
        }
    }

    user.login(userid,userpw,auth);
    
    
});

app.listen(port, function () {
    user.testcon();
    console.log('Server On! port:' + port);
});