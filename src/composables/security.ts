import CryptoJS from 'crypto-js';

const rawKey = import.meta.env.VITE_SECRET_KEY_APP;
const key = CryptoJS.SHA256(rawKey).toString(CryptoJS.enc.Hex); // Kunci 256-bit
const iv = CryptoJS.lib.WordArray.random(16); // IV 128-bit

export function encrypt(text: string): string {
    const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv }).toString();
    return encrypted;
}

export function decrypt(encryptedText: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
    return decrypted;
}