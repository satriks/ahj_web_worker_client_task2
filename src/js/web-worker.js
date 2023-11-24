
import md5 from 'crypto-js/md5';
import sha1 from 'crypto-js/sha1';
import sha256 from 'crypto-js/sha256';
import sha512 from 'crypto-js/sha512';
import crypto from 'crypto-js'

self.addEventListener('message', (event) => {
    const {arrayBuffer, type} = event.data;
    const hash = cryptor(arrayBuffer,type)
    if (hash) {self.postMessage(hash)}

})

function cryptor(arrayBuffer,type) {
    const wordArray = crypto.lib.WordArray.create(arrayBuffer);
    switch (type) {
        case "MD5":
            const hashMD5 = md5(wordArray).toString(crypto.enc.Hex);
            const regexExp = /^[a-f0-9]{32}$/gi
            if (regexExp.test(hashMD5)) {return hashMD5}
            else {return null}
        case "SHA1":
            const hashSHA1 = sha1(wordArray).toString(crypto.enc.Hex);
            const regexExp1 = /^[a-f0-9]{40}$/gi
            if (regexExp1.test(hashSHA1)) {return hashSHA1}
            else {return null}
        case "SHA256":
            const hashSHA256 = sha256(wordArray).toString(crypto.enc.Hex);
            const regexExp256 = /^[a-f0-9]{64}$/gi;
            if (regexExp256.test(hashSHA256)) {return hashSHA256}
            else {return null}
        case "SHA512":
            const hashSHA512 = sha512(wordArray).toString(crypto.enc.Hex);
            const regexExp512 = /^[a-f0-9]{128}$/gi;
            if (regexExp512.test(hashSHA512)) {return hashSHA512}
            else {return null}
    
        default:
            return null;
    }
    
}