var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

/*DB로드
var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-05.cleardb.net'
    , user: 'b22964461523d8'
    , password: '181a0139'
    , port: 3306
    , database: 'heroku_022008ee2df6de7'
});
*/

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

app.listen(port, function () {
    console.log('Server On! port:' + port);
});