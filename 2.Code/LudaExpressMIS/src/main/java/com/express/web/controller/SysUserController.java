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


/**
 * 项目信息控制器
 * @author Charlene
 *
 */

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
	public int login() {
		//按参数查询
		String userName = request.getParameter("userName");
		String password = request.getParameter("password");
		SysUser sysUser = service.getUser(userName, password);
		if(sysUser != null) {
			HttpSession session = request.getSession(true);
			session.setAttribute("userId", sysUser.getUserId());
			session.setAttribute("userName", sysUser.getUserName());
			return 11;
		}
		return -1;
	}

}
