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
        // my.alert({
        //     title: 'd',
        //     content: JSON.stringify(options)
        // });
        if (options['query']) {
            if (options['query']['store_id']) {
                this.globalData.storeId = options['query']['store_id'];
            } else {
                let qrCode = options['query']['qrCode'];
                let arr = qrCode.split('/');
                this.globalData.storeId = parseInt(arr[arr.length - 1]);
            }
        }
    },
    onShow(options) {
    },
});
