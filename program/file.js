/*
Regex obtained from Anthony in the stackexchange post
http://webmasters.stackexchange.com/questions/1186/how-do-you-remove-invalid-characters-when-creating-a-friendly-url-ie-how-do-you
 */
function toCipherText(string, key) {
  let length = string.length;
  let snew = '';

  for (let letter = 0; letter < length; letter++) {
    let lnum = string.charCodeAt(letter);
    let nnum = Math.ceil(Math.abs(-length^lnum / letter + letter^lnum * length / (34 + lnum^letter - length^key + letter * key / lnum) * lnum^length % 23 + key)) % (126 - 33) + 33;

    snew = snew + String.fromCharCode(nnum);
  }
  return snew;
}

function toASCII(string) {
  let length = string.length;
  let snew = '';

  do {
    snew = snew + string.charCodeAt(length - 1);
  } while (--length);
  return snew;
}

function isURLValid(string, exceptions) { // Exceptions handles the periods that aren't necessary bad such as www. and .com
  if (string.match(/[^a-z0-9\s-]/g).length - exceptions == 0) {
    return true;
  }
}

if (isURLValid(window.location.hostname, 2)) {
  console.log(toCipherText(window.location.hostname, toASCII(window.location.hostname)));
} else {
  console.log(null);
}
