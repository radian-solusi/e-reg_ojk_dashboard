import { encryptAES, decryptAES, generateRandomString } from "web-secure-encryption";
import CryptoJS from 'crypto-js';


const key = import.meta.env.VITE_SECRET_KEY_APP;
const iv = generateRandomString(16);


export async function encrypt(text: string): Promise<string> {
    const encrypted = await encryptAES(text, key);
    return encrypted;
}

export function decrypt(encryptedText: string): Promise<string> {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
    return decrypted;
}