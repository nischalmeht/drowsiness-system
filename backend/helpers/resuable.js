const crypto = require('crypto');

// Encryption function
const encrypt= (text, key, iv)=> {
    console.log(text,'Hello, World!')
    // const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    // let encrypted = cipher.update(text);
    // encrypted = Buffer.concat([encrypted, cipher.final()]);
    // return encrypted.toString('hex');
}

module.exports=encrypt;
