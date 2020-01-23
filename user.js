var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'us-cdbr-iron-east-05.cleardb.net',
    user     : 'b53ca8c85490d7',
    password : '5c02d592',
    port     : 3306,
    database : 'heroku_5286055d37bac92'
});

function testcon() {
    connection.connect(function (err) {
        if (err) {
          console.error('mysql connection error :' + err);
        } else {
          console.info('mysql is connected successfully.');
        }
    })
}

module.exports.testcon = testcon;

function login(userid, userpw, callback) {
      //아이디 중복체크
    connection.query('SELECT * from user_tbl where id=?',[userid], function(err, idchk, fields) {
        if (!err) {
            if (idchk.length == 0) {
                console.log('로그인 실패');
                callback(false);
                connection.end();
            } else {
                //비밀번호 복호화
                connection.query('SELECT pw from user_tbl where pw=PASSWORD(?) and id=?',[userpw, userid], function(err, rows, fields) {
                    if (rows.length == 0) {
                        console.log('로그인 실패');
                        callback(false);
                        connection.end();
                    } else {
                        console.log('로그인 성공');
                        callback(true);
                        connection.end();
                    }
                });
            
            }
        } else {
            console.log('MYSQL 오류');
            console.log('err');
        }
        
    });

}

module.exports.login = login;

function register(crtid,crtpw,crtemail) {
    connection.query('SELECT pw from user_tbl where id=?', [crtid], function (err, idchk, fields) {
        if (!err) {
            if (idchk.length == 0) {
                //삽입문
                connection.query('insert into user_tbl values(?,PASSWORD(?),?)', [crtid, crtpw, crtemail], function (err, rows, fields) {
                    if (!err) {
                        console.log('회원가입 성공');
                        res.redirect('/login');
                    }
                    else {
                        console.log('MYSQL 오류');
                        console.log(err);
                         }
                });
            }
            else {
                res.redirect('/register', {already:1});
            }
        }
        else {
            console.log('아이디 체크 mysql 오류');
        }
    });
}

module.exports.register = register;



