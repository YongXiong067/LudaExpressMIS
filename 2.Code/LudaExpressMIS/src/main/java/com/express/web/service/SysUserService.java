package com.express.web.service;

import com.express.web.model.SysUser;

public interface SysUserService {
	
	/**
	 * 验证登录
	 * @param userId
	 * @return
	 */
	SysUser getLogin(Integer userId);
	/**
	 * 获取到用户信息
	 * @param userName
	 * @param password
	 * @return
	 */
	SysUser getUser(String userName,String password);
}
