const CANCEL = 0;
const WAIT = 100;
const MAKE_SURE = 200;
const PAID = 300;
const SEND = 400;
const COMPLETED = 500;
const PAY_FAILED = 600;

const ORDER_NUMBER_PREFIX = 'PH';

const UNKNOWN_PAY = 0;
const ALI_PAY = 1;

const WECHAT_PAY = 2;

// 取货方式
const NOT_NEED_PICK_UP_METHOD = 0;
const SEND_ORDER_TO_USER = 1;// 送货上门
const USER_SELF_PICK_UP = 2; // 自提


// 订单类型：0-线下扫码 1-商城订单 2-站点用户订单  3-商家进货订单
const OFF_LINE_PAYMENT_ORDER = 0;

const SHOPPING_MALL_ORDER = 1;

const SITE_USER_ORDER = 2;

const SHOP_PURCHASE_ORDER = 3;

export {
    CANCEL,
    WAIT,
    MAKE_SURE,
    PAID,
    SEND,
    COMPLETED,
    PAY_FAILED,
    ORDER_NUMBER_PREFIX,
    UNKNOWN_PAY,
    ALI_PAY,
    WECHAT_PAY,
    NOT_NEED_PICK_UP_METHOD,
    SEND_ORDER_TO_USER,
    USER_SELF_PICK_UP,
    OFF_LINE_PAYMENT_ORDER,
    SHOPPING_MALL_ORDER,
    SITE_USER_ORDER,
    SHOP_PURCHASE_ORDER
};