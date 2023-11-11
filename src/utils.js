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

export const getUserStatus = (user) => {
    return { kode: user.kode, keterangan: user.keterangan, waktuAbsen: user.waktuAbsen, absen: user.absen };
}