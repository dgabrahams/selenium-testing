
//got chrome webdriver to work by running: npm install protractor

var chrome = require('chromedriver');

// var webdriver = require('..');
var webdriver = require('selenium-webdriver');



// const {Builder, By, Key, until} = require('..');

// require('..')

// const chrome = require('../chrome');


// var chrome = require('drivers/chromedriver');



var url = "https://uat-msc.codereach.co.uk/";

//standard code form stackoverflow
driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();


// let driver = new Builder().forBrowser('chrome').build();

driver.get(url);

driver.switchTo().alert().then(
  function() {
    console.log("alert detected");
  },
  function() {
    console.log("no alert detected");
  }
);

driver.quit();








// (async function example() {

// 	var url = "https://uat-msc.codereach.co.uk/";

// 	//standard code form stackoverflow
// 	driver = new webdriver.Builder().
// 	    withCapabilities(webdriver.Capabilities.chrome()).
// 	    build();


// 	// let driver = new Builder().forBrowser('chrome').build();

// 	driver.get(url);

// 	await driver.switchTo().alert().then(
// 	  function() {
// 	    console.log("alert detected");
// 	  },
// 	  function() {
// 	    console.log("no alert detected");
// 	  }
// 	);

// 	driver.quit();

// })();