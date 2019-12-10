export interface LoanObject {
    sum: number,
    days: number,
    services: {
        insurance: 0 | 1,
        legal: 0 | 1,
    },
    promoCode: string,
    paySystem: number,
    accountId: number,
    screenX: number,
    screenY: number,
    browserInfo: string,
    deviceInfo: string,
    latitude: number | null,
    longitude: number | null,
    platform: 1,
}