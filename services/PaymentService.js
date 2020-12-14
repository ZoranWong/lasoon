import ApiService from './ApiService';
import { OFF_LINE_PAYMENT_ORDER, SEND_ORDER_TO_USER } from '../utils/OrderDict';
export default class PaymentService extends ApiService {
    async createOrder (storeId, paymentAmount,customerId,Remark,couponRecords) {
         let data = {
            coupon_records:couponRecords,
            total_fee:paymentAmount,
            remark:Remark,
            shop_id:storeId,
            customer_id:customerId

        };
        console.log('order info ', data);
        let order = await this.post('api/ali/scan/orders', data);
        return order;
    }

    async payment(order) {
        let orders = await this.get(`api/ali/orders/${order}/payment_config`);
        return orders;
    }
}