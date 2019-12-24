package com.express.web.model.sys;
/**
 * 系统用户实体类
 * @author Administrator
 *
 */
public class SysUser {
	/**
	 * 用户id
	 */
	private long userId;
	/**
	 * 用户账号
	 */
	private String userName;
	/**
	 * 用户密码
	 */
	private String password;
	/**
	 * 用户手机号码
	 */
	private String phone;
	/**
	 * 用户角色 0系统管理员，1普通用户，2快递员
	 */
	private int rolu;
	/**
	 * 	角色名称
	 */
	private String roluName;
	/**
	 * 用户头像
	 */
	private String imgurl;
	/**
	 * 用户地址
	 */
	private String address;
	/**
	 * 用户性别
	 */
	private String sex;
	
	public String getImgurl() {
		return imgurl;
	}
	public void setImgurl(String imgurl) {
		this.imgurl = imgurl;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getRoluName() {
		return roluName;
	}
	public void setRoluName(String roluName) {
		this.roluName = roluName;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public int getRolu() {
		return rolu;
	}
	public void setRolu(int rolu) {
		this.rolu = rolu;
	}
	@Override
	public String toString() {
		return "SysUser [userId=" + userId + ", userName=" + userName + ", password=" + password + ", phone=" + phone
				+ ", rolu=" + rolu + ", roluName=" + roluName + ", imgurl=" + imgurl + ", address=" + address + ", sex="
				+ sex + "]";
	}
	
}
