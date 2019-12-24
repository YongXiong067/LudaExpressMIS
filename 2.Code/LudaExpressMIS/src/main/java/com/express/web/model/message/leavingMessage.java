package com.express.web.model.message;

/**
 * @Author: YIHUI HE
 * @Date: 2019/12/22
 * @Description: 留言表
 */
public class leavingMessage {

    private Integer leavingId;

    private Integer userId;

    private Integer state;

    private String content;

    private String rsContert;

    private String name;

    private String stateName;

    public Integer getLeavingId() {
        return leavingId;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getContent() {
        return content;
    }


    public void setLeavingId(Integer leavingId) {
        this.leavingId = leavingId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }


    public void setContent(String content) {
        this.content = content;
    }

    public Integer getState() {
        return state;
    }

    public String getRsContert() {
        return rsContert;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public void setRsContert(String rsContert) {
        this.rsContert = rsContert;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getStateName() {
        return stateName;
    }

    public void setStateName(String stateName) {
        this.stateName = stateName;
    }

    @Override
    public String toString() {
        return "leavingMessage{" +
                "leavingId=" + leavingId +
                ", userId=" + userId +
                ", state=" + state +
                ", content='" + content + '\'' +
                ", rsContert='" + rsContert + '\'' +
                ", name='" + name + '\'' +
                ", stateName='" + stateName + '\'' +
                '}';
    }
}
