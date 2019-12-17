package com.express.web.model;
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
				+ ", rolu=" + rolu + "]";
	}
	
}
