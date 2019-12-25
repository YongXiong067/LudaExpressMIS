package com.express.web.model.money;

import com.express.web.model.order_model.Orders;

/**
 * 财务实体类
 * @author Administrator
 *
 */
public class Money {
	/**
	 * id
	 */
	private Long financeId;
	/**
	 * 订单id
	 */
	private Orders orderId;
	public Long getFinanceId() {
		return financeId;
	}
	public void setFinanceId(Long financeId) {
		this.financeId = financeId;
	}
	public Orders getOrderId() {
		return orderId;
	}
	public void setOrderId(Orders orderId) {
		this.orderId = orderId;
	}
	
}
