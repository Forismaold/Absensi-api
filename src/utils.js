import CryptoJS from "crypto-js"
export function encryptObject(object) {
    const jsonString = JSON.stringify(object)

    const encryptedmsg = CryptoJS.AES.encrypt(jsonString, process.env.CRYPTO_KEY).toString()
    return encryptedmsg
}

export function dencryptObject(encryptedmsg) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedmsg, process.env.CRYPTO_KEY)
    const decryptedJsonString = decryptedBytes.toString(CryptoJS.enc.Utf8)

    const decryptedObject = JSON.parse(decryptedJsonString)

    return decryptedObject
}

export const getUserStatus = (user = {}) => {
    return { kode: user.kode, keterangan: user.keterangan, waktuAbsen: user.waktuAbsen, absen: user.absen, koordinat: user?.koordinat || [0, 0] };
}

export const maskEmail = (email) => {
    if (!email.includes('@')) return email; // Return as is if invalid

    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) return email; // No need to mask if too short

    const maskedLocal = `${localPart[0]}${'*'.repeat(localPart.length - 2)}${localPart[localPart.length - 1]}`;
    return `${maskedLocal}@${domain}`;
};
