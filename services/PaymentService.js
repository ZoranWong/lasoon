import ApiService from './ApiService';
import { OFF_LINE_PAYMENT_ORDER, SEND_ORDER_TO_USER } from '../utils/OrderDict';
export default class PaymentService extends ApiService {
    async createOrder (storeId, paymentAmount, address, mobile, receiverName, comment = '') {
         let data = {
            type: OFF_LINE_PAYMENT_ORDER,
            pick_up_method: SEND_ORDER_TO_USER,
            receiver_name: receiverName,
            receiver_address: address,
            receiver_mobile: mobile,
            comment: comment,
            receiving_shop_id: storeId,
            store_id: storeId,
            payment_amount: paymentAmount,
            total_amount: paymentAmount
        };
        console.log('order info ', data);
        let order = await this.post(`/create/order`, data);
        return order;
    }

    async payment(id) {
        let order = await this.get(`/ali/order/${id}/payment`);
        return order;
    }
}