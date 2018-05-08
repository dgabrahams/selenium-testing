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






// const {Builder, By, Key, until} = require('..');
const {Builder, By, Key, until} = require('selenium-webdriver');


// console.log('process.argv: '+process.argv);
var args = process.argv.slice(2);
console.log('Script args passed in: ' + args);

// var driver = new Builder()
//     // .forBrowser('firefox')
//     .forBrowser('safari')
//     .build();

// driver.get('http://www.google.com/ncr')
//     .then(_ =>
//         driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN))
//     .then(_ => driver.wait(until.titleIs('webdriver - Google Search'), 1000))
//     .then(_ => driver.quit());


//On the front end:
//$('a').length - check the result from the live test



(async function example() {
  let driver = await new Builder().forBrowser('safari').build();
  try {
  	// console.log(driver);
    // await driver.get('http://www.google.com/ncr');
    // await driver.get('https://www.morgansindall.com/');
    // await driver.get('https://www.musedevelopments.com');
    // await driver.get('https://construction.morgansindall.com');
    // await driver.get('https://www.msinvestments.co.uk');


	await driver.get('https://uat-msc.codereach.co.uk');
	// driver.get('https://uat-msc.codereach.co.uk/');
	// https://uat-msc.codereach.co.uk/
	// http://uat-lovell.codereach.co.uk

	// driver.switchTo().alert();
	// driver.switchTo().alert().accept();
	// console.log(driver.switchTo().alert().alertText([text]));

	// console.log( driver.switchTo().alert().getText()) ;


    // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);//sendKeys = typing into an element.
    // await driver.findElements(By.name('a')).sendKeys('webdriver', Key.RETURN);





	// driver.switchTo().alert().then(
	//   function() {
	//     console.log("alert detected");
	//   },
	//   function() {
	//     console.log("no alert detected");
	//   }
	// );





	var pendingElements = driver.findElements(By.tagName('a'));

	pendingElements.then(function (elements) {

		console.log('Total links found: ' + elements.length);

		var pendingHtml = elements.map(function (elem) {
		    // return elem.getAttribute("innerHTML");//returns a mixture of text only (which is the anchor text) and divs because the divs are in the anchor!
		    return elem.getAttribute("href");
		    // console.log(elem.getAttribute("href"));
		});

		// promise.all(pendingHtml).then(function (allHtml) {
		//     console.log('in promise all');
		// });



//https://www.linkedin.com/company/morgan-sindall-group-plc?trk=nav_account_sub_nav_company_admin



		Promise.all(
			pendingHtml
			// doSearch(createDriver(Channel.RELEASE)),
			// doSearch(createDriver(Channel.AURORA)),  // Developer Edition.
			// doSearch(createDriver(Channel.NIGHTLY)),
		).then(function (allHtml) {
			// console.log(allHtml.length);
			//console.log(allHtml);
			//console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
		    // console.log('in promise all');

			// console.log('*** --- ***');
			var errors = '';
			var requestResults = {}
			var options = {
			  // url: 'https://api.github.com/repos/request/request',
			  headers: {
			    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1 Safari/605.1.15',
			    //'Content-Type': 'text/html',
			    'Accept': 'text/html, application/xhtml+xml'//only this needed really for the morgan sindall sites
			  }
			};

			// var requestResults = [];
			for (var i in allHtml) {

				var currentLink = allHtml[i];
				request(currentLink, options, testLink.bind(null, currentLink, requestResults) );

			}

		}, err => {
		  // console.error('An error occured! ' + err);
		  setTimeout(() => {throw err}, 0);
		});



		// Promise.all([
		// 	pendingHtml
		//   // doSearch(createDriver(Channel.RELEASE)),
		//   // doSearch(createDriver(Channel.AURORA)),  // Developer Edition.
		//   // doSearch(createDriver(Channel.NIGHTLY)),
		// ]).then(_ => {
		//   console.log('All done!');
		// }, err => {
		//   console.error('An error occured! ' + err);
		//   setTimeout(() => {throw err}, 0);
		// });



		// request('https://hangouts.google.com/', function (error, response, body) {
		//   console.log('error:', error); // Print the error if one occurred
		//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		//   // console.log('body:', body); // Print the HTML for the Google homepage.
		// });





	});




	// driver.findElement(By.linkText("Images")).getAttribute("href").then(function(href) {
	// 	// assert(the_href.contains("/site/index.html"))
	// 	console.log(href.length);
	// 	console.log(href);
	// 	console.log('*** *** ***');
	// });
	//in console runtime href is: 	https://www.google.co.uk/imghp?hl=en&amp;tab=wi
	//in source it is: 				https://www.google.co.uk/imghp?hl=en&amp;tab=wi
	//in node console it is: 		https://www.google.co.uk/imghp?hl=en&    tab=wi






		// checkboxElems[1].click(); // second one
		// console.log(elems);//is an array of objects
		// for (var i in elems) {
		// 	console.log(elems[i].getText());
		// }
	// });
	// for (var i in links) {
	// 	console.log(links[i]);
	// }
	// console.log(typeof links);


    // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);

  } finally {
  	// console.log('All ok and done');
    // await driver.quit();
  }




// function testLink(error, response, body) {

// 					// console.log(response);
// 					if (response != undefined) {
// 						if (error == !null || response.statusCode != 200 ) {
// 							// console.log('error:', error); // Print the error if one occurred
// 							// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// 							// error = 'err';
// 							// requestResults[allHtml[i]] = response.statusCode;
// 							console.log('error: ' + response.statusCode + ' : ' + currentLink);
// 							// console.log(response);
// 							// for (var x in response) {
// 							// 	console.log(x);
// 							// }
// 							console.log(response.error);
// 							console.log('x - x - x - x - x - x - x - x - x - x - x - x');
// 						} 
// 						// else if (response.statusCode == 200) {
// 						// 	// console.log(); // Print the error if one occurred
// 						// }
// 						requestResults[currentLink] = response.statusCode;
// 						// console.log(currentLink + ' : ' + response.statusCode);
// 						// requestResults.push(allHtml[i] + ' : ' + response.statusCode);

// 						// console.log(requestResults);

// 					} else {
// 						console.log('undefined: ' + currentLink);
// 					}

// 					// requestResults[allHtml[i]] = response.statusCode;

// }



/*
EXPLNATION: 

- request(currentLink, null, testLink.bind(null, currentLink, requestResults) );
	-- currentLink = url
	-- null = options
	-- testLink = callback function

- testLink.bind(null, currentLink, requestResults)
	-- null = this
	-- currentLink = local version of the currentLink var
	-- requestResults == local version of the requestResults var

The funciton implementation is defined as:
- function testLink(currentLink, requestResults, error, response, body) {}
	-- variables passed in at the bind will preceed (in order) the variables that are passed into the function at runtime

*/

	function testLink(currentLink, requestResults, error, response, body) {

		if (response != undefined) {
			if (error == !null || response.statusCode != 200 ) {
				console.log('error: ' + response.statusCode + ' : ' + currentLink);
			}
			requestResults[currentLink] = response.statusCode;
		} else {
			console.log('undefined link: ' + currentLink);
		}

	}//end testLink



})();
