// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

/**
 * @fileoverview An example WebDriver script.
 *
 * Before running this script, ensure that Mozilla's geckodriver is present on
 * your system PATH: <https://github.com/mozilla/geckodriver/releases>
 *
 * Usage:
 *   // Default behavior
 *   node selenium-webdriver/example/google_search.js
 *
 *   // Target Chrome locally; the chromedriver must be on your PATH
 *   SELENIUM_BROWSER=chrome node selenium-webdriver/example/google_search.js
 *
 *   // Use a local copy of the standalone Selenium server
 *   SELENIUM_SERVER_JAR=/path/to/selenium-server-standalone.jar \
 *     node selenium-webdriver/example/google_search.js
 *
 *   // Target a remote Selenium server
 *   SELENIUM_REMOTE_URL=http://www.example.com:4444/wd/hub \
 *     node selenium-webdriver/example/google_search.js
 */

var request = require('request');


var chrome = require('chromedriver');

// var webdriver = require('..');
// var webdriver = require('selenium-webdriver');




// const {Builder, By, Key, until} = require('..');
const {Builder, By, Key, until} = require('selenium-webdriver');


// console.log('process.argv: '+process.argv);
var args = process.argv.slice(2);
console.log('Script args passed in: ' + args);




(async function example() {
  let driver = await new Builder().forBrowser('safari').build();
  
	try {
		// driver.get('https://uat-msc.codereach.co.uk');



		// UserAndPassword uAp = new UserAndPassword('xxx', 'xxx');
		// driver.switchTo().alert().authenticateUsing(uAp);


		// driver.switchTo().alert().alert.authenticateUsing(new UserAndPassword('xxx', 'xxx'));


		// await driver.switchTo().alert().accept();


		// alert = driver.switchTo().alert();
		// alert.authenticate("username","password")
		// time.sleep(20)
		// driver.close()

		// driver.wait(until.alertIsPresent(), 5000).then(
	 //        function() {

		// 		// driver.switchTo().alert().accept();
		// 		console.log("apparently an alert is present");
		// 		var alert = driver.switchTo().alert();
		// 		// alert.getText();
		// 		// console.log(alert);
		// 		// await driver.findElement(By.name('input')).sendKeys('webdriver', Key.RETURN);
		// 		// alert.findElement(By.name('input')).sendKeys('webdriver');
		// 		// var alert = driver.switchTo().alert();
		// 		// alert = alert.getText();
		// 		// console.log(alert);


		// 		 driver.switchTo().alert().then(function(alert) {
		// 		   // return alert.dismiss();
		// 		   // return console.log(alert.getText());
		// 			// return alert.dismiss();
		// 			console.log(alert.isPending());


		// 		 });



		// 		// Promise.all([alert.getText()])
		// 		//   .catch(function(err) {
		// 		//     // log that I have an error, return the entire array;
		// 		//     alert('A promise failed to resolve', err);
		// 		//     return arrayOfPromises;
		// 		//   })
		// 		//   .then(function(values) {
		// 		//     alert(values);
		// 		//   });




		// 		// Promise.all(
		// 		// 	alert
		// 		// 	// alert = driver.switchTo().alert();

		// 		// ).then(function (alert) {

		// 		// 	console.log('thing thing');

		// 		// }, err => {
		// 		//   console.error('An error occured! ' + err);
		// 		//   // setTimeout(() => {throw err}, 0);
		// 		// });



	 //        },  function() {
	 //          console.log("from thing");
		//     }
	 //    );




		// await driver.switchTo().alert().then(
		//   function() {
		//     console.log("alert detected");
		//   },
		//   function() {
		//     console.log("no alert detected");
		//   }
		// );

		// sleep(2000);
// delay(2000)


		// driver.sleep(5000);

		// // var alert = driver.switchTo().alert();
		// driver.switchTo().alert().then(
		//   function() {
		//     console.log("alert detected");
		//   },
		//   function() {
		//     console.log("no alert detected");
		//   }
		// );


		// driver.wait(until.alertIsPresent(), 5000).then(
	 //        function() {

	 //          // var text = driver.switchTo().alert();
	 //          // console.log(text.getText());
	 //          // browser.switchTo().alert().accept();
	 //          // browser.switchTo().defaultContent();

	 //          // // unload and accept alert
	 //          // item.click();

	 //          // browser.switchTo().alert();
	 //          // browser.switchTo().alert().accept();
	 //          // browser.switchTo().defaultContent();
	 //          // console.log("alert detected");

	 //          // driver.switchTo().alert().dismiss();
	 //          // console.log(  );

	 //          var alert = driver.switchTo().alert();

		// 		alert.sendKeys("pycon");
		// 		// alert.sendKeys(Keys.RETURN);

	 //   //        if ( driver.switchTo().alert().getText() ) {
		// 		// console.log("alert detected");
		// 		// var text = driver.switchTo().alert();

		// 		// text = text.getText().then(function (allHtml) {

		// 		// 	console.log(allHtml);

		// 		// }, err => {
		// 		//   // console.error('An error occured! ' + err);
		// 		//   setTimeout(() => {throw err}, 0);
		// 		// }); 
				

	 //   //        } else {
	 //   //        	console.log("alert NOT detected");
	 //   //        }


	 //        },  function() {

	 //          // unload
	 //          // item.click();
	 //          console.log("from thing");
		//     }
	 //    );










	// driver.quit();
	}
	catch(error) {
	  console.error(error);
	  // expected output: SyntaxError: unterminated string literal
	  // Note - error messages will vary depending on browser
	} finally {
	  	// console.log('All ok and done');
	    // await driver.quit();
	}




})();
