export function convertToBase62(n: number) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (n === 0) return '0000000';

    let result = '';
    while (n > 0) {
        result = chars[n % 62] + result;
        n = Math.floor(n / 62);
    }

    return result.padStart(7, '0');
}