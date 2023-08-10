import type { OrderPageType, OrderResult, RefundPageType, RefundResult } from "@/common/type";
import { http } from "@/http/config/axios";
import { orderListUrl, refundListUrl } from "@/http/api/Url";
import type { refundStatusEnum, orderStatusEnum } from "@/common/type";

export const refundStatus = {
  0: "申请中",
  1: "等待退款",
  2: "已拒绝",
  5: "等待退款",
  6: "已退款",
};
export const orderStatus = {
  10: "待核销",
  12: "部分核销",
  20: "已核销",
  25: "等待退款",
  27: "已退款",
  30: "已过期",
};

export const initList = (type: string, refund: RefundPageType, order: OrderPageType) => {
  if (type == "refund") {
    !refund.initData && doRefundList(refund);
    refund.initData = true;
  } else {
    !order.initData && doOrderList(order);
    order.initData = true;
  }
};

export const doOrderList = (order: OrderPageType) => {
  const page = order.page;
  http.post(orderListUrl, { page }).then((res: { data: OrderResult[]; success: boolean }) => {
    res?.success && res.data.forEach((ele) => order.list.push(ele));
  });
};

export const doRefundList = (refund: RefundPageType) => {
  const page = refund.page;
  http.post(refundListUrl, { page }).then((res: { data: RefundResult[]; success: boolean }) => {
    res.success && res.data.forEach((ele) => refund.list.push(ele));
  });
};
export const getRefundDesc = (status: refundStatusEnum) => {
  return refundStatus[status];
};
export const getOrderStatusDesc = (status: orderStatusEnum) => {
  return orderStatus[status];
};

export const auditRefundApply = (id: string) => {
  console.log(id);
};
