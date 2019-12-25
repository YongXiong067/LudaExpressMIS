package com.express.web.model.order_model;

/**
 * @Author: YIHUI HE
 * @Date: 2019/12/17
 * @Description: 订单表
 */
public class Orders {
    //订单id
    private Long orderId;
    //关联用户表id
    private Long userId;
    //关联网点id
    private Long dotId;

    //发件人手机号码
    private String sendTel;
    //发件人地址
    private String sendAddr;
    //下单时间
    private String orderDate;
    //收件人手机号码
    private String receiveTel;
    //收件人地址
    private String receiveAddr;

    //订单编号，系统自动生成
    private String orderNum;
    //包裹重量
    private String weight;
    //订单所产生的费用
    private Double money;
    //订单状态  0为预约，1为运输中，2为派送中，3为已签收
    private String state;
    //当前处理人
    private String currentUser;
    //处理步骤记录
    private String content;

    //网点名称
    private String dotName;
    private String userName;
	public Long getOrderId() {
		return orderId;
	}
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getDotId() {
		return dotId;
	}
	public void setDotId(Long dotId) {
		this.dotId = dotId;
	}
	public String getSendTel() {
		return sendTel;
	}
	public void setSendTel(String sendTel) {
		this.sendTel = sendTel;
	}
	public String getSendAddr() {
		return sendAddr;
	}
	public void setSendAddr(String sendAddr) {
		this.sendAddr = sendAddr;
	}
	public String getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}
	public String getReceiveTel() {
		return receiveTel;
	}
	public void setReceiveTel(String receiveTel) {
		this.receiveTel = receiveTel;
	}
	public String getReceiveAddr() {
		return receiveAddr;
	}
	public void setReceiveAddr(String receiveAddr) {
		this.receiveAddr = receiveAddr;
	}
	public String getOrderNum() {
		return orderNum;
	}
	public void setOrderNum(String orderNum) {
		this.orderNum = orderNum;
	}
	public String getWeight() {
		return weight;
	}
	public void setWeight(String weight) {
		this.weight = weight;
	}
	public Double getMoney() {
		return money;
	}
	public void setMoney(Double money) {
		this.money = money;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCurrentUser() {
		return currentUser;
	}
	public void setCurrentUser(String currentUser) {
		this.currentUser = currentUser;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getDotName() {
		return dotName;
	}
	public void setDotName(String dotName) {
		this.dotName = dotName;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	@Override
	public String toString() {
		return "Orders [orderId=" + orderId + ", userId=" + userId + ", dotId=" + dotId + ", sendTel=" + sendTel
				+ ", sendAddr=" + sendAddr + ", orderDate=" + orderDate + ", receiveTel=" + receiveTel
				+ ", receiveAddr=" + receiveAddr + ", orderNum=" + orderNum + ", weight=" + weight + ", money=" + money
				+ ", state=" + state + ", currentUser=" + currentUser + ", content=" + content + ", dotName=" + dotName
				+ ", userName=" + userName + "]";
	}

    
}