import crypto from "crypto";
export const sign = (secretkey: string, path: string, params: string = '', method: string = 'GET') => {
    const hmac = crypto.createHmac('sha256', secretkey);
    const ts = new Date().toISOString();
    return [
        ts,
        hmac.update(`${ts}${method}${path}${params && JSON.stringify(params)}`).digest('base64')
    ];
}