import ApiService from './ApiService';
export default class ShopService extends ApiService {
    async shop(id) {
        let shop = await this.get(`/store/${id}/info`);
        return shop;
    }
}