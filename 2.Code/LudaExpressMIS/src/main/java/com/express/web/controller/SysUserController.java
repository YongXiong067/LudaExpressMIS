package com.express.web.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.express.web.model.SysUser;
import com.express.web.service.SysUserService;

import io.swagger.annotations.Api;


/**
 * 用户控制器
 * @author Charlene
 *
 */
@Api(value = "用户控制器",description ="用户控制器")
@Controller
@RequestMapping("/api/user")
public class SysUserController {

	@Autowired
	SysUserService service;
	@Autowired
	HttpServletRequest request;
	
	

	/**
	 * 用户登录
	 * @param userName
	 * @param password
	 * @return
	 */
	@PostMapping("/login")
	@ResponseBody
	public int login(@RequestBody SysUser user) {
		//按参数查询
		SysUser sysUser = service.getUser(user.getUserName(),user.getPassword() );
		if(sysUser != null) {
			HttpSession session = request.getSession(true);
			session.setAttribute("userId", sysUser.getUserId());
			session.setAttribute("userName", sysUser.getUserName());
			session.setAttribute("rolu", sysUser.getRolu());
			return 11;
		}
		return -1;
	}
	/**
	 * 注销登录
	 * @return
	 */
	@GetMapping("/cancellation")
	@ResponseBody
	public int cancellation() {
		HttpSession session = request.getSession(true);
		session.setAttribute("userId", null);
		session.setAttribute("userName", null);
		session.setAttribute("rolu", null);
		return 1;
	}
	/**
	 *  注册用户
	 * @return
	 */
	@PostMapping("/register")
	@ResponseBody
	public int register(@RequestBody SysUser user) {
		try {
			//验证
			SysUser sysUser = service.validateName(user.getUserName());
			if(sysUser != null) {
				return -1;
			}else {
				user.setRolu(1);
				service.insertUser(user);
				return 11;
			}
		}catch(Exception e) {
			return -1;
		}
	}
	/**
	 *  管理员添加用户
	 * @return
	 */
	@PostMapping("/insertUser")
	@ResponseBody
	public int insertUser(@RequestBody SysUser user) {
		try {
			//验证
			SysUser sysUser = service.validateName(user.getUserName());
			if(sysUser != null) {
				return -1;
			}else {
				if(user.getRolu() == -1) {
					user.setRolu(1);
				}
				service.insertUser(user);
				return 11;
			}
		}catch(Exception e) {
			return -1;
		}
	}
	/**
	 * 修改密码
	 * @return
	 */
	@GetMapping("/updatePwd")
	@ResponseBody
	public int updatePwd() {
		try {
			String oldPwd = request.getParameter("oldPwd");
			String newPwd = request.getParameter("newpwd");
			HttpSession session = request.getSession(true);
			String userName = (String) session.getAttribute("userName");
			//验证
			SysUser sysUser = service.getUser(userName, oldPwd);
			SysUser user = new SysUser();
			if(sysUser != null) {
				user.setPassword(newPwd);
				user.setPhone(sysUser.getPhone());
				user.setRolu(sysUser.getRolu());
				user.setUserName(userName);
				user.setUserId(sysUser.getUserId());
				service.update(user);
				return 1;
			}else {
				return -1;
			}
		}catch(Exception e) {
			return -1;
		}
	}
	/**
	 * 	修改用户信息
	 * @return
	 */
	@PostMapping("/update")
	@ResponseBody
	public int update(@RequestBody SysUser sysUser) {
		try {
			//验证
			if(sysUser != null ) {
				service.update(sysUser);
				return 11;
			}else {
				return -1;
			}
		}catch(Exception e) {
			return -1;
		}
	}
	/**
	 * 查询所有用户或根据条件模糊匹配查询用户
	 * @return
	 */
	@GetMapping("/getAllUser")
	@ResponseBody
	public List<SysUser> getAllUser(@RequestParam String search){
		System.out.println(search);
		List<SysUser> userList = service.listByAll(search);
		return userList;
	}
	/**
	 * 删除用户信息
	 * @return
	 */
	@GetMapping("/deleteUser")
	@ResponseBody
	public boolean deleteUser() {
		boolean bool = false;
		long id = Integer.parseInt(request.getParameter("userId"));
		try {
			bool = service.deleteById(id);
		}catch(Exception e ) {
			bool = false;
		}
		return bool;
	}
	
	/**
	 * 获取单个用户
	 * @return
	 */
	@GetMapping("/getUser")
	@ResponseBody
	public SysUser getUser(){
		HttpSession session = request.getSession(true);
		SysUser user = service.getLogin((long) session.getAttribute("userId"));
		return user;
	}
}
