var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22',
    pageSettings: {
      loadImages:  false,         // The WebPage instance used by Casper will
      loadPlugins: false         // use these settings
    }
});

// print out all the messages in the headless browser context
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

// print out all the messages in the headless browser context
casper.on("page.error", function(msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});

var url = 'http://erp.91maidan.com/';

casper.start(url, function() {
    // search for 'casperjs' from google form
    console.log("page loaded");
    this.test.assertExists('form#loginForm', 'form is found');
    this.fill('form#loginForm', {
        'userName': 'Ami',
        'password':  'maidan2016'
    }, true);
});

casper.thenEvaluate(function(){
    console.log("Page Title " + document.title);
});

casper.thenOpen('http://erp.91maidan.com/user/getShopList.json?pageNow=1&startTime=&endTime=&shopId=&shopName=&provinceId=&cityId=&regionId=&isOpen=&isCheck=2&isIndex=', function() {
    this.test.assertSelectorHasText('title', '商家管理');
    var content = this.evaluate(function() {
        return document.querySelector("#table > tbody").innerHTML;
    });
    console.log(content)
});

casper.run();
