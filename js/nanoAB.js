// a very lightweight AB testing library

// Random implementation
// Randomly present A or B for each slot
// Does not use cookies

function randomSetSlot(debug, slot) {
  if (debug) {
    console.log("updating slot: " + slot);
  }
  if (slot.length == 1) {
    // we have only a single promo, so no AB randomization is needed
    document.getElementById(slot[0]).style.display = 'block';
  }
  else if (slot.length == 2) {
    // we have more than one potential ad for this slot
    var prob = Math.random();
    if (debug) {console.log(prob);}
      
    if (prob < 0.5) {
      document.getElementById(slot[0]).style.display = 'block';
      if (debug) {console.log(slot[0]);}
    }
    else {
      document.getElementById(slot[1]).style.display = 'block';
      if (debug) {console.log(slot[1]);}
    }
  }
}

function randomSetAB(debug, slots) {  
  for (var s in slots) {
    var slot = [];
    var sList = document.getElementsByClassName(slots[s]);
    if (debug){
      console.log("Slot is - " + slots[s]);
    }
    
    for (var i=0; i< sList.length; i++) {
      slot.push(sList[i].id);
    }
    
    if (debug) {
      console.log("Slot IDs are - " + slot);
    }
    randomSetSlot(debug, slot);
  } 
}

// Cookie-based implementation
// Uses a cookie to persistently present A or B content

// function modified from w3 schools
function getCookie(debug, cName) {
  var name = cName + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length,c.length);
    }
  }
  return "";
}


// Sets AB cookie and an expiration token
function setCookie(debug, cName, cValues, exDays = 7) {
  var cValue;
  var d = new Date();
  d.setTime(d.getTime() + (exDays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  var prob = Math.random();
  if (prob < 0.5) {
        cValue = cValues[0];
      }
      else {
        cValue = cValues[1];
      }
  document.cookie = cName + "=" + cValue + ";" + expires;
  return cValue;
}


function deleteCookie(debug, cName) {
  var exp = "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = cName + exp;
  if (debug) {
    return document.cookie;
  }
}


// checks for the value of the ab test cookie
function checkCookie(debug, cookie, cName, cValues, cShelfLife) {
  // 
  var haveCookie;
  var cValue = getCookie(debug, cName);
  // var cExpired = false;
  
  if (cValue === "" || cValue === "undefined") {
    // browser does not have the expected cookie
    haveCookie = false;
  }
  // else if (cValue !== "" && cExpired === true) {
  //   // browser has cookie, but it is expired
  //   haveCookie = false;
  // }
  else {
    haveCookie = true;
  }
  
  // if we already have a set cookie, return that value
  if (haveCookie === true) {
    return cValue;
  }
  else {
    // we do not have a set cookie,
    // need to set and then return new value
    cValue = setCookie(debug, cName, cValues, cShelfLife);
    return cValue;
  }
}

// Check cookie;
// If none, then set it;
// Now that it is set, determine which content to display;

function cookieSetSlot(debug, slot, cValue, cValues) {
  if (debug) {
    console.log("updating slot: " + slot);
  }
  if (slot.length == 1) {
    // we have only a single variant, so no AB checking is needed
    document.getElementById(slot[0]).style.display = 'block';
  }
  else if (slot.length == 2) {
    // we have two potential variants for this slot
    if (cValue == cValues[0]) {
      document.getElementById(slot[0]).style.display = 'block';
    }
    else {
      document.getElementById(slot[1]).style.display = 'block';
    }
  }
}

function cookieSetAB(debug, cValue, cValues, slots) {
  for (var s in slots) {
    var slot = [];
    var sList = document.getElementsByClassName(slots[s]);
    if (debug){
      console.log("Slot is - " + slots[s]);
    }
    
    for (var i=0; i< sList.length; i++) {
      slot.push(sList[i].id);
    }
    
    if (debug) {
      console.log("Slot IDs are - " + slot);
    }
    cookieSetSlot(debug, slot, cValue, cValues);
  } 
}

/*

working on a wrapper to clean this up...

var NanoAB = function (debug, slots, cName=undefined, cValues=undefined, cShelfLife=undefined, randFallback=false) {
	// wrapper for both random and cookie-based implementations
	this.debug = debug;
	this.slots = slots;
	this.cName = cName;
	this.cValues = cValues;
	this.cShelfLife = cShelfLife;
	this.randFallback = randFallback;
};

var go = function () {
		// check for cookie usage - is allowed and desired?
	var useCookies = true;
	if (navigator.cookieEnabled === false) {
		useCookies = false;
	}
	else if (this.cName === undefined) {
		useCookies = false;
	}

	// core logic
	if (useCookies === false) {
		// we cannot use cookies
		// thus the first in the slot should be displayed

	}
	else if ()
};

*/