import PaymentService from '../../services/PaymentService';
import AuthService from '../../services/AuthService';
import ShopService from '../../services/ShopService';
Page({
    paymentService: null,
    data: {
        paymentAmount: '',
        storeId: 1,
        logo: null,
        shopName: null,
        adress: null,
        mobile: null
    },
    async init() {
        console.log('data info', this.data);
        let app = getApp();
        let authService = new AuthService(app.globalData.config.gateway);
        let data = await authService.accessToken(app.globalData.config.appId, app.globalData.config.appSecret);
        app.globalData.accessToken = data['access_token'];
        app.globalData.contactPhoneNum = data['contact_phone_num'];
        app.globalData.logo = data['logo'];
        this.setData({ logo: data['logo'] });
        let user = await authService.login(data['access_token']);
        console.log('user info', user);
        this.paymentService = new PaymentService(app.globalData.config.gateway, user['token']);
        let shopService = new ShopService(app.globalData.config.gateway, user['token']);
        let shop = await shopService.shop(this.data.storeId);
        console.log('shop info', shop);
        this.setData({ shopName: shop['name'], address: shop['address'] });
    },
    async pay() {
        console.log(this.data);
        if (this.data.paymentAmount > 0) {
            let order = await this.paymentService.createOrder(this.data.storeId, this.data.paymentAmount,
                this.data.address, this.data.mobile, this.data.shopName);
            let result = await this.paymentService.payment(order['id']);
            console.log('payment sign', result);
            my.tradePay({
                tradeNO: result['trade_no'],
                success: function(res) {
                    console.log('----------- trade pay ----------', res);
                    if (res.resultCode == 9000) {
                        my.navigateTo({ url: '/pages/paySuccess/index' });
                    }else if (res.resultCode == 6001) {

                    }
                },
                fail: function(res) {
                    my.alert(res.resultCode);
                },
            });
        }
    },
    onInputClear() {
        this.setData({
            paymentAmount: '',
        });
    },
    onInputConfirm() {
        my.alert({
            content: 'confirmed',
        });
    },
    onInput(e) {
        const paymentAmount = e.detail.value;
        this.setData({
            paymentAmount: parseFloat(paymentAmount)
        });
    },
    onButtonClick() {
        my.alert({
            content: 'button clicked',
        });
    },
    onInputFocus() {

    },
    onInputBlur() {

    },
    onLoad(query) {
        console.log('qurey data', query);
    },
    onReady() {
        // 页面加载完成
    },
    onShow() {
        let app = getApp();
        // 页面显示
        if (app.globalData.storeId) {
            this.setData({
                storeId: parseInt(app.globalData.storeId)
            });
        }

        this.init();
    },
    onHide() {
        // 页面隐藏
    },
    onUnload() {
        // 页面被关闭
    },
    onTitleClick() {
        // 标题被点击
    },
    onPullDownRefresh() {
        // 页面被下拉
    },
    onReachBottom() {
        // 页面被拉到底部
    },
    onShareAppMessage() {
        // 返回自定义分享信息
        return {
            title: '快乐松自助买单',
            desc: '快乐松自助买单',
            path: 'pages/pay/index',
        };
    },
});
