package com.express.web.model.order_model;

import java.util.Date;

/**
 * @Author: YIHUI HE
 * @Date: 2019/12/17
 * @Description: 订单表
 */
public class orders {
    //订单id
    private Long orderid;
    //关联用户表id
    private Long userid;
    //关联网点id
    private Long dotid;

    //发件人手机号码
    private String sendtel;
    //发件人地址
    private String sendaddr;
    //下单时间
    private Date orderdate;
    //收件人手机号码
    private String receivetel;
    //收件人地址
    private String receiveaddr;

    //订单编号，系统自动生成
    private Integer ordernum;
    //包裹重量
    private String weight;
    //订单所产生的费用
    private Double money;
    //订单状态  0为预约，1为运输中，2为派送中，3为已签收
    private String state;
    //当前处理人
    private String currentuser;
    //处理步骤记录
    private String content;

    public Long getOrderid() {
        return orderid;
    }

    public void setOrderid(Long orderid) {
        this.orderid = orderid;
    }

    @Override
	public String toString() {
		return "orders [orderid=" + orderid + ", dotid=" + dotid + ", userid=" + userid + ", sendtel=" + sendtel
				+ ", sendaddr=" + sendaddr + ", orderdate=" + orderdate + ", receivetel=" + receivetel
				+ ", receiveaddr=" + receiveaddr + ", ordernum=" + ordernum + ", weight=" + weight + ", money=" + money
				+ ", state=" + state + ", currentuser=" + currentuser + ", content=" + content + "]";
	}


	public Long getDotid() {
        return dotid;
    }

    public void setDotid(Long dotid) {
        this.dotid = dotid;
    }

    public String getSendtel() {
        return sendtel;
    }

    public void setSendtel(String sendtel) {
        this.sendtel = sendtel == null ? null : sendtel.trim();
    }

    public String getSendaddr() {
        return sendaddr;
    }

    public void setSendaddr(String sendaddr) {
        this.sendaddr = sendaddr == null ? null : sendaddr.trim();
    }

    public Date getOrderdate() {
        return orderdate;
    }

    public void setOrderdate(Date orderdate) {
        this.orderdate = orderdate;
    }

    public String getReceivetel() {
        return receivetel;
    }

    public void setReceivetel(String receivetel) {
        this.receivetel = receivetel == null ? null : receivetel.trim();
    }

    public String getReceiveaddr() {
        return receiveaddr;
    }

    public void setReceiveaddr(String receiveaddr) {
        this.receiveaddr = receiveaddr == null ? null : receiveaddr.trim();
    }

	public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight == null ? null : weight.trim();
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
        this.state = state == null ? null : state.trim();
    }

    public String getCurrentuser() {
        return currentuser;
    }

    public void setCurrentuser(String currentuser) {
        this.currentuser = currentuser == null ? null : currentuser.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();

    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }
}