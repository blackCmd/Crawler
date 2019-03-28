var TARGET_URL = 'https://www.instagram.com/p/BvjyV43nVMr/';

// CasperJS 객체 생성
var casper = require('casper').create();
// CasperJS 객체 생성(런타임 정보 및 디버그정보보기)
//var casper = require('casper').create({verbose: true, logLevel: "debug"});

// 빈 페이지 준비
casper.start();

//브라우저의 '보이는' 화면크기 설정(만약 이미지가 더 크다면 더 커짐)
casper.viewport(390, 2220);

casper.userAgent('WebView User-Agent: Mozilla/5.0 (Linux; Android 9; SM-G950N Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/72.0.3626.121 Mobile Safari/537.36')
// casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53');

//브라우저 열기
casper.open(TARGET_URL);

//url추가해서 브라우저열기
//var text = encodeURIComponent("고양이");
//casper.open('https://www.flickr.com/search/?text=' + text);

var target = '.ltEKP'

casper.waitForSelector(target, function(){
    console.log(target + "을 찾았습니다.")
    this.captureSelector('screenshot.png', target);
}, function(){
    console.log(target + "을 찾지 못했습니다.")
    this.capture("failed.png")
})


// // 스크린샷 수행
// casper.then(function(){
//     //전체화면 캡처
//     //casper.capture("screenshot.png");
//     //캡처시 이미지 강제로 자르기
//     // casper.capture("screenshot.png", {
//     //     top:0, left:0, width:1980, height:1080  //강제로 이미지 자르기
//     // });
//     var target = 'main > div > div > article'
//     if (casper.exists(target)) {
//         casper.captureSelector('screenshot.png', target);
//     }
//     else{
//         console.log(target + "을 찾지 못했습니다.")
//     }
// });



//실제 실행
casper.run(function(){
    casper.exit()
}); 
