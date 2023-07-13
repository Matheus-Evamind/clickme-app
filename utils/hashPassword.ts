import * as CryptoJS from 'crypto-js';


export const HashPasswordSHA256 = (password: string) => {
    const key = CryptoJS.enc.Utf8.parse('4512631236589784');
    const iv = CryptoJS.enc.Utf8.parse('4512631236589784');

    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
}