import md5 from 'crypto-js/md5';
import sha1 from 'crypto-js/sha1';
import sha256 from 'crypto-js/sha256';
import sha512 from 'crypto-js/sha512';
import crypto from 'crypto-js'



const data = " Привет мир"


function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }


const arrbuf = str2ab(data)
const wordArray = crypto.lib.WordArray.create(arrbuf);
const hash = md5(wordArray).toString(crypto.enc.Hex);
const hashSha1 = sha1(hash).toString(crypto.enc.Hex)
const hashSha256 = sha256(hash).toString(crypto.enc.Hex)
const hashSha512 = sha512(hash).toString(crypto.enc.Hex)

console.log(hash)
console.log(hashSha1)
console.log(hashSha256)
console.log(hashSha512)