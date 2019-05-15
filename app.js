import AppConfig from './config/app';
App({
    globalData: {
        config: AppConfig,
        token: null,
        accessToken: null,
        logo: null,
        contactPhoneNum: null,
        storeId: null
    },
    onLaunch(options) {
        console.log('launch options', options);
        this.globalData.storeId = 2;
        if (options['query']) {
            if (options['query']['store_id']) {
                this.globalData.storeId = options['query']['store_id'];
                console.log('========++++++++==========');
            } else {
                let qrCode = options['query']['qrCode'];
                let arr = qrCode.split('/');
                this.globalData.storeId = parseInt(arr[arr.length - 1]);
                console.log('========++++-------++++==========');
            }
        }
    },
    onShow(options) {
    },
});
