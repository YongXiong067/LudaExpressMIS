package com.express.web.controller.money;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.express.web.model.SysUser;
import com.express.web.model.money.Money;
import com.express.web.service.SysUserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;


/**
 *	财务控制器
 * @author Charlene
 *
 */
@Api(value = "财务控制器",description ="财务控制器")
@Controller
@RequestMapping("/api/money")
public class MoneyController {
	@Autowired
	HttpServletRequest request;
	
	/**
	 * 	查询财务记录
	 * @param user
	 * @return
	 */
	@ApiOperation(value = "getMoneyList", notes = "查询所有财务记录")
	@PostMapping("/getMoney")
	@ResponseBody
	public List<Money> getMoney(@ApiParam(value = "查询参数，可根据标题或者内容自动匹配" ,required=false )@RequestBody SysUser user) {
		
		return null;
	}
	
}
