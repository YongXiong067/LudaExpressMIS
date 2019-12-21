package com.express.web.model.money;

public class MoneyTable {
	//下单时间
	private String orderDate;
	//用户名
	private String userName;
	//下单金额
	private Double money;
	//始发地
	private String sendAddr;
	//目的地
	private String receiveAddr;
	//目的地网点名称
	private String dotName;
	//订单状态
	private Integer orderState;
	//订单状态名称
	private String orderStateName;
	
	public String getOrderStateName() {
		return orderStateName;
	}
	public void setOrderStateName(String orderStateName) {
		this.orderStateName = orderStateName;
	}
	public String getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Double getMoney() {
		return money;
	}
	public void setMoney(Double money) {
		this.money = money;
	}
	public String getSendAddr() {
		return sendAddr;
	}
	public void setSendAddr(String sendAddr) {
		this.sendAddr = sendAddr;
	}
	public String getReceiveAddr() {
		return receiveAddr;
	}
	public void setReceiveAddr(String receiveAddr) {
		this.receiveAddr = receiveAddr;
	}
	public String getDotName() {
		return dotName;
	}
	public void setDotName(String dotName) {
		this.dotName = dotName;
	}
	public Integer getOrderState() {
		return orderState;
	}
	public void setOrderState(Integer orderState) {
		this.orderState = orderState;
	}
	@Override
	public String toString() {
		return "MoneyTable [orderDate=" + orderDate + ", userName=" + userName + ", money=" + money + ", sendAddr="
				+ sendAddr + ", receiveAddr=" + receiveAddr + ", dotName=" + dotName + ", orderState=" + orderState
				+ ", orderStateName=" + orderStateName + "]";
	}
	
}
