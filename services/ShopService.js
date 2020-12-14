import ApiService from './ApiService';
export default class ShopService extends ApiService {
    async getshop(shop) {
        let shops = await this.get(`api/mp/shop/${shop}/info`);
        return shops;
    }
}