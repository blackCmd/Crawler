var casper = require('casper').create({verbose: true, logLevel: "debug"});

// URL 및 로그인 정보 변수 --- (※1)
var url = "https://www.tistory.com/auth/login/?redirectUrl=https%3A%2F%2Fhaewonlee.tistory.com%2Fmanage%2F";
var id = "yhw2880@gmail.com"; // 아이디
var password = "xlfhrnrl1@"; // 비밀번호

casper.start();

casper.open(url);

casper.then(function() {
   casper.fill( "#authForm", 
    { 
      loginId: id, 
      password: password
    }, true);
});

//해당 요소 찾아가서 클릭하기
casper.then(function(){
            var path = '#btn_login';
            if (casper.exists(path)) {
                casper.mouseEvent('click', path);
            }
            casper.wait(3000);
});

// 캡처하기
casper.then(function(){
  casper.capture('capture.png');
});

casper.run();