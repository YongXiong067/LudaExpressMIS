package com.express.web.controller.sys;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import io.swagger.annotations.Api;

/**
 * home控制器
 * @author Charlene
 *
 */
@Api(value = "home控制器",description ="home控制器")
@Controller
public class HomeController {
	
	@Autowired
	HttpServletRequest request;
	
	/**
	 * 首页
	 */
	@GetMapping("/")
	public String login() {
		HttpSession session = request.getSession();
		if(session.getAttribute("userId") == null) {
			return "login.html";
		}else {
			return "index.html";
		}
		
	}
	
	/**
	 * 首页
	 */
	@GetMapping("/index")
	public String home() {
		HttpSession session = request.getSession();
		if(session.getAttribute("userId") == null) {
			return "index.html";
		}else {
			return "login.html";
		}
		
	}
	
	
	
}
