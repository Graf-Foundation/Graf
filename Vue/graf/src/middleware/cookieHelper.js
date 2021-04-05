class CookieHelper {




  // Get function to retrieve a field from cookies
  // @param key: corresponding string from when the key was stored
  // @return String: value corresponding to key
  getCookie(key) {
    var ind = this.findCookie(key);
    var kEndIndex = document.cookie.indexOf(String.fromCharCode(165),ind);
    var vEndIndex = document.cookie.indexOf(String.fromCharCode(163),kEndIndex);
    var value = document.cookie.substring(kEndIndex + 1, vEndIndex);
    return value;
  }

  // Put function to emplace or update a field in cookies
  // @param key: String for later retrieval
  // @param value: String value to be stored
  // @return boolean if an old value has been written over
  putCookie(key, value) {

    // USES ASCII 165 (Yen symbol) as a delimeter between corresponding key & value
    // String.fromCharCode(165)
    // USES ASCII 163 (GBPound symbol) as a delimeter after value before next unrelated key
    // String.fromCharCode(163)

    var ind = this.findCookie(key);

    
    var kEndIndex = -1;
    var vEndIndex = -1;
    
    var entryString = key + String.fromCharCode(165) + 
                      value + String.fromCharCode(163);
    if(ind == -1) {
      // Add the new key,value to the end of document.cookie
      document.cookie += entryString;
      return false;
    }
    kEndIndex = document.cookie.indexOf(String.fromCharCode(165), ind);
    vEndIndex = document.cookie.indexOf(String.fromCharCode(163), kEndIndex);
    
    var oldVal = document.cookie.substring(ind+1,vEndIndex+1);
    document.cookie = document.cookie.replace(oldVal,entryString);

    this.checkRepCookie();
    return true;
    

  }

  // Gives the index in the cookie string where the pre-key delimiter is located
  // @param key: String key to look up in cookie
  // @return int index of ASCII 163 before key in cookie, -1 if not found
  findCookie(key) {
    var s = String.fromCharCode(163) + key;
    var index = document.cookie.indexOf(s);
    return index;
  }
  // Query for if a given cookie exists
  // @param String 
  // @return boolean 
  isCookie(key) {
    return this.findCookie(key) != -1;
  }

  // Query for if the cookies are empty
  // @return boolean 
  isCookieEmpty() {
      return document.cookie == String.fromCharCode(163);
  }


  // Checks that the format of the cookies is valid. 
  // If the checks fail, the cookies string is set to GBPound symbol
  checkRepCookie() {
    var ind1 = 0;
    var ind2 = 0;
    var ind3 = 0;
    var isGood = true;

    var keySet = new Set();
    while(isGood) {
      ind2 = document.cookie.indexOf(String.fromCharCode(165), ind1);

      var k = document.cookie.substring(ind1+1,ind2);
      if(keySet.has(k)) {
        isGood = false;
        break;
      }
      keySet.add(k);

      ind3 = document.cookie.indexOf(String.fromCharCode(163), ind2);

      ind1 = ind3;

      if(ind1 == -1) {
        isGood = false;
        break;
      } else if(ind1 == document.cookie.length-1) {
        if(document.cookie.charAt(ind1) != String.fromCharCode(163)) {
          isGood = false;
          break;
        } else {
          isGood = true;
          break;
        }
      }
      
    }
    if(!isGood) {
      console.log("BAD COOKIE CHECK REP\n\n" + document.cookie);
      document.cookie = String.fromCharCode(163);
      console.log("NewBlankCookie: " + document.cookie);
      return;
    }

  }



}

export default new CookieHelper();