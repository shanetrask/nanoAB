var debug = true; // set to true or false

// random selection implementation
var randSlots = ["randomAB"];
randomSetAB(debug, randSlots);



// cookie-based implementation
var cName = "ab_test"; // the name of the cookie component
var cValues = ["ab_test_Agroup", "ab_test_Bgroup"]; // the names of the 
var cShelfLife = 7; // cookie duration, in days from set
var cookieSlots = ["cookieAB"];
var cValue = checkCookie(debug, document.cookie, cName, cValues, cShelfLife);
cookieSetAB(debug, cValue, cValues, cookieSlots);


var purgeCookieOnReload = false;
if (purgeCookieOnReload) {
	console.log(document.cookie);
	
	deleteCookie(debug, cName);
	console.log(cName + " removed");
}