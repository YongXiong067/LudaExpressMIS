package com.express.web.controller.money;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.express.web.model.money.Money;
import com.express.web.service.money.MoneyService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


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
	@Autowired
	MoneyService moneyService;
	/**
	 * 	查询财务记录
	 * @param user
	 * @return
	 */
	@ApiOperation(value = "getMoneyList", notes = "查询所有财务记录")
	@PostMapping("/getMoney")
	@ResponseBody
	public List<Money> getMoney() {
		return moneyService.getMoneyList();
	}
	
}
