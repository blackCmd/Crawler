//1. 인스타 해시태그 검색 후 페이지 URI
var TARGET_URI = 'https://drive.google.com/drive/u/0/folders/1JBAYui959GbpDqYROKW4QqZiXzmiRFmC'

//2. 캡처 이미지 저장할 장소 ex)C:/dev/NodeJs/node_modules/npm/html/screenShot
var directory = 'getGoogleDriviImg'

//3. 이미지 가로,세로
var imgWidth = 1080
var imgHeight = 2220






// CasperJS 객체 생성
var casper = require('casper').create();
// CasperJS 객체 생성(런타임 정보 및 디버그정보보기)
//var casper = require('casper').create({verbose: true, logLevel: "debug"});

//casper.userAgent('WebView User-Agent: Mozilla/5.0 (Linux; Android 9; SM-G950N Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/72.0.3626.121 Mobile Safari/537.36')
//casper.userAgent('User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36')

// 빈 페이지 준비
casper.start(TARGET_URI, function(){
    this.echo('*** START CRAWLING : ' + TARGET_URI + ' ***')
})

//브라우저의 '보이는' 화면크기 설정(만약 이미지가 더 크다면 더 커짐)
casper.viewport(imgWidth, 2220);

//브라우저 열기
//casper.open(TARGET_URL);

//url추가해서 브라우저열기
//var text = encodeURIComponent("고양이");
//casper.open('https://www.flickr.com/search/?text=' + text);

var target = '.l-u-Ab-zb-Ua'
//var feedTargetUri = 'https://www.instagram.com'

casper.waitForSelector(target, function(){
    //console.log(target + "을 찾았습니다.")
    this.wait(3000, function(){
        this.capture('1 pageShot.png');
        this.captureSelector('2 targetShot.png', target);

        var targetList = this.getElementsInfo(target)

        var i = 0;
        this.repeat(targetList.length, function(){
                this.echo('=============')
                this.echo('LINK FOUND : ' + targetList[i].attributes.src)
                var targetUri = targetList[i].attributes.src
                casper.thenOpen(targetUri, function(){
                    //this.capture('screenShot/' + 'aaaaaa' + 'targetShot.png')
                    this.echo('IMG LINK OPEN : ' + targetUri)

                    this.waitForSelector('img', function(){
                        this.instaImgCapture(directory + '/' + i + 'screenShot.png', 'img', 0, 0, {format: 'png', quality: 100}) 
                        this.echo('=============')

                        i++
                    }, function(){
                        this.echo('IMG LINK NOT OPEN : ')
                        this.echo('=============')
                        i++
                    }) 
                })
        })
    })
})

//실제 실행
casper.run(function(){
    this.echo('*** END CRAWLING ***')
    this.exit()
})
