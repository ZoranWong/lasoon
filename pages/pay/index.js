import PaymentService from '../../services/PaymentService';
import AuthService from '../../services/AuthService';
import ShopService from '../../services/ShopService';
Page({
    paymentService: null,
    data: {
        paymentAmount: '',
        // storeId: 1,
        storeId:null,
        logo: null,
        shopName: null,
        adress: null,
        mobile: null,
        sologan: '',
        customerId:'',
        remark:'',
        coupon_records:[]

    },
    async init() {
        console.log('data info', this.data);
        let app = getApp();
        let authService = new AuthService(app.globalData.config.gateway);
        console.log(authService,'authServiceauthService')
        let data = await authService.accessToken(app.globalData.config.appId, app.globalData.config.appSecret);
        app.globalData.accessToken = data['access_token'];
        app.globalData.contactPhoneNum = data['contact_phone_num'];
        app.globalData.logo = data['logo'];
        this.setData({ logo: data['logo'] });
        let user = await authService.login(data['access_token']);
        this.setData({customerId:user.customer_id})
        this.paymentService = new PaymentService(app.globalData.config.gateway, user['token']);
        let shopService = new ShopService(app.globalData.config.gateway, user['token']);
        let shop = await shopService.getshop(this.data.storeId);
        console.log('shop info', shop);
        this.setData({ shopName: shop['name'], address: shop['address'] });
    },
    async pay() {
        console.log(this.data,'立即制度');
        if (this.data.paymentAmount > 0) {
            // let order = await this.paymentService.createOrder(this.data.storeId, this.data.paymentAmount,
            //     this.data.address, this.data.mobile, this.data.shopName,this.data.customerId);
            let order = await this.paymentService.createOrder(this.data.storeId, this.data.paymentAmount,this.data.customerId,this.data.remark,this.data.coupon_records);
            console.log(order['order_id'],'order');
            let result = await this.paymentService.payment(order['order_id']);
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
        // my.alert({
        //     content: '',
        // });
    },
    onInput(e) {
        const paymentAmount = e.detail.value;
        this.setData({
            paymentAmount: parseFloat(paymentAmount)
        });
    },
    onButtonClick() {
        // my.alert({
        //     content: 'button clicked',
        // });
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
        }else{
            my.alert({
                content: '您还未扫店铺码呢哟',
            });
        }

        this.setData({
            sologan: app.globalData.config.pages.pay.sologan
        });

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
