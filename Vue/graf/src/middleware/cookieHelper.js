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

    // console.log("PUT: key: " + key + "  val: " + value);

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


  // Compresses the node list and edge list into a much smaller file
  // @param input: String of complete graf data
  // @return String the compressed string
  compressGraf(input) {
    // console.log("INPUT: " + input);
    const COMPRESS_IGNORES = ["x", "y", "vx", "vy", "fx", "fy", "_color", "index"];
    const BIG_IGNORES = ["source","target"];


    const VALID_TOKENS = ["nodes","id","name","links","sid","tid","type","aggCount"];
    const DELIM_START_INT = 174;
    const BAD_FORMAT_TOKENS = ['{', '}', '[' ,']' ,',' ,'"'];
    // const DELIM_START_CHAR = String.fromCharCode(174);

    var result = "";

    var currIndex = -1;
    var lastEnd = -1;
    var tokenBack = -1;
    var isLinks = false;
    var compression = "";
    var nonCompress = false;
    var lastIteration = false;
    // var info = "";

    while(lastEnd < input.length) {


      // setting currIndex to be at next " symbol starting a key
      var x = input.indexOf("{\"", tokenBack+1);
      var y = input.indexOf(",\"", tokenBack+1);

      // console.log("x: " + x + ": " + y);
      if(x == -1) {
        if(y == -1) {
          currIndex = input.length;
          lastIteration = true;
        } else {
          currIndex = y+1;
        }
      } else if(y == -1) {
        currIndex = x+1;
      } else {
        currIndex = Math.min(x,y)+1;
      }

      // Add until the current key from last iteration
      result += input.substring(lastEnd,currIndex);

      // Further compression using delimeters
      if(!nonCompress) {
        for(var a = 0; a < VALID_TOKENS.length; ++a) {
          if(token === VALID_TOKENS[a]) {
            compression += String.fromCharCode(DELIM_START_INT+a);
            if(a === 6) {
              //COMPRESS (D)irected or (U)ndirected      
              // info += "TYPE" + input.substring(tokenBack + 3,tokenBack+4);        
              compression += input.substring(tokenBack + 3,tokenBack+4);
              break;
            }

            for(var ch = tokenBack + 2; ch < currIndex-1; ++ch) {
              // info += input.charAt(ch);
              var isBad = false;
              for(var i = 0; i < BAD_FORMAT_TOKENS.length; ++i) {
                if(input.charAt(ch) === BAD_FORMAT_TOKENS[i]) {
                  // info += "ISBAD ";
                  isBad = true;
                  break;
                }
              }
              if(!isBad) {
                compression += input.substring(ch,ch+1);
              }
            }
            break;
          }
        }
      }
      if(lastIteration) {
        break;
      }

      // TokenBack is the end of the key
      tokenBack = input.indexOf("\":", currIndex+1);

      // console.log("result: " + result);
      // console.log("currInd: " + currIndex + "   tokenBack: " + tokenBack);
      
      // The key in question
      var token = input.substring(currIndex+1,tokenBack);
      // console.log("token: " + token);
      // info += " " + token;
      // End of value info, to help ignore a field
      var backComma = input.indexOf(",", tokenBack);
      var backBrace = input.indexOf("}", tokenBack);
      lastEnd = currIndex;

      if(isLinks) {
        if(token === "id") {
          if(backBrace < backComma) {
            if(input.charAt(currIndex-1) === ',' && 
                result.charAt(result.length-1) == ',') {
              //delete previous comma in result
              result = result.substring(0,result.length-1);
              lastEnd = backBrace;
            } else if(result.charAt(result.length-1) == '{') {
              result = result.substring(0,result.length-1);
              lastEnd = backBrace+1;
            } else {
              //delete brace in future string addition
              lastEnd = backBrace+1;
            }
          } else {
            //delete comma in future string addition
            lastEnd = backComma+1;
          }
          continue;
        }
        nonCompress = true;
      }
      
      if(token === "links") {
        isLinks = true;
      }

      //Search for if the key's field is unnecessary
      for(var z = 0; z < COMPRESS_IGNORES.length; ++z) {
        if(token === COMPRESS_IGNORES[z]) {
          
          // key is unnecessary, do not add it or its field to 
          if(backBrace < backComma) {
            if(input.charAt(currIndex-1) === ',' && 
                result.charAt(result.length-1) == ',') {
              //delete previous comma in result
              result = result.substring(0,result.length-1);
              lastEnd = backBrace;
            } else if(result.charAt(result.length-1) == '{') {
              result = result.substring(0,result.length-1);
              lastEnd = backBrace+1;
            } else {
              //delete brace in future string addition
              lastEnd = backBrace+1;
            }
          } else {
            //delete comma in future string addition
            lastEnd = backComma+1;
          }
          // console.log("IGNORED: " + input.substring(currIndex,lastEnd));
          // info += "FOUND,  ";
          nonCompress = true;
          break;
        } else if(z < BIG_IGNORES.length && token === BIG_IGNORES[z]) {
          lastEnd = backBrace + 2;
          tokenBack = lastEnd - 2;
          // info += "FOUND,  ";
          nonCompress = true;
          break;
        } else {
          nonCompress = false;
        }
      }
    }


    // if(info != "aaaaaaa") {
    //   console.log("INFO: " + info);
    //   console.log(compression);
    // }
    console.log("RES: " + result);
    // console.log("COMPRESS: " + compression);

    return compression;

  }

  // Decompresses the GrafData compression
  // @param compressed: String of compressed Graf
  // @return String of decompressed Graf data
  decompressGraf(compressed) {
    console.log("COMPRESSED: " + compressed);
    
    // const VALID_TOKENS = ["nodes","id","name","links","sid","tid","type","aggCount"];
    const DECOMPRESS_STRINGS = ["{\"nodes\":[{", "\"id\":", "\"name\":", 
                              "}],\"links\":[", "\"sid\":", "\"tid\":", 
                              "\"type\":", "],\"aggCount\":"];
    const DOUBLE_NAKED_STRING = "},{";
    const DELIM_START_INT = 174;
    // const BAD_FORMAT_TOKENS = ['{', '}', '[' ,']' ,',' ,'"'];
    // const DELIM_START_CHAR = String.fromCharCode(174);

    var token;
    var tokenInt;

    var index = 0;
    var doubleNaked = false;
    var result = "";
    var end = false;

    while(!end && index < compressed.length) {
      console.log("RES: " + result);
      console.log("CHARAT " + index + ": " + compressed.charAt(index));
      token = compressed.charAt(index);
      tokenInt = compressed.charCodeAt(index);
      var tempString = "";
      var a;
      var b;
      var c;
      var d;
      switch(token) {
        //nodes
        case String.fromCharCode(DELIM_START_INT):
          console.log("AAA");
          doubleNaked = false;
          break;
        // links
        case String.fromCharCode(DELIM_START_INT+3):
          doubleNaked = false;
          if(compressed.charAt(index+1) != String.fromCharCode(DELIM_START_INT+7)) {
            tempString += "{";
          }
          break;
        // aggcount
        case String.fromCharCode(DELIM_START_INT+7):
          doubleNaked = false;
          if(compressed.charAt(index-1) != String.fromCharCode(DELIM_START_INT+3)) {
            result += "}";
          }
          tempString = compressed.substring(index+1) + "}";
          end = true;
          break;
        //id and sid
        case String.fromCharCode(DELIM_START_INT+1):
        case String.fromCharCode(DELIM_START_INT+4):
          console.log("BBB");
          if(doubleNaked) {
            result += DOUBLE_NAKED_STRING;
          }
          

          a = compressed.indexOf(String.fromCharCode(DELIM_START_INT+2), index);
          b = compressed.indexOf(String.fromCharCode(DELIM_START_INT+5), index);
          c = compressed.indexOf(String.fromCharCode(DELIM_START_INT+3), index);

          if(a === -1) a = Number.MAX_SAFE_INTEGER;
          if(b === -1) b = Number.MAX_SAFE_INTEGER;
          if(c === -1) c = Number.MAX_SAFE_INTEGER;
          
          d = Math.min(a,b,c);
          console.log("a: " + a + "  b: " + b + "  c: " + c + "  d: " + d);
          // var str = "";
          // for(var zzz = 0; zzz < 10; ++zzz) {
          //   str += String.fromCharCode(DELIM_START_INT + zzz);
          // }
          // console.log("STR " + str);
          tempString = compressed.substring(index+1,d);
          index = d-1;
          break;
        //tid
        case String.fromCharCode(DELIM_START_INT+5):
          console.log("CCC");
          result += ",";
          break;
        //name
        case String.fromCharCode(DELIM_START_INT+2):
          console.log("DDD");
          result += ",";
          doubleNaked = true;
          a = compressed.indexOf(String.fromCharCode(DELIM_START_INT+1),index);
          b = compressed.indexOf(String.fromCharCode(DELIM_START_INT+3), index);

          if(a === -1) a = Number.MAX_SAFE_INTEGER;
          if(b === -1) b = Number.MAX_SAFE_INTEGER;
          
          c = Math.min(a,b);
          console.log("a: " + a + "  b: " + b + "  c: " + c);
          tempString = "\"" + compressed.substring(index+1,c) + "\"";
          index = c-1;
          break;
        //type
        case DELIM_START_INT+6:
          console.log("EEE");
          result += ",";
          break;
      }
      // console.log("A" + result);
      result += DECOMPRESS_STRINGS[tokenInt - DELIM_START_INT];
      // console.log("B" + result);
      result += tempString;
      // console.log("C" + result);
      ++index;

    }



    console.log("F" + result);
    return compressed;







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