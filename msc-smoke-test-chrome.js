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
// var chrome = require('chromedriver');
require('chromedriver');

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

	let driver = await new Builder().forBrowser('chrome').build();

	try {
		// driver.get("https://username:password@uat-msc.codereach.co.uk/");//works in chrome
		// driver.get("https://www.msinvestments.co.uk/ ");
		// driver.get("https://www.msinvestments.co.uk/news");
		driver.get("https://www.msinvestments.co.uk/contact-us");

		// checkAllLinks();
		// checkHeaderSearch();
		// checkCarousel();
		// checkNewsFilter();
		// checkNewsFilterKeyword();
		// checkNewsLoadMoreButton();
		checkOfficesFilter();

	} 
	catch(error) {
		console.error(error);
		// expected output: SyntaxError: unterminated string literal
		// Note - error messages will vary depending on browser
	}
	finally {
		// console.log('*** Test Completed ***');
	// await driver.quit();
	}


	function checkAllLinks() {

		/*
		BIND EXPLNATION: 

		- request(currentLink, null, checkAllLinks.bind(null, currentLink, requestResults) );
			-- currentLink = url
			-- null = options
			-- checkAllLinks = callback function

		- checkAllLinks.bind(null, currentLink, requestResults)
			-- null = this
			-- currentLink = local version of the currentLink var
			-- requestResults == local version of the requestResults var

		The funciton implementation is defined as:
		- function checkAllLinks(currentLink, requestResults, error, response, body) {}
			-- variables passed in at the bind will preceed (in order) the variables that are passed into the function at runtime

		*/

		function checkLink(currentLink, requestResults, error, response, body) {

			if (response != undefined) {
				if (error == !null || response.statusCode != 200 ) {
					console.log('error: ' + response.statusCode + ' : ' + currentLink);
				}
				requestResults[currentLink] = response.statusCode;
			} else {
				console.log('undefined link: ' + currentLink);
			}

		}


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
					request(currentLink, options, checkLink.bind(null, currentLink, requestResults) );

				}

			}, err => {
			  // console.error('An error occured! ' + err);
			  setTimeout(() => {throw err}, 0);
			});





		});

	}//end checkAllLinks


	function checkHeaderSearch() {

		//name=search_block_form
		//enter text 
		//click search button - name=submit
		//wait until the page loads
		//chekc there is at least one result - number of elements with a class of: about-link

		var searchBar = driver.findElement(By.name("search_block_form"));
		searchBar.sendKeys("home");
		var searchButton = driver.findElement(By.name("submit")).click();

		const button = driver.wait(
		  // until.elementLocated(By.id('my-button')), 
		  // until.elementLocated(By.name("op")),
		  until.elementLocated(By.className("page-search")),
		  20000
		)
		.then(element => {
		   // return driver.wait(
		   driver.wait(
			 until.elementIsVisible(driver.findElement(By.className("search-results"))),5000
		   ).then(() => {
			    console.log('loaded');
			    driver.wait(
				  driver.findElements(By.className("about-link")),
				  20000
				)
				.then(element => {
					console.log(element.length);
				});
			});
		});
		// button.click();

	}//end checkHeaderSearch


	function checkCarousel() {

		var values = [];

		function getTitle(cssValue) {

		    return driver.wait(
			  driver.findElement(By.css(cssValue)),
			  20000
			)
			.then(element => element.getText() )
			.then(elementText => {
				console.log(elementText);
				values.push(elementText);
				console.log(values);

				//If values array is > 2 then run the test
				if (values.length > 1) {
					//here test if the two values are different
					//A false result means there is no difference in the size of the new array, so all values were unique
					//A true result means that the two sizes were different
					// console.log( 'The result of the Carousel test is: ' + (new Set(values)).size !== values.length + ' - the carousel rotated.' );
					console.log( (new Set(values)).size !== values.length );
					console.log( new Set(values) );//outputs the new array with unique values
				}
			});

		}

	    driver.wait(
		  getTitle(".hero-title li.active"),
		  5000
		).then(() => {

		    driver.wait(
		      //click the button
			  driver.findElement(By.css(".hero-carousel .right")).click(),
			  5000
			).then(() => {

				setTimeout(function() {
					getTitle(".hero-title li.active");
					// console.log('done');
				}, 2000);
				// getTitle(".hero-title li.active");//comment out above and uncomment here for test reuslt to be true

			});

		});

	}//end checkCarousel


	function checkNewsFilter() {

		driver.findElement(By.css('#edit-field-capabilities-tid > option:nth-child(31)')).click();
		driver.findElement(By.css('#edit-field-news-post-date-value-1-value-month > option:nth-child(8)')).click();
		driver.findElement(By.css('#edit-field-news-post-date-value-1-value-year > option:nth-child(9)')).click();
		driver.findElement(By.css('#edit-submit-clone-of-news-year')).click();

	}//end checkNewsFilter


	function checkNewsFilterKeyword() {

		//Below can be used for a further test to provide combo-results, so keyword and filter
		// driver.findElement(By.css('#edit-field-capabilities-tid > option:nth-child(31)')).click();
		// driver.findElement(By.css('#edit-field-news-post-date-value-1-value-month > option:nth-child(2)')).click();
		// driver.findElement(By.css('#edit-field-news-post-date-value-1-value-year > option:nth-child(9)')).click();
		// driver.findElement(By.css('#edit-submit-clone-of-news-year')).click();

		driver.findElement(By.id('edit-combine')).sendKeys('home', Key.RETURN);

	}//end checkNewsFilterKeyword


	function checkNewsLoadMoreButton() {

//count how many are in this div: class = #work-block .views-view-grid
//count how many are hidden:  #work-block .views-view-grid .hidden
//click the load more button - id = load-more

//now cound how many are hidden, it should be 2 less
//perform test again n times to be sure

		var totalrows = 0;
		var hiddenRows = 0;
		var difference = [];


		function populateTotalRows() {

			return driver.findElements(By.css('#work-block .views-view-grid .row'))
				.then(function (elements) {
					// console.log('Total Rows: ' + elements.length);//correct
					totalrows = elements.length;
			});

		}//end populateTotalRows


		function populateHiddenRows() {

			return driver.findElements(By.css('#work-block .views-view-grid .hidden'))
				.then(function (elements) {
					// console.log('Hidden Rows: ' + elements.length);//correct
					hiddenRows = elements.length;
			});

		}//end populateHiddenRows


		// function runTest() {

			driver.wait(
			  populateTotalRows(),
			  5000
			)
			.then(function (elements) {
				driver.wait(
				  populateHiddenRows(),
				  5000
				)
				.then(function (elements) {

					console.log('Total Rows -: ' + totalrows);//correct
					console.log('Hidden Rows -: ' + hiddenRows);//correct
					console.log('Rows not hidden: ' + parseInt(totalrows - hiddenRows));

					driver.findElement(By.id('load-more')).click();


					driver.wait(
					  populateTotalRows(),
					  5000
					)
					.then(function (elements) {
						driver.wait(
						  populateHiddenRows(),
						  5000
						)
						.then(function (elements) {

							console.log('Total Rows -: ' + totalrows);//correct
							console.log('Hidden Rows -: ' + hiddenRows);//correct
							console.log('Rows not hidden: ' + parseInt(totalrows - hiddenRows));

							driver.findElement(By.id('load-more')).click();

							driver.wait(
							  populateTotalRows(),
							  5000
							)
							.then(function (elements) {
								driver.wait(
								  populateHiddenRows(),
								  5000
								)
								.then(function (elements) {

									console.log('Total Rows -: ' + totalrows);//correct
									console.log('Hidden Rows -: ' + hiddenRows);//correct
									console.log('Rows not hidden: ' + parseInt(totalrows - hiddenRows));

								});
							});

						});
					});

				});
			});

		// }//end runTest


	}//end checkNewsLoadMoreButton


	function checkOfficesFilter() {


			var initialItems = 0;
			var filteredItems = 0;


			//look here for a reference:
			//https://medium.freecodecamp.org/how-to-write-reliable-browser-tests-using-selenium-and-node-js-c3fdafdca2a9#8277


			// driver.wait(
			//   populateInitialItems(),
			//   5000
			// );

			// wait(condition, timeout = undefined, message = undefined) {}

			 // To define a custom condition, simply call WebDriver.wait with a function
			 // that will eventually return a truthy-value (neither null, undefined, false,
			 // 0, or the empty string):

			 //     driver.wait(function() {
			 //       return driver.getTitle().then(function(title) {
			 //         return title === 'webdriver - Google Search';
			 //       });
			 //      }, 1000);

			driver.wait(
			  function() {
			  	return driver.findElements(By.css('.view-locations article'))
					.then(function (elements) {
						console.log('Total Items: ' + elements.length);//correct
						initialItems = elements.length;
						driver.findElement(By.css('#edit-field-group-company-tid > option:nth-child(9)')).click();
						return true;
					});
			  },
			  5000
			);


			// driver.wait(
			//   function() {
			//   	return initialItems > 0;
			//   },
			//   5000
			// );





			// driver.wait(
			//   until.elementLocated(By.className('ajax-progress')),
			//   5000  
			// )



			let iframeElem = driver.wait(
			  until.elementLocated(By.className('ajax-progress')),
			  5000  
			);


			driver.wait(
			  until.stalenessOf(iframeElem),
			  5000
			)
			.then(function () {

				return driver.findElements(By.css('.view-locations article'))
					.then(function (elements) {
						console.log('Filtered Items: ' + elements.length);//correct
						filteredItems = elements.length;
						console.log('Difference is: ' + parseInt(filteredItems - initialItems));
						return true;
				});

			})




			// driver.wait(
			//   populateInitialItems(),
			//   5000
			// );


			// driver.findElements(By.css('.view-locations article'))
			// 		.then(function (elements) {
			// 			console.log('Total Items: ' + elements.length);//correct
			// 			initialItems = elements.length;
			// });

			// driver.findElement(By.css('#edit-field-group-company-tid > option:nth-child(9)')).click();

			// driver.wait(
			//   driver.findElement(By.css('#edit-field-group-company-tid > option:nth-child(9)')).click(),
			//   5000
			// );



			// let iframeElem = driver.wait(
			//   until.elementLocated(By.className('ajax-progress')),
			//   5000  
			// );

			// driver.wait(
			//   until.stalenessOf(iframeElem),
			//   5000
			// );
			// // .then(function() {
			// // 	console.log('its done');
			// // });

			// let result = driver.wait(
			//   populateFilteredItems(),
			//   5000
			// );

			// console.log('Difference is: ' + parseInt(filteredItems - initialItems));



			// function populateInitialItems() {

			// 	return driver.findElements(By.css('.view-locations article'))
			// 		.then(function (elements) {
			// 			console.log('Total Items: ' + elements.length);//correct
			// 			initialItems = elements.length;
			// 	});

			// }//end populateInitialItems


			// function populateFilteredItems() {

			// 	return driver.findElements(By.css('.view-locations article'))
			// 		.then(function (elements) {
			// 			console.log('Filtered Items: ' + elements.length);//correct
			// 			filteredItems = elements.length;
			// 	});

			// }//end populateInitialItems




	}




	function checkContactUsForm() {

	}//end checkContactUsForm


})();




/*

Definition fo the test:
- navigate to https://www.msinvestments.co.uk/ 
	- check all links
	- Enter keyword and click on search icon - Keyword related search result should appear.
	- Carousel section should be working properly.

- navigate to https://www.msinvestments.co.uk/why-work-us
	- check all links

- nagigate to https://www.msinvestments.co.uk/our-projects
	- check all links

- nagigate to https://www.msinvestments.co.uk/responsible-business
	- check all links

- nagigate to https://www.msinvestments.co.uk/news
	- check all links
	- Selected option from dropdown and click on filter button - Result should appear accroding to filter
	- Enter keyword in field and click on serach button - keyword related serach result should appear.
	- Load more news button should be working properly

- nagigate to https://www.msinvestments.co.uk/contact-us
	- check all links
	- Selected any option from "Find offices in our network" dropdown - Offices in our network should filter accroding to selected value.
	- "Send us a direct message" form should be working properly...from Punit "if we check vaildation working we leave it blank filed and click on subit button, If we check form working properly -  we enter test value in field"

*/














    // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);//sendKeys = typing into an element.
    // await driver.findElements(By.name('a')).sendKeys('webdriver', Key.RETURN);





	// driver.findElement(By.linkText("Images")).getAttribute("href").then(function(href) {
	// 	// assert(the_href.contains("/site/index.html"))
	// 	console.log(href.length);
	// 	console.log(href);
	// 	console.log('*** *** ***');
	// });
	//in console runtime href is: 	https://www.google.co.uk/imghp?hl=en&amp;tab=wi
	//in source it is: 				https://www.google.co.uk/imghp?hl=en&amp;tab=wi
	//in node console it is: 		https://www.google.co.uk/imghp?hl=en&    tab=wi



// await driver.wait(until.titleIs('webdriver - Google Search'), 1000);


	// driver.switchTo().alert().then(
	//   function() {
	//     console.log("alert detected");
	//   },
	//   function() {
	//     console.log("no alert detected");
	//   }
	// );










// await driver.findElements(By.name('a')).sendKeys('webdriver', Key.RETURN);

// driver.wait(function () {
//     return driver.isElementPresent(webdriver.By.name("username"));
// }, timeout);


		// driver.wait(async function () {
		//     // driver.isElementPresent(By.name("op"));
		//     driver.findElement(By.name("op"));

		// }, 5000);

		// driver.wait(until.elementLocated(By.name('op')), 5 * 1000).then(el => {
		//     // return el.sendKeys(username);
		//     console.log('loaded');
		// });

		// await driver.isElementPresent(driver.By.name("op"));
		// console.log('loaded');



//works
		// const button = driver.wait(
		//   // until.elementLocated(By.id('my-button')), 
		//   until.elementLocated(By.name("op")), 
		//   20000
		// );
		// button.click();
		// console.log('loaded');





