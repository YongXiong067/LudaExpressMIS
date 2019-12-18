package com.express.web.model.money;

import com.express.web.model.order_model.orders;

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
	private orders orderId;
	public Long getFinanceId() {
		return financeId;
	}
	public void setFinanceId(Long financeId) {
		this.financeId = financeId;
	}
	public orders getOrderId() {
		return orderId;
	}
	public void setOrderId(orders orderId) {
		this.orderId = orderId;
	}
	
}
