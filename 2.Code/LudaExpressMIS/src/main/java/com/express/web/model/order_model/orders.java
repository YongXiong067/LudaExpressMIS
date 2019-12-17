package com.express.web.model.order_model;

import java.util.Date;

/**
 * @Author: YIHUI HE
 * @Date: 2019/12/17
 * @Description: 订单表
 */
public class orders {
    private Long orderid;

    private Long dotid;

    private String sendtel;

    private String sendaddr;

    private Date orderdate;

    private String receivetel;

    private String receiveaddr;

    private Integer ordernum;

    private String weight;

    private Double money;

    private String state;

    private String currentuser;

    private String content;

    public Long getOrderid() {
        return orderid;
    }

    public void setOrderid(Long orderid) {
        this.orderid = orderid;
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

    public Integer getOrdernum() {
        return ordernum;
    }

    public void setOrdernum(Integer ordernum) {
        this.ordernum = ordernum;
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
}