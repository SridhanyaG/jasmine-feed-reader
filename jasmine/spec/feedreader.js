/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls is not empty', function () {
            allFeeds.forEach(function (value) {
                expect(value.url).toBeDefined();
                expect(value.url.length).not.toBe(0);
            });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Name is not empty', function () {
            allFeeds.forEach(function (value) {
                expect(value.name).toBeDefined();
                expect(value.name.length).not.toBe(0);
            });
        });
    });


    /* Test suite named "The menu" */
    describe('The Menu', function () {
        /* A test that ensures the menu element is
         * hidden by default. CSS class selectors are matchers 
         * and compared with actuals
         */
        it('menu element is hidden', function () {
           expect($('body').hasClass('menu-hidden')).toEqual(true);
           expect($('.menu-hidden .slide-menu')[0]).toBeDefined();
        });

         /* Atest that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('menu element toggle feature', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            expect($('.menu-hidden .slide-menu')[0]).toBeUndefined();
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(true);
            expect($('.menu-hidden .slide-menu')[0]).toBeDefined();
         });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         /* A asynchronous request */
         beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });
        
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.*/
        it('verify if feed has atleast one entry', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        let selectedFeeds = []

        /* loadFeed() is asynchronous.*/
        beforeEach(function(done) {
            loadFeed(1, function() {
                console.log('First feed loaded!')
                selectedFeeds.push($('.feed').html());
                loadFeed(2, function() {
                    selectedFeeds.push($('.feed').html());
                    console.log('Second feed loaded!')
                    done();
                });
            });        
         });

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         it('verify two feeds are loaded', function () {
            expect(selectedFeeds.length).toBe(2);
            expect(selectedFeeds[0]).not.toBe(selectedFeeds[1]);
        });
    });
}());
