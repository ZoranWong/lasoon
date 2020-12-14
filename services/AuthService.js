import ApiService from './ApiService';
import MD5Service from './MD5Service';
export default class PaymentService extends ApiService {
    formatTime (date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        const t1 = [year, month, day].map(this.formatNumber).join('-');
        const t2 = [hour, minute, second].map(this.formatNumber).join(':');
        return `${t1} ${t2}`;
    }
    formatNumber (n) {
        const str = n.toString()
        return str[1] ? str : `0${str}`
    }
    async accessToken(appId, appSecret) {
        // let timestamp = new Date().getTime();
        let timestamp = new Date(); //  '2019-10-02 08:02:23'
        timestamp = this.formatTime(timestamp);
        let appIdAppSecret = appId + appSecret;
        let appIdAppSecretMD5 = MD5Service.encrypt(appIdAppSecret);
        let appIdAppSecretMD5Timestamp = appIdAppSecretMD5 + timestamp;
        let sign = MD5Service.encrypt(appIdAppSecretMD5Timestamp);
        let data = await this.get(`/api/mp/access_token`, {
            project_id:appId,
            sign: sign,
            timestamp: timestamp
        }, false);
        return data;
    }

    login() {
        return new Promise((resolve) => {
            my.getAuthCode({
                scopes: 'auth_base', // 主动授权：auth_user，静默授权：auth_base。或者其它scope
                success: async (res) => {
                    console.log('auth code', res.authCode);
                    let data =await this.get('/api/ali/oauth/token',{code:res.authCode,})
                    return resolve(data);
                },
                fail: (res) => {
                    console.log(res,'失败');
                    return resolve(false);
                }
            });
        });
    }
}