export type LoginPageData = {
  text: string;
  send: boolean;
  seconds: number;
  timeId: number;
  param: LoginReq;
};
export type LoginReq = {
  account: string;
  captchaCode: string;
  code: string;
};

export type OrderPageData = {
  type: string;
  orderList: OrderResult[];
  refundList: RefundResult[];
};

export type Page = {
  pageNum: number;
  pageSize: number;
};

export type OrderPageType = { list: OrderResult[]; page: Page; initData: boolean };
export type RefundPageType = { list: RefundResult[]; page: Page; initData: boolean };

export type OrderResult = {
  id: string;
  goodsName: string;
  status: orderStatusEnum;
  skuDesc: string;
  createTime: string;
};

export type refundStatusEnum = 0 | 1 | 2 | 5 | 6;
export type orderStatusEnum = 10 | 12 | 20 | 25 | 27 | 30;

export type RefundResult = {
  id: string;
  orderNo: string;
  status: refundStatusEnum;
  refundAmount: number;
  reviewRemark: string;
  createTime: string;
};
