


export function getServiceAccountKey() {
    const encodedKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    if (!encodedKey) return null

    return JSON.parse(
        Buffer.from(encodedKey, 'base64').toString('utf-8')
    )
}


