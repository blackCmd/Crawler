//1. 인스타 해시태그 검색 후 페이지 URI
var TARGET_URI = 'https://www.instagram.com/explore/tags/%EC%97%B0%EC%84%B8%EC%A4%91%EC%95%99%EA%B5%90%ED%9A%8C/'

//2. 캡처 이미지 저장할 장소 ex)C:/dev/NodeJs/node_modules/npm/html/screenShot
var directory = 'InstaImgScreenShot'

//3. 이미지 가로,세로
var imgWidth = 400
var imgHeight = 300






// CasperJS 객체 생성
var casper = require('casper').create();
// CasperJS 객체 생성(런타임 정보 및 디버그정보보기)
//var casper = require('casper').create({verbose: true, logLevel: "debug"});

casper.userAgent('WebView User-Agent: Mozilla/5.0 (Linux; Android 9; SM-G950N Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/72.0.3626.121 Mobile Safari/537.36')
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

var feedTarget = '.KC1QD > div:nth-child(3) > div > div a'
var feedTargetUri = 'https://www.instagram.com'

casper.waitForSelector(feedTarget, function(){
    //console.log(target + "을 찾았습니다.")
    this.wait(3000, function(){
        this.capture('1 pageShot.png');
        this.captureSelector('2 targetShot.png', feedTarget);

        var targetHrefList = this.getElementsInfo(feedTarget)

        var i = 0;
        this.repeat(targetHrefList.length, function(){

            this.thenOpen(feedTargetUri + targetHrefList[i].attributes.href, function(){
                this.echo('=============')
                this.echo('LINK OPEN : ' + feedTargetUri + targetHrefList[i].attributes.href)

                this.waitForSelector('.ltEKP video', function(){
                    console.log('VIDEO TARGET FOUND')
                    this.echo('=============')
                }, function(){
                    console.log('VIDEO TARGET NOT FOUND')
                        this.waitForSelector('.FFVAD', function(){
                            console.log('IMG TARGET FOUND')
                            var imgTarget = '.FFVAD'
                            var imgTargetUri = this.getElementsInfo(imgTarget)[0].attributes.src

                            casper.thenOpen(imgTargetUri, function(){
                                //this.capture('screenShot/' + 'aaaaaa' + 'targetShot.png')
                                this.echo('IMG LINK OPEN : ' + imgTargetUri)
                                this.waitForSelector('img', function(){
                                    this.instaImgCapture(directory + '/' + i + 'screenShot.png', 'img', imgWidth, imgHeight, {format: 'png', quality: 100}) 
                                    this.echo('=============')
                                }, function(){
                                    this.echo('IMG LINK NOT OPEN : ')
                                    this.echo('=============')
                                })
                            })
    
                        }, function(){
                            console.log('IMG SRC NOT FOUND')
                            this.echo('=============')
                        })
                    
                    //this.instaFeedCapture('screenShot/' + i + 'targetShot.png', 'img.FFVAD', 400, 300, {format: 'png', quality: 100})
                })
            
                i++
               
            })
        })
    })
}, function(){
    console.log(feedTarget + "을 못 찾음")
})

//실제 실행
casper.run(function(){
    this.echo('*** END CRAWLING ***')
    this.exit()
}); 
