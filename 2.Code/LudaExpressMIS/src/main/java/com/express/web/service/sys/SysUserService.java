package com.express.web.service.sys;

import java.util.List;

import com.express.web.model.sys.SysUser;
/**
 * 系统用户业务层接口
 * @author Administrator
 *
 */
public interface SysUserService {
	
	/**
	 * 验证登录
	 * @param userId
	 * @return
	 */
	SysUser getLogin(long userId);
	/**
	 * 获取到用户信息
	 * @param userName
	 * @param password
	 * @return
	 */
	SysUser getUser(String userName,String password);
	
	/**
	 * 验证账号是否已使用
	 * @param userName
	 * @return
	 */
	SysUser validateName(String userName);
	
	/**
	 * 添加用户
	 * @param user
	 */
	void insertUser(SysUser user);
	/**
	 * 	修改用户
	 * @param user
	 */
	void update(SysUser user);
	/**
	 * 根据查询条件查询用户
	 * @param search
	 * @return
	 */
	List<SysUser> listByAll(String search);
	/**
	 * 删除用户
	 * @param userId
	 * @return
	 */
	boolean deleteById(long userId);
	/**
	 * 修改个人信息
	 * @param user
	 * @return
	 */
	void userUpdateInfo(SysUser user);
	
	/**
	 * 修改个人头像
	 * @param user
	 * @return
	 */
	void userUpdateImg(Long userId,String imgurl);
	

	/**
	 * 用户修改个人头像
	 * @param pro
	 * @return
	 */
	int userUpdateTime(Long userId,String loginTime);
}
