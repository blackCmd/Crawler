var TARGET_URI = 'https://www.instagram.com/explore/tags/%EC%97%B0%EC%84%B8%EC%A4%91%EC%95%99%EA%B5%90%ED%9A%8C/'
//var TARGET_URL = 'https://www.instagram.com/p/Bvsl-nJFZXF/'

// CasperJS 객체 생성
var casper = require('casper').create();
// CasperJS 객체 생성(런타임 정보 및 디버그정보보기)
//var casper = require('casper').create({verbose: true, logLevel: "debug"});

casper.userAgent('WebView User-Agent: Mozilla/5.0 (Linux; Android 9; SM-G950N Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/72.0.3626.121 Mobile Safari/537.36')
//casper.userAgent('User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36')

// 빈 페이지 준비
casper.start(TARGET_URI, function(){
    this.echo('스타트 : ' + TARGET_URI)
})

//브라우저의 '보이는' 화면크기 설정(만약 이미지가 더 크다면 더 커짐)
casper.viewport(390, 2220);

//브라우저 열기
//casper.open(TARGET_URL);

//url추가해서 브라우저열기
//var text = encodeURIComponent("고양이");
//casper.open('https://www.flickr.com/search/?text=' + text);

var target = '.KC1QD > div:nth-child(3) > div > div > div > a'
var targetUri = 'https://www.instagram.com'

casper.waitForSelector(target, function(){
    console.log(target + "을 찾았습니다.")
    this.wait(3000, function(){
        this.capture('1 pageShot.png');
        this.captureSelector('2 targetShot.png', target);

        targetUri = targetUri + this.getElementsInfo(target)[0].attributes.href
    })
}, function(){
    console.log(target + "을 찾지 못했습니다.")
    this.capture("failed.png")
})


casper.then(function(){
        casper.thenOpen(targetUri, function(){
            this.echo('링크엽니다 : ' + targetUri)
            casper.wait(3000, function(){
                this.echo('3초끝')
        
                casper.capture('3 targetPageShot.png');
            
                this.waitForSelector('.ltEKP', function(){
                console.log(target + "을 찾았습니다.")
                this.captureSelector('4 targetShot.png', '.ltEKP')
            })
            })
        })
})

//실제 실행
casper.run(function(){
    casper.exit()
}); 