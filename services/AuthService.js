import ApiService from './ApiService';
import MD5Service from './MD5Service';
export default class PaymentService extends ApiService {
    async accessToken(appId, appSecret) {
        let timestamp = new Date().getTime();
        let appIdAppSecret = appId + appSecret;
        let appIdAppSecretMD5 = MD5Service.encrypt(appIdAppSecret);
        let appIdAppSecretMD5Timestamp = appIdAppSecretMD5 + timestamp;
        let sign = MD5Service.encrypt(appIdAppSecretMD5Timestamp);
        let data = await this.get(`/app/access`, {
            app_id: appId,
            sign: sign,
            timestamp: timestamp
        }, false);
        return data;
    }

    login(accessToken) {
        return new Promise((resolve) => {
            my.getAuthCode({
                scopes: 'auth_base', // 主动授权：auth_user，静默授权：auth_base。或者其它scope
                success: async (res) => {
                    console.log('auth code', res);
                    let data = await this.get(`/ali/login/${res.authCode}`, {access_token: accessToken});
                    return resolve(data);
                },
                fail: (res) => {
                    console.log(res);
                    return resolve(false);
                }
            });
        });
    }
}